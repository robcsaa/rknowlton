import { NextRequest, NextResponse } from 'next/server';
import { submitContactForm } from '@/lib/actions';
import { ContactFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate that we have the required fields
    const formData: ContactFormData = {
      name: body.name,
      email: body.email,
      company: body.company,
      budget: body.budget,
      message: body.message,
      consent: body.consent,
      company_website: body.company_website || '',
    };

    const result = await submitContactForm(formData);
    
    if (result.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}