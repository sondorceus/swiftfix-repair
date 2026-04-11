"use client";
import { useState } from "react";

const BRAND = "Austin Mobile Repair";
const PHONE = "(512) 555-0147";

type Device = "iphone" | "macbook" | "android" | null;
type Repair = { name: string; price: string; time: string } | null;

const DEVICES = [
  { id: "iphone" as const, label: "iPhone", icon: "📱", desc: "All models supported", primary: true },
  { id: "macbook" as const, label: "MacBook", icon: "💻", desc: "Pro, Air & iMac", primary: false },
  { id: "android" as const, label: "Android", icon: "🔧", desc: "Request Only", primary: false },
];

const REPAIRS: Record<string, { name: string; price: string; time: string }[]> = {
  iphone: [
    { name: "Screen Repair", price: "$79", time: "30 min" },
    { name: "Battery Replacement", price: "$49", time: "20 min" },
    { name: "Charging Port", price: "$59", time: "25 min" },
    { name: "Water Damage", price: "$89", time: "45 min" },
    { name: "Camera Repair", price: "$69", time: "30 min" },
    { name: "Other Issue", price: "Free Quote", time: "Varies" },
  ],
  macbook: [
    { name: "Screen Repair", price: "$199", time: "1-2 hrs" },
    { name: "Battery Service", price: "$129", time: "1 hr" },
    { name: "Keyboard Repair", price: "$149", time: "1-2 hrs" },
    { name: "SSD Upgrade", price: "$99+", time: "45 min" },
    { name: "Other Issue", price: "Free Quote", time: "Varies" },
  ],
  android: [
    { name: "Screen Repair", price: "$69+", time: "30-45 min" },
    { name: "Battery Replacement", price: "$45+", time: "25 min" },
    { name: "Charging Port", price: "$55+", time: "25 min" },
    { name: "Other Issue", price: "Free Quote", time: "Varies" },
  ],
};

