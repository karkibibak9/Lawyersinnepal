'use server';

import { supabase } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';
import { GoogleGenerativeAI } from '@google/generative-ai';

const resend = new Resend(process.env.RESEND_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function submitAppointment(formData: any) {
  try {
    const { error } = await supabase
      .from('appointments')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          preferred_date: formData.date,
          message: formData.message,
          status: 'pending',
        },
      ]);

    if (error) throw error;
    
    // Send email notification via Resend
    try {
      await resend.emails.send({
        from: 'Lawyers In Nepal <onboarding@resend.dev>',
        to: 'karkibibak9@gmail.com',
        subject: `New Appointment: ${formData.name}`,
        html: `
          <h1>New Appointment Request</h1>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Service:</strong> ${formData.service}</p>
          <p><strong>Date:</strong> ${formData.date}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send appointment email:', emailError);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error submitting appointment:', error.message);
    if (error instanceof TypeError && error.message === 'fetch failed') {
      return { success: false, error: 'Database connection failed. Please try again.' };
    }
    return { success: false, error: error.message };
  }
}

export async function submitContactMessage(formData: any) {
  try {
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      ]);

    if (error) throw error;

    // Send email notification
    try {
      await resend.emails.send({
        from: 'Lawyers In Nepal <onboarding@resend.dev>',
        to: 'karkibibak9@gmail.com',
        subject: `New Message: ${formData.name}`,
        html: `
          <h1>New Contact Message</h1>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error submitting message:', error.message);
    return { success: false, error: error.message };
  }
}

export async function trackWhatsAppLead(pageName: string) {
  try {
    const { error } = await supabase
      .from('whatsapp_leads')
      .insert([
        {
          page: pageName,
        },
      ]);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    // We don't want to block the user if tracking fails
    return { success: false };
  }
}

