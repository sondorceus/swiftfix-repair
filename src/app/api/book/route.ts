import { NextResponse } from "next/server";
import { Resend } from "resend";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

function saveBooking(booking: Record<string, unknown>) {
  const dir = join(process.cwd(), "data");
  const file = join(dir, "bookings.json");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  let data = { bookings: [] as Record<string, unknown>[], blockedSlots: {} };
  if (existsSync(file)) {
    try { data = JSON.parse(readFileSync(file, "utf8")); } catch { /* fresh */ }
  }
  data.bookings.push(booking);
  writeFileSync(file, JSON.stringify(data, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, address, device, repair, time, date, slot, bookingType } = body;
    const isASAP = bookingType === "asap";

    const bookedAt = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });

    // Save booking to local data
    saveBooking({
      id: `bk-${Date.now()}`,
      name, phone, email, address, device, repair,
      bookingType: isASAP ? "asap" : "scheduled",
      date, slot, bookedAt,
    });

    // Send confirmation email to Skywalker via Resend
    try {
      await resend.emails.send({
        from: "SwiftFix Bookings <onboarding@resend.dev>",
        to: process.env.RESEND_TO_EMAIL || "sondorceus@gmail.com",
        subject: `${isASAP ? "🚨 ASAP" : "📅 Scheduled"} Booking: ${device} — ${repair}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0071e3, #00c6ff); padding: 20px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New SwiftFix Booking</h1>
            </div>
            <div style="background: #f5f5f7; padding: 20px; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666;">Customer</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
                ${phone ? `<tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0; font-weight: 600;">${phone}</td></tr>` : ""}
                ${email ? `<tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0; font-weight: 600;">${email}</td></tr>` : ""}
                <tr><td style="padding: 8px 0; color: #666;">Address</td><td style="padding: 8px 0; font-weight: 600;">${address}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Device</td><td style="padding: 8px 0; font-weight: 600;">${device}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Repair</td><td style="padding: 8px 0; font-weight: 600;">${repair}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Type</td><td style="padding: 8px 0; font-weight: 600; ${isASAP ? 'color: #e53e3e;' : ''}">${isASAP ? "🚨 ASAP — Contact within 30 min" : `Scheduled: ${date} at ${slot}`}</td></tr>
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
          body: `${isASAP ? "🚨 ASAP BOOKING!" : "📅 SCHEDULED BOOKING"}\n\nCustomer: ${name}${phone ? `\nPhone: ${phone}` : ""}${email ? `\nEmail: ${email}` : ""}\nAddress: ${address}\nDevice: ${device}\nRepair: ${repair}\n${isASAP ? "Type: ASAP — Contact within 30 min" : `Date: ${date}\nTime: ${slot}`}`,
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
