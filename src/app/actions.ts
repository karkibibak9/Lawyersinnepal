'use server';

import { supabase } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';

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
    
    return { success: true };
  } catch (error: any) {
    console.error('Error submitting appointment:', error.message);
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
    console.error('Error tracking WhatsApp lead:', error.message);
    return { success: false };
  }
}
