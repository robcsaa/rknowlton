'use client';

import { useState } from 'react';
import { z } from 'zod';
import { ContactFormData } from '@/types';
import { submitContactForm } from '@/lib/actions';

// Validation schema
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

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<{ success: boolean; error?: string }>;
  className?: string;
}

export default function ContactForm({ onSubmit = submitContactForm, className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    budget: 'under-10k',
    message: '',
    consent: false,
    company_website: '', // Honeypot field
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [startTime] = useState(Date.now()); // For timing validation

  const validateField = (name: keyof ContactFormData, value: unknown) => {
    try {
      // Create a partial schema for the specific field
      const fieldSchema = contactFormSchema.shape[name];
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0]?.message }));
      }
      return false;
    }
  };

  const handleInputChange = (name: keyof ContactFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear submit status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }

    // Validate field on change (debounced validation would be better for UX)
    if (value !== '') {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check timing (must be at least 3 seconds to prevent bots)
    const timeTaken = Date.now() - startTime;
    if (timeTaken < 3000) {
      setSubmitStatus('error');
      setSubmitMessage('Please take your time filling out the form.');
      return;
    }

    // Check honeypot
    if (formData.company_website && formData.company_website.trim() !== '') {
      setSubmitStatus('error');
      setSubmitMessage('Spam detected. Please try again.');
      return;
    }

    // Validate all fields
    try {
      contactFormSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await onSubmit(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent. I\'ll get back to you within 24 hours.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          budget: 'under-10k',
          message: '',
          consent: false,
          company_website: '',
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (submitError) {
      console.error('Form submission error:', submitError);
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const budgetOptions = [
    { value: 'under-10k', label: 'Under $10k' },
    { value: '10k-25k', label: '$10k - $25k' },
    { value: '25k-50k', label: '$25k - $50k' },
    { value: '50k+', label: '$50k+' },
  ];

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-6 ${className}`}
      noValidate
      aria-label="Contact form"
    >
      {/* Honeypot field - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company Website (do not fill)</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          value={formData.company_website}
          onChange={(e) => handleInputChange('company_website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name Field */}
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onBlur={(e) => validateField('name', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your full name"
          required
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={(e) => validateField('email', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your@email.com"
          required
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Company Field */}
      <div>
        <label 
          htmlFor="company" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Company *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          onBlur={(e) => validateField('company', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.company ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your company name"
          required
          aria-describedby={errors.company ? 'company-error' : undefined}
          aria-invalid={errors.company ? 'true' : 'false'}
        />
        {errors.company && (
          <p id="company-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.company}
          </p>
        )}
      </div>

      {/* Budget Field */}
      <div>
        <label 
          htmlFor="budget" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Project Budget *
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={(e) => handleInputChange('budget', e.target.value as ContactFormData['budget'])}
          onBlur={(e) => validateField('budget', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.budget ? 'border-red-500' : 'border-gray-300'
          }`}
          required
          aria-describedby={errors.budget ? 'budget-error' : undefined}
          aria-invalid={errors.budget ? 'true' : 'false'}
        >
          {budgetOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.budget && (
          <p id="budget-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.budget}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label 
          htmlFor="message" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          onBlur={(e) => validateField('message', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Tell me about your project, challenges, and what you're looking to achieve..."
          required
          aria-describedby={errors.message ? 'message-error' : 'message-help'}
          aria-invalid={errors.message ? 'true' : 'false'}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        ) : (
          <p id="message-help" className="mt-1 text-sm text-gray-500">
            {formData.message.length}/1000 characters
          </p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div>
        <div className="flex items-start">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={(e) => handleInputChange('consent', e.target.checked)}
            onBlur={(e) => validateField('consent', e.target.checked)}
            className={`mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
              errors.consent ? 'border-red-500' : ''
            }`}
            required
            aria-describedby={errors.consent ? 'consent-error' : 'consent-help'}
            aria-invalid={errors.consent ? 'true' : 'false'}
          />
          <label htmlFor="consent" className="ml-3 text-sm text-gray-700">
            I agree to the{' '}
            <a 
              href="/privacy" 
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              privacy policy
            </a>{' '}
            and consent to being contacted about this inquiry. *
          </label>
        </div>
        {errors.consent ? (
          <p id="consent-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.consent}
          </p>
        ) : (
          <p id="consent-help" className="mt-1 text-sm text-gray-500">
            Your information will only be used to respond to your inquiry.
          </p>
        )}
      </div>

      {/* Submit Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg" role="alert">
          <p className="text-green-800">{submitMessage}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
          <p className="text-red-800">{submitMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        aria-describedby="submit-help"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      <p id="submit-help" className="text-sm text-gray-500 text-center">
        I typically respond within 24 hours
      </p>
    </form>
  );
}