'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { ContactFormData } from '@/types';
import { headers } from 'next/headers';

// Server-side validation schema (same as client-side)
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name must be less than 100 characters'),
  budget: z.enum(['under-10k', '10k-25k', '25k-50k', '50k+'], {
    errorMap: () => ({ message: 'Please select a budget range' })
  }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
  consent: z.boolean().refine(val => val === true, 'You must agree to the privacy policy'),
  company_website: z.string().optional(), // Honeypot field
});

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(ip: string): string {
  return `contact_form_${ip}`;
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 3; // Max 3 requests per 15 minutes

  const current = rateLimitStore.get(key);
  
  if (!current || now > current.resetTime) {
    // Reset or initialize
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }

  if (current.count >= maxRequests) {
    return { allowed: false, resetTime: current.resetTime };
  }

  // Increment count
  rateLimitStore.set(key, { count: current.count + 1, resetTime: current.resetTime });
  return { allowed: true };
}

function sanitizeInput(input: string): string {
  // Basic HTML sanitization - remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

function getBudgetLabel(budget: string): string {
  const budgetLabels: Record<string, string> = {
    'under-10k': 'Under $10k',
    '10k-25k': '$10k - $25k',
    '25k-50k': '$25k - $50k',
    '50k+': '$50k+',
  };
  return budgetLabels[budget] || budget;
}

export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown';

    // Check rate limiting
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime ? new Date(rateLimitResult.resetTime) : new Date();
      return {
        success: false,
        error: `Too many requests. Please try again after ${resetTime.toLocaleTimeString()}.`
      };
    }

    // Honeypot validation
    if (formData.company_website && formData.company_website.trim() !== '') {
      console.log('Honeypot triggered:', { ip, honeypot: formData.company_website });
      return {
        success: false,
        error: 'Spam detected. Please try again.'
      };
    }

    // Server-side validation
    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join(', ');
      return {
        success: false,
        error: `Validation failed: ${errors}`
      };
    }

    const validatedData = validationResult.data;

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      email: sanitizeInput(validatedData.email),
      company: sanitizeInput(validatedData.company),
      budget: validatedData.budget,
      message: sanitizeInput(validatedData.message),
      consent: validatedData.consent,
    };

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP not configured');
      return {
        success: false,
        error: 'Email service not configured. Please try again later.'
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const contactEmail = process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_EMAIL || 'rob@rknowlton.com';

    // Send email notification
    const emailResult = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: contactEmail,
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #00ff88; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Company:</strong> ${sanitizedData.company}</p>
            <p><strong>Budget:</strong> ${getBudgetLabel(sanitizedData.budget)}</p>
          </div>

          <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${sanitizedData.message}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px; font-size: 12px; color: #666;">
            <p><strong>Submission Details:</strong></p>
            <p>IP Address: ${ip}</p>
            <p>User Agent: ${headersList.get('user-agent') || 'Unknown'}</p>
            <p>Timestamp: ${new Date().toISOString()}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Company: ${sanitizedData.company}
Budget: ${getBudgetLabel(sanitizedData.budget)}

Message:
${sanitizedData.message}

---
Submission Details:
IP: ${ip}
User Agent: ${headersList.get('user-agent') || 'Unknown'}
Timestamp: ${new Date().toISOString()}
      `,
    });

    console.log('Email sent successfully:', emailResult.messageId);

    // Send auto-reply to the user
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: sanitizedData.email,
        subject: 'Thanks for reaching out!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #00ff88; padding-bottom: 10px;">
              Thanks for reaching out, ${sanitizedData.name}!
            </h2>
            
            <p>I've received your message and will get back to you within 24 hours.</p>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li><a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-calendly-link'}" style="color: #00ff88;">Book a free consultation call</a></li>
              <li><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://robknowlton.com'}/work" style="color: #00ff88;">Check out my recent work</a></li>
            </ul>

            <p>Best,<br>Rob</p>

            <div style="margin-top: 30px; padding: 15px; background: #f9f9f9; border-radius: 8px; font-size: 12px; color: #666;">
              <p><strong>Your message:</strong></p>
              <p style="white-space: pre-wrap; line-height: 1.6;">${sanitizedData.message}</p>
            </div>
          </div>
        `,
        text: `
Thanks for reaching out, ${sanitizedData.name}!

I've received your message and will get back to you within 24 hours.

In the meantime, feel free to:
- Book a free consultation: ${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-calendly-link'}
- Check out my work: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://robknowlton.com'}/work

Best,
Rob

---
Your message:
${sanitizedData.message}
        `,
      });
    } catch (autoReplyError) {
      // Don't fail the main submission if auto-reply fails
      console.warn('Failed to send auto-reply:', autoReplyError);
    }

    console.log('Contact form submitted successfully:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      company: sanitizedData.company,
      budget: sanitizedData.budget,
      ip,
      timestamp: new Date().toISOString(),
    });

    return { success: true };

  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again later.'
    };
  }
}