export default function Home() {
  const [device, setDevice] = useState<Device>(null);
  const [repair, setRepair] = useState<Repair>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRepairSelect = (r: { name: string; price: string; time: string }) => {
    setRepair(r);
    setShowBooking(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowBooking(false); }, 3000);
  };

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#e8e8ed]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">{BRAND}</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#86868b]">
            <a href="#pricing" className="hover:text-[#1d1d1f] transition">Pricing</a>
            <a href="#trust" className="hover:text-[#1d1d1f] transition">Why Us</a>
            <a href={`tel:${PHONE}`} className="hover:text-[#1d1d1f] transition">{PHONE}</a>
          </div>
          <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#0071e3] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#0077ed] transition cursor-pointer">
            Check Pricing
          </button>
        </div>
      </nav>

      {/* HERO — value only, no inputs */}
      <section className="bg-gradient-to-b from-black to-[#1d1d1f] text-white py-28 md:py-40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#0071e3] text-sm font-medium uppercase tracking-widest mb-6">Austin&apos;s Premier Mobile Repair</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] mb-8">
            We Fix Your iPhone<br />Wherever You Are
          </h1>
          <p className="text-lg md:text-xl text-[#86868b] max-w-xl mx-auto mb-12 leading-relaxed">
            On-demand mobile repair across Austin. Same-day service. Free diagnostics. We come to you.
          </p>
          <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#0071e3] text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-[#0077ed] transition cursor-pointer">
            Check Pricing
          </button>
        </div>
      </section>

      {/* DEVICE CARDS */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-semibold text-center tracking-tight mb-4">Select Your Device</h2>
          <p className="text-[#86868b] text-center text-lg mb-12">Tap to see repair options and pricing</p>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {DEVICES.map((d) => (
              <button
                key={d.id}
                onClick={() => { setDevice(d.id); setRepair(null); setShowBooking(false); }}
                className={`rounded-2xl p-6 md:p-10 text-center transition-all duration-300 cursor-pointer border-2 ${
                  device === d.id
                    ? "border-[#0071e3] bg-[#0071e3]/5 shadow-lg scale-[1.02]"
                    : d.primary
                    ? "border-[#e8e8ed] bg-[#f5f5f7] hover:border-[#0071e3]/40 hover:shadow-md"
                    : "border-[#e8e8ed] bg-[#f5f5f7] hover:border-[#86868b]/40"
                }`}
              >
                <span className="text-4xl md:text-5xl block mb-3">{d.icon}</span>
                <h3 className="text-lg md:text-xl font-semibold mb-1">{d.label}</h3>
                <p className="text-[#86868b] text-xs md:text-sm">{d.desc}</p>
                {d.primary && !device && (
                  <span className="inline-block mt-3 text-xs bg-[#0071e3] text-white px-3 py-1 rounded-full">Most Popular</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* REPAIR OPTIONS — appears after device selected */}
      {device && (
        <section className="pb-20 md:pb-28 animate-[fadeIn_0.4s_ease-out]">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-center tracking-tight mb-3">
              {DEVICES.find(d => d.id === device)?.label} Repairs
            </h3>
            <p className="text-[#86868b] text-center mb-10">Tap a repair to book</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {REPAIRS[device]?.map((r) => (
                <button
                  key={r.name}
                  onClick={() => handleRepairSelect(r)}
                  className={`text-left rounded-2xl p-6 transition-all duration-200 cursor-pointer border ${
                    repair?.name === r.name
                      ? "border-[#0071e3] bg-[#0071e3]/5"
                      : "border-[#e8e8ed] bg-white hover:border-[#0071e3]/40 hover:shadow-md"
                  }`}
                >
                  <h4 className="font-semibold mb-2">{r.name}</h4>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-[#0071e3]">{r.price}</span>
                    <span className="text-[#86868b] text-sm">{r.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TRUST SIGNALS */}
      <section id="trust" className="py-20 md:py-28 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { stat: "5,000+", label: "Devices Repaired" },
              { stat: "4.9★", label: "Customer Rating" },
              { stat: "30 min", label: "Average Repair" },
              { stat: "90 Day", label: "Warranty" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{s.stat}</div>
                <p className="text-[#86868b] text-sm">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Free Diagnostics", desc: "Know the problem and price before committing." },
              { title: "We Come to You", desc: "Home, office, or cafe. Our techs travel to your location." },
              { title: "No Fix, No Fee", desc: "Can't fix it? You pay nothing." },
              { title: "Same-Day Service", desc: "Most repairs completed within the hour." },
              { title: "Genuine Parts", desc: "OEM-grade components with full warranty." },
              { title: "Certified Techs", desc: "Background-checked, experienced professionals." },
            ].map((s) => (
              <div key={s.title} className="flex gap-3 p-4">
                <span className="text-[#0071e3] text-lg font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-semibold mb-1">{s.title}</h4>
                  <p className="text-[#86868b] text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1d1d1f] text-[#86868b] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">{BRAND}</h4>
              <p className="text-sm leading-relaxed">Premium mobile repair. We come to you — fast, reliable, affordable.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>iPhone Repair</li><li>MacBook Repair</li><li>Screen Replacement</li><li>Battery Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>{PHONE}</li><li>info@austinmobilerepair.com</li><li>Mon-Sat: 8AM-8PM</li><li>Sun: 10AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-xs">
            © 2026 {BRAND}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* SLIDE-IN BOOKING PANEL */}
      {showBooking && repair && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50 transition-opacity" onClick={() => setShowBooking(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto animate-[slideIn_0.3s_ease-out]">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold">Book Repair</h3>
                <button onClick={() => setShowBooking(false)} className="text-[#86868b] hover:text-[#1d1d1f] text-2xl cursor-pointer">×</button>
              </div>

              {/* Service Summary */}
              <div className="bg-[#f5f5f7] rounded-2xl p-5 mb-8">
                <p className="text-sm text-[#86868b] mb-1">Selected Service</p>
                <p className="font-semibold text-lg">{repair.name}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-[#0071e3] font-bold text-xl">{repair.price}</span>
                  <span className="text-[#86868b]">~{repair.time}</span>
                </div>
                <p className="text-sm text-[#86868b] mt-2">
                  {DEVICES.find(d => d.id === device)?.label} • Free diagnostics included
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <span className="text-5xl block mb-4">✓</span>
                  <h4 className="text-xl font-semibold mb-2">Request Sent!</h4>
                  <p className="text-[#86868b]">We&apos;ll text you a confirmed quote within 15 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#86868b] mb-2">Preferred Date & Time</label>
                    <input type="datetime-local" className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#86868b] mb-2">Your Location</label>
                    <input type="text" placeholder="Address in Austin, TX" className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#86868b] mb-2">Name</label>
                      <input type="text" placeholder="Your name" className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#86868b] mb-2">Phone</label>
                      <input type="tel" placeholder="(512) 555-0000" className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#86868b] mb-2">Notes (optional)</label>
                    <textarea rows={2} placeholder="Any details about the issue..." className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-[#0071e3] text-white py-4 rounded-full text-lg font-medium hover:bg-[#0077ed] transition cursor-pointer">
                    Book Repair →
                  </button>
                  <p className="text-[#86868b] text-xs text-center">Free diagnostics. No obligation. Cancel anytime.</p>
                </form>
              )}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </main>
  );
}
