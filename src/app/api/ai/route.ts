import { NextRequest, NextResponse } from 'next/server';
import { processMessage } from '@/lib/chatEngine';
import type { BookingState, BookingData } from '@/lib/chatEngine';
import { supabase } from '@/lib/supabase/client';

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

    // If booking is complete, save directly to Supabase
    if (result.bookingComplete) {
      try {
        await supabase.from('appointments').insert([{
          name: result.bookingComplete.name || '',
          email: '',
          phone: result.bookingComplete.phone || '',
          service: result.bookingComplete.service || '',
          preferred_date: result.bookingComplete.date || '',
          message: 'Booked via AI Chat Assistant',
          status: 'pending',
        }]);
      } catch (e) {
        console.error('Booking save error:', e);
        // Non-fatal — still return success response
      }
    }

    // Small artificial delay for a more natural feel (150–400ms)
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
