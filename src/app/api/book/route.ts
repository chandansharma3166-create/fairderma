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

    // 2. Dispatch Emails via Resend
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.CLINIC_NOTIFICATION_EMAIL || "chandansharma3166@gmail.com";
    const clinicPhone = process.env.CLINIC_WHATSAPP_NUMBER || "918858383026";

    let emailSent = false;

    if (apiKey) {
      const resend = new Resend(apiKey);

      // Email A: Notification to Clinic Admin
      try {
        const adminEmailResponse = await resend.emails.send({
          from: "FairDerma Triage <onboarding@resend.dev>",
          to: [adminEmail],
          subject: `New Appointment Booking: ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 24px; color: #111; background-color: #f9f9f9;">
              <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #eee;">
                <h2 style="color: #C5A880; margin-top: 0;">New Consultation Triage</h2>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
                <p><strong>Patient Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Physician:</strong> ${physician}</p>
                <p><strong>Treatment/Concern:</strong> ${treatment}</p>
                <p><strong>Slot:</strong> ${preferredDate} (${preferredTime})</p>
              </div>
            </div>
          `,
        });

        if (!adminEmailResponse.error) {
          emailSent = true;
        } else {
          console.error("Admin notification error:", adminEmailResponse.error);
        }
      } catch (err) {
        console.error("Failed to send admin email:", err);
      }

      // Email B: Confirmation sent directly to Patient
      if (email) {
        try {
          await resend.emails.send({
            from: "FairDerma Clinical Care <onboarding@resend.dev>",
            to: [email],
            subject: `Consultation Confirmed - FairDerma Clinic`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 32px; background-color: #0d0f12; color: #e1e4ea;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #16161a; padding: 32px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                  <div style="text-align: center; margin-bottom: 24px;">
                    <h1 style="color: #C5A880; font-size: 22px; letter-spacing: 2px; margin: 0;">FAIRDERMA</h1>
                    <p style="color: #888; font-size: 12px; margin-top: 4px; text-transform: uppercase;">Advanced Clinical Dermatology</p>
                  </div>

                  <h2 style="color: #ffffff; font-size: 18px; font-weight: 400; margin-top: 0;">Hello ${name},</h2>
                  <p style="color: #b0b4ba; font-size: 14px; line-height: 1.6;">
                    Your clinical assessment and consultation request has been successfully registered.
                  </p>

                  <div style="background-color: #0d0f12; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 20px; margin: 24px 0;">
                    <p style="margin: 6px 0; font-size: 13px; color: #b0b4ba;"><strong style="color: #fff;">Physician:</strong> ${physician}</p>
                    <p style="margin: 6px 0; font-size: 13px; color: #b0b4ba;"><strong style="color: #fff;">Treatment Focus:</strong> ${treatment}</p>
                    <p style="margin: 6px 0; font-size: 13px; color: #b0b4ba;"><strong style="color: #fff;">Scheduled Date:</strong> ${preferredDate}</p>
                    <p style="margin: 6px 0; font-size: 13px; color: #b0b4ba;"><strong style="color: #fff;">Time Window:</strong> ${preferredTime}</p>
                  </div>

                  <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 24px;">
                    <h3 style="color: #C5A880; font-size: 13px; text-transform: uppercase; margin-bottom: 8px;">Pre-Visit Advisory:</h3>
                    <ul style="color: #8f949c; font-size: 12px; padding-left: 20px; line-height: 1.6;">
                      <li>Please arrive 10 minutes prior to your time window for your skin scan.</li>
                      <li>Avoid applying active retinoids or chemical peels 48 hours prior to diagnosis.</li>
                    </ul>
                  </div>

                  <div style="text-align: center; margin-top: 32px;">
                    <a href="https://wa.me/${clinicPhone}" style="background-color: #C5A880; color: #000; text-decoration: none; padding: 12px 24px; font-size: 12px; font-weight: bold; border-radius: 6px; display: inline-block; text-transform: uppercase; letter-spacing: 1px;">
                      Contact Concierge on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            `,
          });
        } catch (err) {
          // Non-blocking log: unverified domains on free tier will fail gracefully without breaking the UX
          console.warn("Patient email notification skipped or restricted:", err);
        }
      }
    }

    // 3. Pre-formatted WhatsApp confirmation link
    const waText = encodeURIComponent(
      `*FairDerma Consultation Request*\n\n` +
      `• *Name:* ${name}\n` +
      `• *Phone:* ${phone}\n` +
      `• *Physician:* ${physician}\n` +
      `• *Focus:* ${treatment}\n` +
      `• *Slot:* ${preferredDate} (${preferredTime})\n\n` +
      `_I have submitted my booking online and would like to confirm my consultation details._`
    );
    const whatsappUrl = `https://wa.me/${clinicPhone}?text=${waText}`;

    return NextResponse.json({ 
      success: true, 
      emailSent, 
      whatsappUrl 
    });
  } catch (err: any) {
    console.error("Server API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}