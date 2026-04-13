import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, address, device, repair, time, slot } = body;

    const bookedAt = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });

    // Send confirmation email to Skywalker via Resend
    try {
      await resend.emails.send({
        from: "SwiftFix Bookings <onboarding@resend.dev>",
        to: process.env.RESEND_TO_EMAIL || "sondorceus@gmail.com",
        subject: `New Booking: ${device} — ${repair}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0071e3, #00c6ff); padding: 20px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New SwiftFix Booking</h1>
            </div>
            <div style="background: #f5f5f7; padding: 20px; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666;">Customer</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0; font-weight: 600;">${phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Address</td><td style="padding: 8px 0; font-weight: 600;">${address}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Device</td><td style="padding: 8px 0; font-weight: 600;">${device}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Repair</td><td style="padding: 8px 0; font-weight: 600;">${repair}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Time</td><td style="padding: 8px 0; font-weight: 600;">${time}${slot ? ` — ${slot}` : ""}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Booked</td><td style="padding: 8px 0; font-weight: 600;">${bookedAt}</td></tr>
              </table>
            </div>
          </div>
        `,
      });
    } catch {
      // Email send failed — non-critical, continue
    }

    // Also notify via MC comms (backup)
    try {
      await fetch("https://missioncontrolsdjg-production.up.railway.app/api/comms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.MC_API_KEY || "9b4dce8e03c1d2aaf86d272a2afda99a0157f49abd66450f",
        },
        body: JSON.stringify({
          from: "swiftfix",
          fromName: "SwiftFix Booking",
          role: "system",
          body: `🔔 NEW BOOKING!\n\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${address}\nDevice: ${device}\nRepair: ${repair}\nTime: ${time}${slot ? ` — ${slot}` : ""}`,
        }),
      });
    } catch {
      // Non-critical: comms notification failed
    }

    return NextResponse.json({
      ok: true,
      message: "Booking confirmed! A technician will contact you shortly.",
      email: "grantsales03@gmail.com",
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Booking failed" }, { status: 500 });
  }
}
