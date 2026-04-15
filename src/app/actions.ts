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

export async function chatWithAI(messages: { role: 'user' | 'assistant', content: string }[]) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `You are the professional AI Legal Assistant for "Lawyers In Nepal", a premier law firm in Kathmandu. 
      Your goals:
      1. Answer legal questions about Nepalese law generally (always include a disclaimer that this is not formal legal advice).
      2. If a user wants to book an appointment, guide them to provide their Name, Email, Phone, Preferred Date, and Service Type.
      3. Maintain a professional, empathetic, and formal tone.
      4. Practice areas: Civil Law, Criminal Law, Corporate Law, Family Law (Divorce), and Banking Law.
      5. Firm Phone: +977 9815861066. Location: Thamel, Kathmandu.
      
      CRITICAL: If you have collected all booking info (Name, Email, Phone, Date, Service), append the string "[[BOOKING_COMPLETE: {JSON_DATA}]]" at the very end of your message so the system can process it.`
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
    });

    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const responseText = result.response.text();

    return { success: true, text: responseText };
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return { success: false, text: "I'm sorry, I'm having trouble connecting right now. Please call us directly at +977 9815861066 for immediate assistance." };
  }
}
