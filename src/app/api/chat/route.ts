import { NextRequest, NextResponse } from "next/server";

const MC_API = "https://missioncontrolsdjg-production.up.railway.app";
const MC_KEY = process.env.MC_API_KEY || "";

function smartReply(message: string): string {
  const m = message.toLowerCase();
  if (m.match(/price|cost|how much|quote/)) return "Prices depend on your model and repair type. Use our booking flow to select your device and see exact pricing. Screen repairs start at $149 for iPhone 11 and go up to $329 for iPhone 17 Pro Max.";
  if (m.match(/screen|crack|broke|shatter/)) return "We fix cracked screens on all iPhones 11 and newer, Samsung Galaxy, and MacBooks. Prices start at $149. Use our booking tool to get your exact price — just select your model!";
  if (m.match(/battery|charge|die|drain/)) return "Battery replacements start at $69 for iPhone 11. We use premium OEM-grade batteries. Most replacements take about 20 minutes. Use the booking tool to see your model's exact price.";
  if (m.match(/camera|lens|photo/)) return "We repair camera lenses on all iPhones. Prices start at $69 depending on your model. Select your device in our booking flow for exact pricing.";
  if (m.match(/macbook|laptop|mac/)) return "We repair MacBooks! Screen repair, battery service, keyboard, trackpad, logic board, and more. All at Custom Quote pricing. Book through our site to get started.";
  if (m.match(/samsung|galaxy|android/)) return "We fix Samsung Galaxy phones — screen, battery, charging port, and more. All repairs are Contact for Price. Use our booking flow to select your model and issue!";
  if (m.match(/time|long|fast|when|how soon/)) return "Most repairs take 20-45 minutes. A certified technician comes to your location. Use the booking tool to pick a time that works for you!";
  if (m.match(/where|location|come to|address|austin/)) return "We come to YOU anywhere in Austin, TX. Home, office, coffee shop — wherever is convenient. Just enter your address when booking.";
  if (m.match(/warrant|guarantee/)) return "Every repair comes with a 30-day parts warranty. If anything goes wrong with the repair, we fix it free.";
  if (m.match(/hi|hey|hello|sup|yo/)) return "Hey there! 👋 Welcome to Austin Mobile Repair. Need a repair? I can help with pricing, timing, or any questions. What's going on with your device?";
  if (m.match(/thank|thanks/)) return "You're welcome! Ready to book? Just tap 'Start Repair' on our homepage or ask me anything else! 😊";
  return "I can help with repair pricing, what devices we fix, how long repairs take, or how our process works. Try asking something like 'How much for an iPhone 15 screen?' or use our booking tool on the homepage!";
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  try {
    await fetch(`${MC_API}/api/comms`, {
      method: "POST",
      headers: { "x-api-key": MC_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "swiftfix-web",
        fromName: "SwiftFix Chat",
        role: "system",
        body: `[REPAIR CHAT LEAD] Visitor: "${message}"`,
        tags: ["chat-lead"],
        priority: "high",
      }),
    });
  } catch { /* silent */ }

  return NextResponse.json({ reply: smartReply(message) });
}
