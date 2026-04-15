import { NextRequest, NextResponse } from 'next/server';
import { processMessage } from '@/lib/chatEngine';
import type { BookingState, BookingData } from '@/lib/chatEngine';
import { supabase } from '@/lib/supabase/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { message, bookingState, bookingData } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ success: false, text: 'Invalid request.' }, { status: 400 });
    }

    const result = processMessage(
      message,
      (bookingState as BookingState) || 'idle',
      (bookingData as BookingData) || {}
    );

    // If booking is complete, save to Supabase AND send email
    if (result.bookingComplete) {
      const booking = result.bookingComplete;

      // 1. Save to Supabase
      try {
        await supabase.from('appointments').insert([{
          name: booking.name || '',
          email: '',
          phone: booking.phone || '',
          service: booking.service || '',
          preferred_date: booking.date || '',
          message: 'Booked via AI Chat Assistant',
          status: 'pending',
        }]);
      } catch (e) {
        console.error('Supabase booking save error:', e);
      }

      // 2. Send email notification via Resend
      try {
        await resend.emails.send({
          from: 'Lawyers In Nepal <onboarding@resend.dev>',
          to: 'karkibibak9@gmail.com',
          subject: `📅 New Chat Appointment: ${booking.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1a2e; color: #fff; border-radius: 8px; overflow: hidden;">
              <div style="background: #b8962e; padding: 24px;">
                <h1 style="margin: 0; color: #fff; font-size: 22px;">⚖️ New Appointment Request</h1>
                <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">Submitted via AI Chat Assistant</p>
              </div>
              <div style="padding: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #b8962e; font-weight: bold; width: 130px;">👤 Name</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${booking.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #b8962e; font-weight: bold;">📞 Phone</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${booking.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #b8962e; font-weight: bold;">⚖️ Service</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${booking.service}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #b8962e; font-weight: bold;">📅 Date</td>
                    <td style="padding: 10px 0;">${booking.date}</td>
                  </tr>
                </table>
                <div style="margin-top: 24px; background: rgba(184,150,46,0.1); border: 1px solid rgba(184,150,46,0.3); border-radius: 6px; padding: 16px;">
                  <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.7);">
                    This appointment was booked through the AI Chat Assistant on your website. 
                    Please contact the client on WhatsApp: <strong>${booking.phone}</strong>
                  </p>
                </div>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 16px; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.4);">Lawyers In Nepal · Thamel, Kathmandu · +977 9815861066</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Resend email error:', emailError);
        // Non-fatal — booking still confirmed to user
      }
    }

    // Small artificial delay for a more natural feel
    await new Promise(r => setTimeout(r, 150 + Math.random() * 250));

    return NextResponse.json({
      success: true,
      text: result.response,
      bookingState: result.newBookingState,
      bookingData: result.newBookingData,
      bookingComplete: !!result.bookingComplete,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      success: false,
      text: 'I\'m having a moment of confusion! Please try again or call us at +977 9815861066.',
    }, { status: 500 });
  }
}
