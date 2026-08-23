import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

// Paste your actual re_... key here
const resend = new Resend("re_dCug56GS_AFELAXLXRhgp2ZW9SV8ko6uv");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, physician, treatment, preferredDate, preferredTime } = body;

    // 1. Insert into Supabase Database
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

    // 2. Send Admin Notification Email via Resend
    // NOTE: Resend free tier only sends to the email registered on your Resend account (chandansharma3166...)
    await resend.emails.send({
      from: "FairDerma <onboarding@resend.dev>",
      to: ["chandansharma3166@gmail.com"], // Must match your Resend login email
      subject: `New Appointment Booking: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
          <h2 style="color: #c4a052; margin-bottom: 15px;">New Consultation Request</h2>
          <hr style="border: 0; border-top: 1px solid #ddd; margin-bottom: 20px;" />
          <p><strong>Patient Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Physician:</strong> ${physician}</p>
          <p><strong>Concern/Treatment:</strong> ${treatment}</p>
          <p><strong>Date & Window:</strong> ${preferredDate} (${preferredTime})</p>
        </div>
      `,
    });

    // 3. Generate instant WhatsApp message URI
    const waText = encodeURIComponent(
      `Hello FairDerma,\n\nI have booked a consultation:\n• Name: ${name}\n• Phone: ${phone}\n• Physician: ${physician}\n• Treatment: ${treatment}\n• Date: ${preferredDate} (${preferredTime})`
    );
    const whatsappUrl = `https://wa.me/918858383026?text=${waText}`;

    return NextResponse.json({ success: true, whatsappUrl });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}