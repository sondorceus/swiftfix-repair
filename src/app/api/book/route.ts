import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, address, device, repair, time, slot } = body;

    // Send confirmation email via Resend or similar
    // For now, use a simple fetch to a free email API
    const emailBody = `
New SwiftFix Booking!

Customer: ${name}
Phone: ${phone}
Address: ${address}
Device: ${device}
Repair: ${repair}
Time: ${time}${slot ? ` — ${slot}` : ""}

Booked at: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}
    `.trim();

    // Try sending via mailto-style or webhook
    // Using a simple approach: post to MC comms as a notification
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

    // Send email notification to Skywalker
    // Using Formspree-style or direct SMTP would need a service
    // For now, we'll use the built-in email notification via MC
    // TODO: Wire up Resend/SendGrid for grantsales03@gmail.com

    return NextResponse.json({
      ok: true,
      message: "Booking confirmed! A technician will contact you shortly.",
      email: "grantsales03@gmail.com",
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Booking failed" }, { status: 500 });
  }
}
