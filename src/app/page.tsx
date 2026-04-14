"use client";
import { useState, useEffect } from "react";

const BRAND = "Austin Mobile Repair";
const PHONE = "(512) 555-0147";

function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const textSize = size === "sm" ? "16px" : size === "lg" ? "28px" : "20px";
  const subSize = size === "sm" ? "9px" : size === "lg" ? "14px" : "11px";
  return (
    <div className="flex flex-col leading-none">
      <span style={{ fontSize: textSize, fontWeight: 700, letterSpacing: "-0.02em", background: "linear-gradient(90deg, #0071e3, #40a9ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Austin Mobile
      </span>
      <span style={{ fontSize: subSize, fontWeight: 500, letterSpacing: "0.08em", color: "#86868b", textTransform: "uppercase" as const, marginTop: "2px" }}>
        Repair
      </span>
    </div>
  );
}

type Step = "select" | "issue" | "time" | "confirm";

const IPHONE_SERIES = [
  { id: "16", label: "iPhone 16", year: "2024", frame: "#3C3C3C", accent: "#7856FF", notch: "dynamic", cameras: 3, edges: "round",
    variants: [
      { id: "iphone16", label: "iPhone 16", size: '6.1"' },
      { id: "iphone16plus", label: "iPhone 16 Plus", size: '6.7"' },
      { id: "iphone16pro", label: "iPhone 16 Pro", size: '6.3"' },
      { id: "iphone16promax", label: "iPhone 16 Pro Max", size: '6.9"' },
    ]},
  { id: "15", label: "iPhone 15", year: "2023", frame: "#2C2C2E", accent: "#0071e3", notch: "dynamic", cameras: 3, edges: "round",
    variants: [
      { id: "iphone15", label: "iPhone 15", size: '6.1"' },
      { id: "iphone15plus", label: "iPhone 15 Plus", size: '6.7"' },
      { id: "iphone15pro", label: "iPhone 15 Pro", size: '6.1"' },
      { id: "iphone15promax", label: "iPhone 15 Pro Max", size: '6.7"' },
    ]},
  { id: "14", label: "iPhone 14", year: "2022", frame: "#1C1C1E", accent: "#5E5CE6", notch: "dynamic", cameras: 2, edges: "flat",
    variants: [
      { id: "iphone14", label: "iPhone 14", size: '6.1"' },
      { id: "iphone14plus", label: "iPhone 14 Plus", size: '6.7"' },
      { id: "iphone14pro", label: "iPhone 14 Pro", size: '6.1"' },
      { id: "iphone14promax", label: "iPhone 14 Pro Max", size: '6.7"' },
    ]},
  { id: "13", label: "iPhone 13", year: "2021", frame: "#48484A", accent: "#FF375F", notch: "classic", cameras: 2, edges: "flat",
    variants: [
      { id: "iphone13mini", label: "iPhone 13 Mini", size: '5.4"' },
      { id: "iphone13", label: "iPhone 13", size: '6.1"' },
      { id: "iphone13pro", label: "iPhone 13 Pro", size: '6.1"' },
      { id: "iphone13promax", label: "iPhone 13 Pro Max", size: '6.7"' },
    ]},
  { id: "12", label: "iPhone 12", year: "2020", frame: "#636366", accent: "#30D158", notch: "classic", cameras: 2, edges: "flat",
    variants: [
      { id: "iphone12mini", label: "iPhone 12 Mini", size: '5.4"' },
      { id: "iphone12", label: "iPhone 12", size: '6.1"' },
      { id: "iphone12pro", label: "iPhone 12 Pro", size: '6.1"' },
      { id: "iphone12promax", label: "iPhone 12 Pro Max", size: '6.7"' },
    ]},
  { id: "11", label: "iPhone 11", year: "2019", frame: "#8E8E93", accent: "#FF9F0A", notch: "classic", cameras: 2, edges: "round",
    variants: [
      { id: "iphone11", label: "iPhone 11", size: '6.1"' },
      { id: "iphone11pro", label: "iPhone 11 Pro", size: '5.8"' },
      { id: "iphone11promax", label: "iPhone 11 Pro Max", size: '6.5"' },
    ]},
];

const IPHONE_REPAIRS: Record<string, { name: string; price: string; time: string; icon: string }[]> = {
  iphone16: [
    { name: "Screen Repair", price: "$129", time: "30-45 min", icon: "📱" },
    { name: "Battery Replacement", price: "$79", time: "20 min", icon: "🔋" },
    { name: "Charging Port", price: "$89", time: "25 min", icon: "⚡" },
    { name: "Camera Repair", price: "$99", time: "30 min", icon: "📷" },
    { name: "Back Glass", price: "$109", time: "45 min", icon: "🔲" },
    { name: "Speaker/Mic", price: "$79", time: "25 min", icon: "🔊" },
    { name: "Water Damage", price: "$99+", time: "1-2 hrs", icon: "💧" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ],
  iphone15: [
    { name: "Screen Repair", price: "$109", time: "30 min", icon: "📱" },
    { name: "Battery Replacement", price: "$69", time: "20 min", icon: "🔋" },
    { name: "Charging Port", price: "$79", time: "25 min", icon: "⚡" },
    { name: "Camera Repair", price: "$89", time: "30 min", icon: "📷" },
    { name: "Back Glass", price: "$99", time: "40 min", icon: "🔲" },
    { name: "Speaker/Mic", price: "$69", time: "25 min", icon: "🔊" },
    { name: "Water Damage", price: "$89+", time: "1-2 hrs", icon: "💧" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ],
  iphone14: [
    { name: "Screen Repair", price: "$89", time: "30 min", icon: "📱" },
    { name: "Battery Replacement", price: "$59", time: "20 min", icon: "🔋" },
    { name: "Charging Port", price: "$69", time: "25 min", icon: "⚡" },
    { name: "Camera Repair", price: "$79", time: "30 min", icon: "📷" },
    { name: "Back Glass", price: "$89", time: "40 min", icon: "🔲" },
    { name: "Speaker/Mic", price: "$59", time: "25 min", icon: "🔊" },
    { name: "Water Damage", price: "$79+", time: "1-2 hrs", icon: "💧" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ],
  iphone13: [
    { name: "Screen Repair", price: "$79", time: "25 min", icon: "📱" },
    { name: "Battery Replacement", price: "$49", time: "20 min", icon: "🔋" },
    { name: "Charging Port", price: "$59", time: "25 min", icon: "⚡" },
    { name: "Camera Repair", price: "$69", time: "25 min", icon: "📷" },
    { name: "Back Glass", price: "$79", time: "35 min", icon: "🔲" },
    { name: "Speaker/Mic", price: "$55", time: "20 min", icon: "🔊" },
    { name: "Water Damage", price: "$69+", time: "1-2 hrs", icon: "💧" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ],
  iphone12: [
    { name: "Screen Repair", price: "$69", time: "25 min", icon: "📱" },
    { name: "Battery Replacement", price: "$45", time: "15 min", icon: "🔋" },
    { name: "Charging Port", price: "$55", time: "20 min", icon: "⚡" },
    { name: "Camera Repair", price: "$65", time: "25 min", icon: "📷" },
    { name: "Back Glass", price: "$69", time: "35 min", icon: "🔲" },
    { name: "Speaker/Mic", price: "$49", time: "20 min", icon: "🔊" },
    { name: "Water Damage", price: "$59+", time: "1-2 hrs", icon: "💧" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ],
  iphone11: [
    { name: "Screen Repair", price: "$59", time: "25 min", icon: "📱" },
    { name: "Battery Replacement", price: "$39", time: "15 min", icon: "🔋" },
    { name: "Charging Port", price: "$49", time: "20 min", icon: "⚡" },
    { name: "Camera Repair", price: "$55", time: "25 min", icon: "📷" },
    { name: "Back Glass", price: "$59", time: "30 min", icon: "🔲" },
    { name: "Speaker/Mic", price: "$45", time: "20 min", icon: "🔊" },
    { name: "Water Damage", price: "$49+", time: "1-2 hrs", icon: "💧" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ],
};

const MACBOOK_REPAIRS = [
  { name: "Screen Repair", price: "$199+", time: "1-2 hrs", icon: "🖥" },
  { name: "Battery Service", price: "$129", time: "1 hr", icon: "🔋" },
  { name: "Keyboard Repair", price: "$149", time: "1-2 hrs", icon: "⌨️" },
  { name: "SSD Upgrade", price: "$99+", time: "45 min", icon: "💾" },
  { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
];

const BOOKING_OPTIONS = [
  { label: "ASAP", sub: "A technician will contact you within 30 minutes", badge: "Fastest", icon: "⚡" },
  { label: "Schedule", sub: "Pick a date and time that works for you", badge: null, icon: "📅" },
];

const SCHEDULE_SLOTS = [
  "9:00 - 11:00 AM",
  "11:00 AM - 1:00 PM",
  "1:00 - 3:00 PM",
  "3:00 - 5:00 PM",
  "5:00 - 7:00 PM",
];

function getNext7Days(): { label: string; value: string; day: string }[] {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" });
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const value = d.toISOString().split("T")[0];
    days.push({ label: `${dayName}, ${label}`, value, day: dayName });
  }
  return days;
}

function LivePulse() {
  return (
    <span className="relative flex h-2.5 w-2.5 mr-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
    </span>
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-300 ${
            i < current ? "bg-[#0071e3] w-8" : i === current ? "bg-[#0071e3] w-12" : "bg-[#e8e8ed] w-8"
          }`}
        />
      ))}
    </div>
  );
}

function TechCard() {
  const [eta, setEta] = useState(22);
  useEffect(() => {
    const t = setInterval(() => setEta(prev => Math.max(15, prev + (Math.random() > 0.5 ? -1 : 0))), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-[#1a1a1e] to-[#222] rounded-2xl p-4 border border-white/15">
      <div className="w-12 h-12 rounded-full bg-[#0071e3] flex items-center justify-center text-white font-bold text-lg shrink-0">
        JM
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">James M.</p>
        <p className="text-[#86868b] text-xs">Certified Tech · 4.9★ · 1,200+ repairs</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[#0071e3] font-bold text-sm">{eta} min</p>
        <p className="text-[#86868b] text-[10px]">ETA away</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>("select");
  const [deviceType, setDeviceType] = useState<"iphone" | "macbook" | "android" | null>(null);
  const [iphoneModel, setIphoneModel] = useState<string | null>(null);
  const [repair, setRepair] = useState<{ name: string; price: string; time: string; icon: string } | null>(null);
  const [timeChoice, setTimeChoice] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [specificSlot, setSpecificSlot] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  // Map variant IDs back to their series repair key
  const getRepairKey = (model: string | null) => {
    if (!model) return null;
    // Strip variant suffixes to get base series key
    const base = model.replace(/promax|plus|pro|mini/g, "");
    return IPHONE_REPAIRS[base] ? base : model;
  };

  const currentRepairs = deviceType === "iphone" && iphoneModel
    ? IPHONE_REPAIRS[getRepairKey(iphoneModel) || ""] || []
    : deviceType === "macbook" ? MACBOOK_REPAIRS : [];

  const deviceLabel = deviceType === "iphone" && iphoneModel
    ? IPHONE_SERIES.flatMap(s => s.variants).find(v => v.id === iphoneModel)?.label || "iPhone"
    : deviceType === "macbook" ? "MacBook" : "Android";

  const handleDeviceSelect = (d: "iphone" | "macbook" | "android") => {
    setDeviceType(d);
    setIphoneModel(null);
    setSelectedSeries(null);
    setRepair(null);
    setTimeChoice(null);
    setSelectedDate(null);
    setSpecificSlot(null);
    if (d === "iphone") {
      setShowModelPicker(true);
    } else if (d === "macbook") {
      setStep("issue");
    }
  };

  const handleSeriesSelect = (seriesId: string) => {
    setSelectedSeries(seriesId);
  };

  const handleVariantSelect = (variantId: string) => {
    setIphoneModel(variantId);
    setShowModelPicker(false);
    setSelectedSeries(null);
    setStep("issue");
  };

  const handleRepairSelect = (r: { name: string; price: string; time: string; icon: string }) => {
    setRepair(r);
    setStep("time");
  };

  const handleTimeSelect = (choice: string) => {
    setTimeChoice(choice);
    setSelectedDate(null);
    setSpecificSlot(null);
    if (choice === "ASAP") {
      setStep("confirm");
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSpecificSlot(null);
  };

  const handleSlotSelect = (slot: string) => {
    setSpecificSlot(slot);
    setStep("confirm");
  };

  const handleBack = () => {
    if (step === "confirm") setStep("time");
    else if (step === "time") setStep("issue");
    else if (step === "issue") {
      if (deviceType === "iphone") {
        // Go back to model picker instead of device selection
        setShowModelPicker(true);
        setSelectedSeries(null);
        setIphoneModel(null);
        setRepair(null);
      } else {
        setStep("select");
        setDeviceType(null);
        setIphoneModel(null);
      }
    } else if (step === "select" && showModelPicker && selectedSeries) {
      // Back from variant submenu to series list
      setSelectedSeries(null);
    } else if (step === "select" && showModelPicker) {
      // Back from series list to device selection
      setShowModelPicker(false);
      setDeviceType(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email, address,
          device: deviceLabel,
          repair: repair?.name,
          time: timeChoice,
          date: selectedDate,
          slot: specificSlot,
          bookingType: timeChoice === "ASAP" ? "asap" : "scheduled",
        }),
      });
    } catch {
      // Booking notification failed silently — customer still sees confirmation
    }
  };

  const resetAll = () => {
    setStep("select");
    setDeviceType(null);
    setIphoneModel(null);
    setRepair(null);
    setTimeChoice(null);
    setSelectedDate(null);
    setSpecificSlot(null);
    setAddress("");
    setName("");
    setPhone("");
    setEmail("");
    setSubmitted(false);
    setShowModelPicker(false);
    setSelectedSeries(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#1d1d1f] text-white">
      {/* STICKY NAV — compact, app-like */}
      <nav className="sticky top-0 z-40 bg-[#1d1d1f]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={resetAll} className="cursor-pointer"><Logo size="sm" /></button>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-xs text-[#34c759] font-medium">
              <LivePulse />
              <span className="hidden sm:inline">Techs Available</span>
            </div>
            <a href={`tel:${PHONE}`} className="bg-[#0071e3] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-[#0077ED] transition">
              Call Us
            </a>
          </div>
        </div>
      </nav>

      {/* HERO — Uber-style: tight, action-focused, mobile-first */}
      {step === "select" && !showModelPicker && (
        <section className="bg-gradient-to-b from-[#0a0a0a] to-[#1d1d1f] text-white">
          <div className="max-w-lg mx-auto px-4 pt-10 pb-8">
            {/* Live status bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                <LivePulse />
                <span className="text-xs font-medium">3 technicians nearby</span>
              </div>
              <span className="text-xs text-[#86868b]">Austin, TX</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-3">
              We Fix Your Phone<br />Wherever You Are
            </h1>
            <p className="text-[#86868b] text-sm mb-4 leading-relaxed max-w-sm">
              Same-day service. Most repairs done in 30 minutes. A certified technician drives to you and fixes it on the spot.
            </p>

            {/* Trust badges — compact row */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { label: "Same-Day Service", icon: "⚡" },
                { label: "90-Day Warranty", icon: "🛡" },
                { label: "Certified Techs", icon: "✓" },
                { label: "4.9★ Rating", icon: "★" },
              ].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 bg-white/8 border border-white/15 rounded-full px-3 py-1 text-[11px] font-medium text-white/80">
                  <span className="text-[#34c759]">{b.icon}</span> {b.label}
                </span>
              ))}
            </div>

            {/* Quick action: What needs fixing? */}
            <div className="space-y-3 mb-8">
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-medium">Fix my device now</p>
              {[
                { id: "iphone" as const, label: "iPhone", sub: "11 and newer · From $39", icon: "📱", hot: true },
                { id: "macbook" as const, label: "MacBook", sub: "All models · From $99", icon: "💻", hot: false },
                { id: "android" as const, label: "Android", sub: "Custom quote · Call us", icon: "📲", hot: false },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => d.id === "android" ? window.location.href = `tel:${PHONE}` : handleDeviceSelect(d.id)}
                  className={`w-full flex items-center gap-4 rounded-2xl transition-all duration-200 cursor-pointer text-left ${
                    d.hot
                      ? "p-5 bg-white/10 border-2 border-[#0071e3]/40 hover:bg-white/15 hover:border-[#0071e3]/70"
                      : "p-4 bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span className={d.hot ? "text-4xl" : "text-2xl"}>{d.icon}</span>
                  <div className="flex-1">
                    <p className={`font-semibold text-white ${d.hot ? "text-lg" : ""}`}>{d.label}</p>
                    <p className={`text-[#86868b] ${d.hot ? "text-sm" : "text-xs"}`}>{d.sub}</p>
                  </div>
                  <svg className="w-5 h-5 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {d.hot && (
                    <span className="absolute right-16 text-[10px] bg-[#0071e3] text-white px-2 py-0.5 rounded-full font-medium" style={{ position: "relative", right: "auto" }}>
                      Popular
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Social proof strip */}
            <div className="bg-[#2a2a2e] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["JM", "SK", "AL"].map((init, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-[#0071e3] flex items-center justify-center text-white text-[10px] font-bold border-2 border-[#1d1d1f]">
                        {init}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">5,000+ repairs completed</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[#fbbf24] text-[10px]">★★★★★</span>
                      <span className="text-[#86868b] text-[10px]">4.9/5 from 2,400+ reviews</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-xs font-bold">90-day</p>
                  <p className="text-[#86868b] text-[10px]">warranty</p>
                </div>
              </div>
              <p className="text-[#86868b] text-[10px] text-center italic">&quot;He came to my office and fixed my screen in 25 minutes. Incredible service.&quot; — Sarah K.</p>
            </div>

            {/* URGENCY SIGNALS */}
            <div className="mt-6 flex flex-col items-center gap-1.5">
              <p className="text-[#34c759] text-xs font-medium animate-pulse">Limited slots available today</p>
              <p className="text-[#86868b] text-[10px]">Same-day appointments filling fast</p>
            </div>
          </div>
        </section>
      )}

      {/* PRICING ANCHOR STRIP — early visibility */}
      {step === "select" && !showModelPicker && (
        <section className="py-6 bg-[#232326] border-b border-white/10">
          <div className="max-w-lg mx-auto px-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Screen Repair", price: "from $89", icon: "📱" },
                { label: "Battery Replace", price: "from $59", icon: "🔋" },
                { label: "Diagnostics", price: "FREE", icon: "🔍" },
              ].map((p) => (
                <div key={p.label} className="bg-[#2a2a2e] border border-white/10 rounded-xl p-3">
                  <span className="text-lg">{p.icon}</span>
                  <p className="text-[#0071e3] font-bold text-sm mt-1">{p.price}</p>
                  <p className="text-[#86868b] text-[10px]">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* iPHONE MODEL PICKER — two-step: Series → Variant */}
      {showModelPicker && (
        <section className="bg-gradient-to-b from-[#0a0a0a] to-[#1d1d1f] text-white min-h-[60vh]">
          <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
            <button onClick={handleBack} className="flex items-center gap-2 text-[#0071e3] text-sm mb-6 cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>

            {!selectedSeries ? (
              <>
                <h2 className="text-2xl font-bold tracking-tight mb-1">Select your iPhone</h2>
                <p className="text-[#86868b] text-sm mb-6">Choose your series, then pick your exact model</p>
                <div className="grid grid-cols-2 gap-3">
                  {IPHONE_SERIES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSeriesSelect(s.id)}
                      className="group relative flex flex-col items-center p-4 pb-5 rounded-2xl bg-[#2a2a2e] border border-white/10 hover:border-[#0071e3]/60 hover:bg-[#0071e3]/10 active:scale-[0.97] transition-all duration-200 cursor-pointer"
                    >
                      {/* iPhone render — model-specific */}
                      <div className="relative w-[52px] h-[100px] mb-3 group-hover:scale-105 transition-transform duration-300">
                        <div className={`absolute inset-0 shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${s.edges === "flat" ? "rounded-[11px]" : "rounded-[13px]"}`} style={{ background: `linear-gradient(145deg, ${s.frame}, ${s.frame}dd)`, border: '1px solid rgba(255,255,255,0.12)' }}>
                          <div className="absolute -left-[2px] top-[20px] w-[2px] h-[9px] rounded-l-sm" style={{ background: s.frame }} />
                          <div className="absolute -left-[2px] top-[33px] w-[2px] h-[14px] rounded-l-sm" style={{ background: s.frame }} />
                          <div className="absolute -right-[2px] top-[30px] w-[2px] h-[16px] rounded-r-sm" style={{ background: s.frame }} />
                          {/* Camera bump — model specific */}
                          <div className="absolute -top-[1px] -left-[1px]">
                            {s.cameras === 3 ? (
                              <div className="w-[18px] h-[18px] rounded-[5px] bg-[#1a1a1a] border border-white/10 flex flex-wrap items-center justify-center gap-[1px] p-[2px]">
                                <div className="w-[5px] h-[5px] rounded-full bg-[#2a2a2e] border border-white/15" />
                                <div className="w-[5px] h-[5px] rounded-full bg-[#2a2a2e] border border-white/15" />
                                <div className="w-[5px] h-[5px] rounded-full bg-[#2a2a2e] border border-white/15" />
                              </div>
                            ) : (
                              <div className="w-[14px] h-[20px] rounded-[4px] bg-[#1a1a1a] border border-white/10 flex flex-col items-center justify-center gap-[2px] p-[2px]">
                                <div className="w-[5px] h-[5px] rounded-full bg-[#2a2a2e] border border-white/15" />
                                <div className="w-[5px] h-[5px] rounded-full bg-[#2a2a2e] border border-white/15" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={`absolute top-[3px] left-[3px] right-[3px] bottom-[3px] overflow-hidden bg-black ${s.edges === "flat" ? "rounded-[8px]" : "rounded-[10px]"}`}>
                          {s.notch === "dynamic" ? (
                            <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[20px] h-[6px] bg-[#1a1a1a] rounded-full z-10 border border-black/50" />
                          ) : (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[22px] h-[7px] bg-black rounded-b-lg z-10 border-x border-b border-white/5" />
                          )}
                          <div className="absolute inset-0 opacity-90" style={{ background: `linear-gradient(160deg, ${s.accent}40, #000 40%, ${s.accent}20, #000)` }}>
                            <p className="text-white/60 text-[7px] font-semibold text-center mt-[10px]">9:41</p>
                            <div className="flex flex-col items-center mt-[4px] gap-[3px]">
                              <div className="w-[20px] h-[20px] rounded-[5px]" style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accent}80)` }} />
                              <div className="w-[28px] h-[1px] bg-white/20 rounded" />
                              <div className="w-[22px] h-[1px] bg-white/10 rounded" />
                            </div>
                          </div>
                          <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[14px] h-[2px] bg-white/30 rounded-full" />
                        </div>
                      </div>
                      <p className="font-semibold text-white text-sm group-hover:text-[#40a9ff] transition">{s.label}</p>
                      <p className="text-[#86868b] text-[11px]">{s.year} · {s.variants.length} models</p>
                      <svg className="w-4 h-4 text-[#86868b] mt-1 group-hover:text-[#0071e3] transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Variant submenu */}
                {(() => { const series = IPHONE_SERIES.find(s => s.id === selectedSeries); if (!series) return null; return (
                  <div className="animate-[fadeIn_0.2s_ease-out]">
                    <h2 className="text-2xl font-bold tracking-tight mb-1">{series.label} Series</h2>
                    <p className="text-[#86868b] text-sm mb-6">Pick your exact model</p>
                    <div className="space-y-2">
                      {series.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => handleVariantSelect(v.id)}
                          className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#2a2a2e] border border-white/10 hover:border-[#0071e3]/60 hover:bg-[#0071e3]/10 active:scale-[0.98] transition-all duration-200 cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-14 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(145deg, ${series.frame}, ${series.frame}dd)`, border: '1px solid rgba(255,255,255,0.1)' }}>
                              <div className="w-6 h-11 rounded-md bg-black overflow-hidden">
                                <div className="w-full h-full opacity-80" style={{ background: `linear-gradient(160deg, ${series.accent}40, #000 50%)` }} />
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-white">{v.label}</p>
                              <p className="text-[#86868b] text-xs">{v.size} display</p>
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                ); })()}
              </>
            )}
            <p className="text-[#86868b] text-[10px] text-center mt-4">All models include same-day service and 90-day warranty</p>
          </div>
        </section>
      )}

      {/* STEP: ISSUE SELECTION */}
      {step === "issue" && (
        <section className="animate-[fadeIn_0.3s_ease-out]">
          <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
            <button onClick={handleBack} className="flex items-center gap-2 text-[#0071e3] text-sm mb-4 cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
            <StepIndicator current={1} total={3} />
            <h2 className="text-2xl font-bold tracking-tight mb-1">What&apos;s the issue?</h2>
            <p className="text-[#86868b] text-sm mb-2">{deviceLabel} · Tap to see pricing</p>
            <p className="text-[#34c759] text-xs font-medium mb-6">Same-day appointments available · Technician comes to you</p>

            <div className="space-y-2">
              {currentRepairs.map((r) => (
                <button
                  key={r.name}
                  onClick={() => handleRepairSelect(r)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-white/10 hover:border-[#0071e3]/40 hover:bg-[#2a2a2e] transition-all duration-200 cursor-pointer text-left"
                >
                  <span className="text-2xl w-10 text-center">{r.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-[#86868b] text-xs">~{r.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#0071e3] font-bold text-lg">{r.price}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Trust mini-bar */}
            <div className="flex items-center justify-center gap-6 mt-8 text-[#86868b] text-xs">
              <span>✓ Free diagnostics</span>
              <span>✓ No fix, no fee</span>
              <span>✓ 90-day warranty</span>
            </div>
          </div>
        </section>
      )}

      {/* STEP: TIME SELECTION */}
      {step === "time" && repair && (
        <section className="animate-[fadeIn_0.3s_ease-out]">
          <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
            <button onClick={handleBack} className="flex items-center gap-2 text-[#0071e3] text-sm mb-4 cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
            <StepIndicator current={2} total={3} />

            {/* Selected repair summary */}
            <div className="bg-[#2a2a2e] border border-white/10 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#86868b]">{deviceLabel}</p>
                <p className="font-semibold">{repair.name}</p>
              </div>
              <div className="text-right">
                <p className="text-[#0071e3] font-bold">{repair.price}</p>
                <p className="text-[#86868b] text-xs">~{repair.time}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight mb-1">When works best?</h2>
            <p className="text-[#86868b] text-sm mb-6">A technician will come to your location</p>

            {/* Technician card — Uber-like */}
            <div className="mb-6">
              <TechCard />
            </div>

            {/* Booking type: ASAP or Schedule */}
            <div className="space-y-3 mb-6">
              {BOOKING_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleTimeSelect(opt.label)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left ${
                    timeChoice === opt.label
                      ? "border-[#0071e3] bg-[#0071e3]/10"
                      : "border-white/15 hover:border-[#0071e3]/40"
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{opt.label}</p>
                    <p className="text-[#86868b] text-xs">{opt.sub}</p>
                  </div>
                  {opt.badge && (
                    <span className="text-[10px] bg-[#34c759] text-white px-2 py-0.5 rounded-full font-medium">{opt.badge}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Schedule: Date picker */}
            {timeChoice === "Schedule" && (
              <div className="animate-[fadeIn_0.2s_ease-out] mb-6">
                <p className="text-xs text-[#86868b] uppercase tracking-wider font-medium mb-3">Pick a date</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {getNext7Days().map((d) => (
                    <button
                      key={d.value}
                      onClick={() => handleDateSelect(d.value)}
                      className={`flex-shrink-0 px-4 py-3 rounded-xl text-center text-sm font-medium transition cursor-pointer border ${
                        selectedDate === d.value
                          ? "border-[#0071e3] bg-[#0071e3] text-white"
                          : "border-white/15 hover:border-[#0071e3]/40"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule: Time slot picker */}
            {timeChoice === "Schedule" && selectedDate && (
              <div className="animate-[fadeIn_0.2s_ease-out]">
                <p className="text-xs text-[#86868b] uppercase tracking-wider font-medium mb-3">Pick a time</p>
                <div className="space-y-2">
                  {SCHEDULE_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSlotSelect(slot)}
                      className={`w-full p-3 rounded-xl text-center text-sm font-medium transition cursor-pointer border ${
                        specificSlot === slot
                          ? "border-[#0071e3] bg-[#0071e3] text-white"
                          : "border-white/15 hover:border-[#0071e3]/40"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* STEP: CONFIRM BOOKING */}
      {step === "confirm" && !submitted && repair && (
        <section className="animate-[fadeIn_0.3s_ease-out]">
          <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
            <button onClick={handleBack} className="flex items-center gap-2 text-[#0071e3] text-sm mb-4 cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
            <StepIndicator current={3} total={3} />

            {/* Order summary — DoorDash checkout style */}
            <div className="bg-[#2a2a2e] border border-white/10 rounded-2xl p-5 mb-6">
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-medium mb-3">Your repair</p>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold">{repair.name}</p>
                  <p className="text-[#86868b] text-xs">{deviceLabel}</p>
                </div>
                <p className="text-[#0071e3] font-bold text-lg">{repair.price}</p>
              </div>
              <div className="border-t border-white/15 pt-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#34c759]">●</span>
                  <span>{timeChoice === "ASAP" ? "ASAP — Next available tech" : `${getNext7Days().find(d => d.value === selectedDate)?.label || selectedDate}, ${specificSlot}`}</span>
                </div>
                <span className="text-[#86868b]">~{repair.time}</span>
              </div>
            </div>

            <h2 className="text-xl font-bold tracking-tight mb-1">Almost done</h2>
            <p className="text-[#86868b] text-sm mb-6">Where should we send the technician?</p>

            <form onSubmit={(e) => { e.preventDefault(); if (!phone && !email) { alert("Please provide a phone number or email so we can reach you."); return; } handleSubmit(e); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1.5 uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  placeholder="Your address in Austin, TX"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 bg-[#2a2a2e] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1.5 uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 bg-[#2a2a2e] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#86868b] mb-1.5 uppercase tracking-wider">Phone <span className="normal-case text-[10px]">(optional)</span></label>
                  <input
                    type="tel"
                    placeholder="(512) 555-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#2a2a2e] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#86868b] mb-1.5 uppercase tracking-wider">Email <span className="normal-case text-[10px]">(optional)</span></label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#2a2a2e] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition"
                  />
                </div>
              </div>
              <p className="text-[10px] text-[#86868b] -mt-2">Provide at least one so we can reach you</p>

              <button
                type="submit"
                className="w-full bg-[#0071e3] text-white py-4 rounded-2xl text-base font-semibold hover:bg-[#0077ed] transition cursor-pointer mt-2"
              >
                Book My Repair Now
              </button>

              <div className="flex items-center justify-center gap-4 text-[#86868b] text-[10px] mt-3">
                <span>✓ Free diagnostics</span>
                <span>✓ No fix, no fee</span>
                <span>✓ Pay after repair</span>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* CONFIRMED — Uber-style tracking feel */}
      {submitted && repair && (
        <section className="animate-[fadeIn_0.4s_ease-out]">
          <div className="max-w-lg mx-auto px-4 pt-10 pb-12 text-center">
            <div className="w-20 h-20 rounded-full bg-[#34c759]/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#34c759]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-[#86868b] text-sm mb-8">
              {timeChoice === "ASAP"
                ? `${name ? `${name}, a` : "A"} technician will contact you within 30 minutes to confirm your repair.`
                : `${name ? `${name}, your` : "Your"} repair is scheduled. You'll receive a confirmation and be contacted before your appointment.`}
            </p>

            {/* Fake tracking card */}
            <div className="bg-[#2a2a2e] border border-white/10 rounded-2xl p-5 mb-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-[#86868b] uppercase tracking-wider font-medium">Estimated arrival</p>
                <p className="text-[#0071e3] font-bold">~20 min</p>
              </div>
              <TechCard />
            </div>

            <div className="bg-[#2a2a2e] border border-white/10 rounded-2xl p-5 mb-8 text-left">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold">{repair.name}</p>
                  <p className="text-[#86868b] text-xs">{deviceLabel}</p>
                </div>
                <p className="text-[#0071e3] font-bold">{repair.price}</p>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="text-[#0071e3] text-sm font-medium cursor-pointer hover:underline"
            >
              Book another repair
            </button>
          </div>
        </section>
      )}

      {/* HOW IT WORKS — 3-step visual (only on home screen) */}
      {step === "select" && !showModelPicker && (
        <>
          <section className="py-16 bg-[#232326]">
            <div className="max-w-lg mx-auto px-4">
              <h2 className="text-2xl font-bold tracking-tight text-center mb-2">How It Works</h2>
              <p className="text-[#86868b] text-sm text-center mb-10">Book a repair in under 60 seconds</p>
              <div className="space-y-6">
                {[
                  { num: "1", title: "Choose your device", desc: "iPhone, MacBook, or Android — pick yours." },
                  { num: "2", title: "Select the issue", desc: "Screen, battery, charging port — tap what needs fixing." },
                  { num: "3", title: "Get instant price", desc: "See your exact cost before you commit. No surprises." },
                  { num: "4", title: "Technician comes to you", desc: "A certified tech arrives at your door, same day." },
                ].map((s) => (
                  <div key={s.num} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#0071e3] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {s.num}
                    </div>
                    <div>
                      <p className="font-semibold mb-0.5">{s.title}</p>
                      <p className="text-[#86868b] text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REVIEW MARQUEE — auto-scrolling, infinite loop */}
          <section className="py-12 overflow-hidden">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-2">What our customers say</h2>
            <p className="text-[#86868b] text-sm text-center mb-8">4.9★ from 2,400+ verified reviews</p>
            <div className="relative">
              <div className="flex animate-[marquee_30s_linear_infinite] gap-4 w-max">
                {[
                  { name: "Sarah K.", text: "He came to my office and fixed my screen in 25 minutes. Incredible service.", stars: 5, repair: "Screen Repair" },
                  { name: "Marcus T.", text: "Fastest repair I've ever experienced. Technician was at my door in 20 min.", stars: 5, repair: "Battery Replace" },
                  { name: "Jessica L.", text: "No store visit, no waiting. They came to my house and it was done before lunch.", stars: 5, repair: "Charging Port" },
                  { name: "David R.", text: "Professional, fast, and the price was exactly what they quoted. Will use again.", stars: 5, repair: "Screen Repair" },
                  { name: "Amanda P.", text: "My MacBook keyboard was fixed same day. The warranty gave me peace of mind.", stars: 5, repair: "Keyboard Repair" },
                  { name: "Chris M.", text: "Showed up on time, fixed my camera in 20 minutes, and cleaned my phone too.", stars: 5, repair: "Camera Repair" },
                  { name: "Emily W.", text: "I was skeptical about mobile repair but this was better than any Apple Store trip.", stars: 5, repair: "Back Glass" },
                  { name: "James H.", text: "Battery was dying by noon every day. Fixed in 15 minutes at my coffee shop.", stars: 5, repair: "Battery Replace" },
                  { name: "Sarah K.", text: "He came to my office and fixed my screen in 25 minutes. Incredible service.", stars: 5, repair: "Screen Repair" },
                  { name: "Marcus T.", text: "Fastest repair I've ever experienced. Technician was at my door in 20 min.", stars: 5, repair: "Battery Replace" },
                  { name: "Jessica L.", text: "No store visit, no waiting. They came to my house and it was done before lunch.", stars: 5, repair: "Charging Port" },
                  { name: "David R.", text: "Professional, fast, and the price was exactly what they quoted. Will use again.", stars: 5, repair: "Screen Repair" },
                  { name: "Amanda P.", text: "My MacBook keyboard was fixed same day. The warranty gave me peace of mind.", stars: 5, repair: "Keyboard Repair" },
                  { name: "Chris M.", text: "Showed up on time, fixed my camera in 20 minutes, and cleaned my phone too.", stars: 5, repair: "Camera Repair" },
                  { name: "Emily W.", text: "I was skeptical about mobile repair but this was better than any Apple Store trip.", stars: 5, repair: "Back Glass" },
                  { name: "James H.", text: "Battery was dying by noon every day. Fixed in 15 minutes at my coffee shop.", stars: 5, repair: "Battery Replace" },
                ].map((r, i) => (
                  <div key={i} className="flex-shrink-0 w-[280px] bg-[#2a2a2e] rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#fbbf24] text-xs">{"★".repeat(r.stars)}</span>
                      <span className="text-[10px] text-[#86868b] bg-white/10 rounded-full px-2 py-0.5">{r.repair}</span>
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
                    <p className="text-xs font-semibold text-[#86868b]">{r.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DIFFERENTIATION STRIP — Why Us */}
          <section className="py-10 bg-[#0071e3] text-white">
            <div className="max-w-lg mx-auto px-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { bold: "We come to you", sub: "Home, work, anywhere" },
                  { bold: "No store visits", sub: "Skip the wait entirely" },
                  { bold: "On-demand repair", sub: "Fast, same-day service" },
                ].map((d) => (
                  <div key={d.bold}>
                    <p className="font-bold text-sm mb-1">{d.bold}</p>
                    <p className="text-white/70 text-[10px]">{d.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TRUST SECTION */}
          <section className="py-16">
            <div className="max-w-lg mx-auto px-4">
              <h2 className="text-2xl font-bold tracking-tight text-center mb-10">Why 5,000+ Austinites choose us</h2>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { stat: "5,000+", label: "Devices Fixed" },
                  { stat: "4.9★", label: "Avg Rating" },
                  { stat: "< 30 min", label: "Most Repairs" },
                  { stat: "90 Days", label: "Warranty" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#2a2a2e] border border-white/10 rounded-2xl p-5 text-center">
                    <p className="text-2xl font-bold tracking-tight mb-1">{s.stat}</p>
                    <p className="text-[#86868b] text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  { title: "Free Diagnostics", desc: "Know the problem and price before you commit." },
                  { title: "No Fix, No Fee", desc: "Can't fix it? You pay nothing. Zero risk." },
                  { title: "We Come to You", desc: "Home, office, cafe — wherever you are in Austin." },
                  { title: "Genuine Parts", desc: "OEM-grade components backed by our warranty." },
                  { title: "Certified Technicians", desc: "Background-checked, 1,000+ repairs each." },
                  { title: "Same-Day Service", desc: "Book now, get it fixed today." },
                ].map((s) => (
                  <div key={s.title} className="flex items-start gap-3">
                    <span className="text-[#0071e3] font-bold mt-0.5">✓</span>
                    <div>
                      <p className="font-semibold text-sm">{s.title}</p>
                      <p className="text-[#86868b] text-xs">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BOTTOM CTA — sticky on mobile */}
          <div className="sticky bottom-0 bg-[#1d1d1f]/90 backdrop-blur-xl border-t border-white/10 p-4 md:hidden">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full bg-[#0071e3] text-white py-3.5 rounded-2xl text-base font-semibold cursor-pointer"
            >
              Book Repair Now
            </button>
            <p className="text-center text-[10px] text-[#86868b] mt-1.5">Takes less than 10 seconds &middot; Technician arrives today</p>
          </div>

          {/* FOOTER */}
          <footer className="bg-[#1d1d1f] text-[#86868b] py-10">
            <div className="max-w-lg mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <Logo size="sm" />
                <a href={`tel:${PHONE}`} className="text-sm hover:text-white transition">{PHONE}</a>
              </div>
              <p className="text-xs leading-relaxed mb-6">
                Fast, same-day iPhone &amp; MacBook repair at your location. Certified technicians, genuine parts, 90-day warranty. Serving all of Austin, TX.
              </p>
              <div className="flex gap-6 text-xs mb-6">
                <span>Mon-Sat: 8AM-8PM</span>
                <span>Sun: 10AM-6PM</span>
              </div>
              <div className="border-t border-white/10 pt-6 text-center text-[10px]">
                © 2026 {BRAND}. All rights reserved.
              </div>
            </div>
          </footer>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </main>
  );
}
