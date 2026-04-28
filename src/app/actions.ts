'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitAppointment(formData: any) {
  const supabase = createServerClient();
  console.log('Submitting appointment for:', formData.email);
  
  try {
    const { error } = await supabase
      .from('appointments')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          preferred_date: formData.date, // Use clean YYYY-MM-DD for database
          message: formData.time ? `Preferred Time: ${formData.time}\n\n${formData.message}` : formData.message,
          status: 'pending',
        },
      ]);

    if (error) throw error;
    
    // Send email notification via Resend
    try {
      const result = await resend.emails.send({
        from: 'Lawyers In Nepal <onboarding@resend.dev>',
        to: 'lawyersinnepal.com.np@gmail.com',
        subject: `New Appointment: ${formData.name}`,
        html: `
<div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background-color: #0a1628; padding: 40px; border-top: 8px solid #d4af37; border-radius: 8px; color: #ffffff;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #d4af37; font-size: 28px; margin: 0; font-weight: bold;">Lawyers In Nepal</h1>
    <p style="color: #94a3b8; font-family: 'Helvetica', Arial, sans-serif; font-size: 14px; margin-top: 5px; text-transform: uppercase; letter-spacing: 2px;">New Appointment Request</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; font-family: 'Helvetica', Arial, sans-serif; font-size: 16px;">
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e293b;"><strong style="color: #d4af37; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Name:</strong><br/><span style="color: #e2e8f0; margin-top: 4px; display: inline-block;">${formData.name}</span></td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e293b;"><strong style="color: #d4af37; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Email:</strong><br/><a href="mailto:${formData.email}" style="color: #60a5fa; margin-top: 4px; display: inline-block; text-decoration: none;">${formData.email}</a></td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e293b;"><strong style="color: #d4af37; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Phone:</strong><br/><span style="color: #e2e8f0; margin-top: 4px; display: inline-block;">${formData.phone}</span></td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e293b;"><strong style="color: #d4af37; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Service:</strong><br/><span style="color: #e2e8f0; margin-top: 4px; display: inline-block;">${formData.service}</span></td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e293b;"><strong style="color: #d4af37; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Date & Time:</strong><br/><span style="color: #e2e8f0; margin-top: 4px; display: inline-block;">${formData.date} at ${formData.time || 'N/A'}</span></td></tr>
    <tr><td style="padding: 12px 0;"><strong style="color: #d4af37; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Message / Case Overview:</strong><br/><div style="margin-top: 10px; background-color: #1e293b; padding: 20px; border-radius: 6px; line-height: 1.6; color: #f8fafc;">${formData.message}</div></td></tr>
  </table>
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1e293b; text-align: center; font-family: 'Helvetica', Arial, sans-serif; font-size: 12px; color: #64748b;">
    <p>This is an automated notification from Lawyers In Nepal.</p>
  </div>
</div>
        `,
      });
      console.log('Appointment Notification Result:', result);
    } catch (emailError) {
      console.error('Failed to send appointment email:', emailError);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error submitting appointment:', error);
    if (error instanceof TypeError && (error.message === 'fetch failed' || error.stack?.includes('fetch'))) {
      return { success: false, error: 'Network error: Could not reach the server. Please check your internet connection.' };
    }
    return { success: false, error: error.message || 'An unknown error occurred.' };
  }
}

export async function submitContactMessage(formData: any) {
  const supabase = createServerClient();
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
      const result = await resend.emails.send({
        from: 'Lawyers In Nepal <onboarding@resend.dev>',
        to: 'lawyersinnepal.com.np@gmail.com',
        subject: `New Message: ${formData.name}`,
        html: `
<div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background-color: #0a1628; padding: 40px; border-top: 8px solid #d4af37; border-radius: 8px; color: #ffffff;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #d4af37; font-size: 28px; margin: 0; font-weight: bold;">Lawyers In Nepal</h1>
    <p style="color: #94a3b8; font-family: 'Helvetica', Arial, sans-serif; font-size: 14px; margin-top: 5px; text-transform: uppercase; letter-spacing: 2px;">New Contact Message</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; font-family: 'Helvetica', Arial, sans-serif; font-size: 16px;">
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e293b;"><strong style="color: #d4af37; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Name:</strong><br/><span style="color: #e2e8f0; margin-top: 4px; display: inline-block;">${formData.name}</span></td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e293b;"><strong style="color: #d4af37; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Email:</strong><br/><a href="mailto:${formData.email}" style="color: #60a5fa; margin-top: 4px; display: inline-block; text-decoration: none;">${formData.email}</a></td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e293b;"><strong style="color: #d4af37; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Phone:</strong><br/><span style="color: #e2e8f0; margin-top: 4px; display: inline-block;">${formData.phone}</span></td></tr>
    <tr><td style="padding: 12px 0;"><strong style="color: #d4af37; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Message:</strong><br/><div style="margin-top: 10px; background-color: #1e293b; padding: 20px; border-radius: 6px; line-height: 1.6; color: #f8fafc;">${formData.message}</div></td></tr>
  </table>
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1e293b; text-align: center; font-family: 'Helvetica', Arial, sans-serif; font-size: 12px; color: #64748b;">
    <p>This is an automated notification from Lawyers In Nepal.</p>
  </div>
</div>
        `,
      });
      console.log('Contact Message Notification Result:', result);
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
  const supabase = createServerClient();
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

