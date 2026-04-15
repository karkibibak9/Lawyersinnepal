import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ success: false, text: "Invalid request format." }, { status: 400 });
    }

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
      history: messages.slice(0, -1)
        .filter((_, i) => i > 0 || messages[0].role === 'user') // Skip welcome message if it's the first
        .map((m: any) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
    });

    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const responseText = result.response.text();

    return NextResponse.json({ success: true, text: responseText });
  } catch (error: any) {
    console.error('AI API Route Error:', error);
    return NextResponse.json({ 
      success: false, 
      text: "I'm sorry, I'm having trouble connecting right now. Please call us directly at +977 9815861066 for immediate assistance." 
    }, { status: 500 });
  }
}
