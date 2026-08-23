import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 2. Send Admin & Patient Alert Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "FairDerma Clinic <onboarding@resend.dev>",
        to: [process.env.CLINIC_NOTIFICATION_EMAIL || "growmyself369@gmail.com"],
        subject: `New Appointment Booking: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #111;">
            <h2 style="color: #c4a052;">New Consultation Booked</h2>
            <p><strong>Patient Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Physician:</strong> ${physician}</p>
            <p><strong>Concern/Treatment:</strong> ${treatment}</p>
            <p><strong>Date & Time:</strong> ${preferredDate} (${preferredTime})</p>
          </div>
        `,
      });
    }

    // 3. Generate instant WhatsApp message URI
    const waText = encodeURIComponent(
      `Hello FairDerma, new consultation booked:\n\nPatient: ${name}\nPhone: ${phone}\nPhysician: ${physician}\nDate: ${preferredDate}\nWindow: ${preferredTime}`
    );
    const whatsappUrl = `https://wa.me/${process.env.CLINIC_WHATSAPP_NUMBER || "918858383026"}?text=${waText}`;

    return NextResponse.json({ success: true, whatsappUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}