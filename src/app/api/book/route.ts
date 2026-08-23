import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, physician, treatment, preferredDate, preferredTime } = body;

    // 1. Insert row into Supabase
    const { error: dbError } = await supabase.from("consultations").insert([
      {
        name,
        phone,
        email,
        physician,
        treatment,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        status: "confirmed",
      },
    ]);

    if (dbError) {
      console.error("Supabase Error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // 2. Dispatch Email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    let emailData = null;

    if (apiKey) {
      const resend = new Resend(apiKey);
      const emailResponse = await resend.emails.send({
        from: "FairDerma <onboarding@resend.dev>",
        to: ["chandansharma3166@gmail.com"],
        subject: `New Appointment Booking: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #111; background-color: #f9f9f9;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
              <h2 style="color: #C5A880; margin-top: 0;">New Consultation Booking</h2>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
              <p><strong>Patient Name:</strong> ${name}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Physician:</strong> ${physician}</p>
              <p><strong>Concern/Treatment:</strong> ${treatment}</p>
              <p><strong>Date & Time:</strong> ${preferredDate} (${preferredTime})</p>
            </div>
          </div>
        `,
      });

      if (emailResponse.error) {
        console.error("Resend API Error:", emailResponse.error);
        return NextResponse.json({ error: `Email error: ${emailResponse.error.message}` }, { status: 500 });
      }

      emailData = emailResponse.data;
    }

    // 3. Generate instant WhatsApp message URI
    const waText = encodeURIComponent(
      `Hello FairDerma,\n\nI have booked a consultation:\n• Name: ${name}\n• Phone: ${phone}\n• Physician: ${physician}\n• Treatment: ${treatment}\n• Date: ${preferredDate} (${preferredTime})`
    );
    const whatsappUrl = `https://wa.me/918858383026?text=${waText}`;

    return NextResponse.json({ success: true, emailData, whatsappUrl });
  } catch (err: any) {
    console.error("Server API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}