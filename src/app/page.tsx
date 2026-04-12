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

const IPHONE_MODELS = [
  { id: "iphone16", label: "iPhone 16 / 16 Pro", year: "2024", img: "16" },
  { id: "iphone15", label: "iPhone 15 / 15 Pro", year: "2023", img: "15" },
  { id: "iphone14", label: "iPhone 14 / 14 Pro", year: "2022", img: "14" },
  { id: "iphone13", label: "iPhone 13 / 13 Pro", year: "2021", img: "13" },
  { id: "iphone12", label: "iPhone 12 / 12 Pro", year: "2020", img: "12" },
  { id: "iphone11", label: "iPhone 11 / 11 Pro", year: "2019", img: "11" },
];

const IPHONE_REPAIRS: Record<string, { name: string; price: string; time: string; icon: string }[]> = {
  iphone16: [
    { name: "Screen Repair", price: "$129", time: "30-45 min", icon: "📱" },
    { name: "Battery Replacement", price: "$79", time: "20 min", icon: "🔋" },
    { name: "Charging Port", price: "$89", time: "25 min", icon: "⚡" },
    { name: "Camera Repair", price: "$99", time: "30 min", icon: "📷" },
    { name: "Back Glass", price: "$109", time: "45 min", icon: "🔲" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ],
  iphone15: [
    { name: "Screen Repair", price: "$109", time: "30 min", icon: "📱" },
    { name: "Battery Replacement", price: "$69", time: "20 min", icon: "🔋" },
    { name: "Charging Port", price: "$79", time: "25 min", icon: "⚡" },
    { name: "Camera Repair", price: "$89", time: "30 min", icon: "📷" },
    { name: "Back Glass", price: "$99", time: "40 min", icon: "🔲" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ],
  iphone14: [
    { name: "Screen Repair", price: "$89", time: "30 min", icon: "📱" },
    { name: "Battery Replacement", price: "$59", time: "20 min", icon: "🔋" },
    { name: "Charging Port", price: "$69", time: "25 min", icon: "⚡" },
    { name: "Camera Repair", price: "$79", time: "30 min", icon: "📷" },
    { name: "Back Glass", price: "$89", time: "40 min", icon: "🔲" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ],
  iphone13: [
    { name: "Screen Repair", price: "$79", time: "25 min", icon: "📱" },
    { name: "Battery Replacement", price: "$49", time: "20 min", icon: "🔋" },
    { name: "Charging Port", price: "$59", time: "25 min", icon: "⚡" },
    { name: "Camera Repair", price: "$69", time: "25 min", icon: "📷" },
    { name: "Back Glass", price: "$79", time: "35 min", icon: "🔲" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ],
  iphone12: [
    { name: "Screen Repair", price: "$69", time: "25 min", icon: "📱" },
    { name: "Battery Replacement", price: "$45", time: "15 min", icon: "🔋" },
    { name: "Charging Port", price: "$55", time: "20 min", icon: "⚡" },
    { name: "Camera Repair", price: "$65", time: "25 min", icon: "📷" },
    { name: "Back Glass", price: "$69", time: "35 min", icon: "🔲" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ],
  iphone11: [
    { name: "Screen Repair", price: "$59", time: "25 min", icon: "📱" },
    { name: "Battery Replacement", price: "$39", time: "15 min", icon: "🔋" },
    { name: "Charging Port", price: "$49", time: "20 min", icon: "⚡" },
    { name: "Camera Repair", price: "$55", time: "25 min", icon: "📷" },
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

const TIME_SLOTS = [
  { label: "ASAP", sub: "Next available", badge: "Fastest" },
  { label: "Today", sub: "Pick a time slot", badge: null },
  { label: "Tomorrow", sub: "Schedule ahead", badge: null },
];

const TODAY_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
];

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
    <div className="flex items-center gap-4 bg-gradient-to-r from-[#f5f5f7] to-white rounded-2xl p-4 border border-[#e8e8ed]">
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
  const [specificSlot, setSpecificSlot] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);

  const currentRepairs = deviceType === "iphone" && iphoneModel
    ? IPHONE_REPAIRS[iphoneModel] || []
    : deviceType === "macbook" ? MACBOOK_REPAIRS : [];

  const deviceLabel = deviceType === "iphone" && iphoneModel
    ? IPHONE_MODELS.find(m => m.id === iphoneModel)?.label || "iPhone"
    : deviceType === "macbook" ? "MacBook" : "Android";

  const handleDeviceSelect = (d: "iphone" | "macbook" | "android") => {
    setDeviceType(d);
    setIphoneModel(null);
    setRepair(null);
    setTimeChoice(null);
    setSpecificSlot(null);
    if (d === "iphone") {
      setShowModelPicker(true);
    } else if (d === "macbook") {
      setStep("issue");
    }
  };

  const handleModelSelect = (id: string) => {
    setIphoneModel(id);
    setShowModelPicker(false);
    setStep("issue");
  };

  const handleRepairSelect = (r: { name: string; price: string; time: string; icon: string }) => {
    setRepair(r);
    setStep("time");
  };

  const handleTimeSelect = (choice: string) => {
    setTimeChoice(choice);
    if (choice === "ASAP") {
      setStep("confirm");
    }
  };

  const handleSlotSelect = (slot: string) => {
    setSpecificSlot(slot);
    setStep("confirm");
  };

  const handleBack = () => {
    if (step === "confirm") setStep("time");
    else if (step === "time") setStep("issue");
    else if (step === "issue") {
      setStep("select");
      setDeviceType(null);
      setIphoneModel(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAll = () => {
    setStep("select");
    setDeviceType(null);
    setIphoneModel(null);
    setRepair(null);
    setTimeChoice(null);
    setSpecificSlot(null);
    setAddress("");
    setName("");
    setPhone("");
    setSubmitted(false);
    setShowModelPicker(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f]">
      {/* STICKY NAV — compact, app-like */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#e8e8ed]/60">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={resetAll} className="cursor-pointer"><Logo size="sm" /></button>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-xs text-[#34c759] font-medium">
              <LivePulse />
              <span className="hidden sm:inline">Techs Available</span>
            </div>
            <a href={`tel:${PHONE}`} className="bg-[#1d1d1f] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-black transition">
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
              Get your phone fixed<br />in 30 minutes
            </h1>
            <p className="text-[#86868b] text-sm mb-8 leading-relaxed max-w-sm">
              A certified technician comes to you — home, office, anywhere. Same-day repairs with a 90-day warranty.
            </p>

            {/* Quick action: What needs fixing? */}
            <div className="space-y-3 mb-8">
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-medium">What needs fixing?</p>
              {[
                { id: "iphone" as const, label: "iPhone", sub: "11 and newer · From $39", icon: "📱", hot: true },
                { id: "macbook" as const, label: "MacBook", sub: "All models · From $99", icon: "💻", hot: false },
                { id: "android" as const, label: "Android", sub: "Custom quote · Call us", icon: "📲", hot: false },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => d.id === "android" ? window.location.href = `tel:${PHONE}` : handleDeviceSelect(d.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 cursor-pointer text-left ${
                    d.hot
                      ? "bg-white/10 border border-white/20 hover:bg-white/15"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span className="text-2xl">{d.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{d.label}</p>
                    <p className="text-[#86868b] text-xs">{d.sub}</p>
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
            <div className="flex items-center justify-between bg-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["JM", "SK", "AL"].map((init, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#0071e3] flex items-center justify-center text-white text-[10px] font-bold border-2 border-[#1d1d1f]">
                      {init}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white text-xs font-medium">5,000+ repairs done</p>
                  <p className="text-[#86868b] text-[10px]">4.9★ average rating</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-xs font-bold">90-day</p>
                <p className="text-[#86868b] text-[10px]">warranty</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* iPHONE MODEL PICKER — bottom sheet style */}
      {showModelPicker && (
        <section className="bg-gradient-to-b from-[#0a0a0a] to-[#1d1d1f] text-white min-h-[60vh]">
          <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
            <button onClick={() => { setShowModelPicker(false); setDeviceType(null); }} className="flex items-center gap-2 text-[#0071e3] text-sm mb-6 cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
            <h2 className="text-2xl font-bold tracking-tight mb-1">Which iPhone?</h2>
            <p className="text-[#86868b] text-sm mb-6">Select your model for instant pricing</p>
            <div className="space-y-2">
              {IPHONE_MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleModelSelect(m.id)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer text-left"
                >
                  <div>
                    <p className="font-semibold text-white">{m.label}</p>
                    <p className="text-[#86868b] text-xs">{m.year}</p>
                  </div>
                  <svg className="w-5 h-5 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
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
            <p className="text-[#86868b] text-sm mb-6">{deviceLabel} · Tap to see pricing</p>

            <div className="space-y-2">
              {currentRepairs.map((r) => (
                <button
                  key={r.name}
                  onClick={() => handleRepairSelect(r)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-[#e8e8ed] hover:border-[#0071e3]/40 hover:bg-[#f5f5f7] transition-all duration-200 cursor-pointer text-left"
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
            <div className="bg-[#f5f5f7] rounded-2xl p-4 mb-6 flex items-center justify-between">
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

            {/* Time options */}
            <div className="space-y-2 mb-6">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.label}
                  onClick={() => handleTimeSelect(slot.label)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                    timeChoice === slot.label
                      ? "border-[#0071e3] bg-[#0071e3]/5"
                      : "border-[#e8e8ed] hover:border-[#0071e3]/40"
                  }`}
                >
                  <div>
                    <p className="font-semibold">{slot.label}</p>
                    <p className="text-[#86868b] text-xs">{slot.sub}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {slot.badge && (
                      <span className="text-[10px] bg-[#34c759] text-white px-2 py-0.5 rounded-full font-medium">{slot.badge}</span>
                    )}
                    <svg className="w-5 h-5 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            {/* Specific time slots for Today/Tomorrow */}
            {timeChoice && timeChoice !== "ASAP" && (
              <div className="animate-[fadeIn_0.2s_ease-out]">
                <p className="text-xs text-[#86868b] uppercase tracking-wider font-medium mb-3">Available {timeChoice.toLowerCase()}</p>
                <div className="grid grid-cols-3 gap-2">
                  {TODAY_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSlotSelect(slot)}
                      className={`p-3 rounded-xl text-center text-sm font-medium transition cursor-pointer border ${
                        specificSlot === slot
                          ? "border-[#0071e3] bg-[#0071e3] text-white"
                          : "border-[#e8e8ed] hover:border-[#0071e3]/40"
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
            <div className="bg-[#f5f5f7] rounded-2xl p-5 mb-6">
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-medium mb-3">Your repair</p>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold">{repair.name}</p>
                  <p className="text-[#86868b] text-xs">{deviceLabel}</p>
                </div>
                <p className="text-[#0071e3] font-bold text-lg">{repair.price}</p>
              </div>
              <div className="border-t border-[#e8e8ed] pt-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#34c759]">●</span>
                  <span>{timeChoice === "ASAP" ? "ASAP — Next available" : `${timeChoice} at ${specificSlot}`}</span>
                </div>
                <span className="text-[#86868b]">~{repair.time}</span>
              </div>
            </div>

            <h2 className="text-xl font-bold tracking-tight mb-1">Almost done</h2>
            <p className="text-[#86868b] text-sm mb-6">Where should we send the technician?</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1.5 uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  placeholder="Your address in Austin, TX"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl text-sm focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#86868b] mb-1.5 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl text-sm focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#86868b] mb-1.5 uppercase tracking-wider">Phone</label>
                  <input
                    type="tel"
                    placeholder="(512) 555-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl text-sm focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0071e3] text-white py-4 rounded-2xl text-base font-semibold hover:bg-[#0077ed] transition cursor-pointer mt-2"
              >
                Send Technician →
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
            <h2 className="text-2xl font-bold mb-2">Technician is on the way!</h2>
            <p className="text-[#86868b] text-sm mb-8">
              {name ? `${name}, we'll` : "We'll"} text you at {phone || "your number"} with live updates.
            </p>

            {/* Fake tracking card */}
            <div className="bg-[#f5f5f7] rounded-2xl p-5 mb-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-[#86868b] uppercase tracking-wider font-medium">Estimated arrival</p>
                <p className="text-[#0071e3] font-bold">~20 min</p>
              </div>
              <TechCard />
            </div>

            <div className="bg-[#f5f5f7] rounded-2xl p-5 mb-8 text-left">
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
          <section className="py-16 bg-[#f5f5f7]">
            <div className="max-w-lg mx-auto px-4">
              <h2 className="text-2xl font-bold tracking-tight text-center mb-2">How it works</h2>
              <p className="text-[#86868b] text-sm text-center mb-10">As easy as ordering a ride</p>
              <div className="space-y-6">
                {[
                  { num: "1", title: "Pick your repair", desc: "Select your device and issue. See the price instantly." },
                  { num: "2", title: "Choose a time", desc: "ASAP or schedule ahead. A certified tech is dispatched." },
                  { num: "3", title: "Get it fixed on the spot", desc: "Technician arrives at your location. Most repairs done in 30 min." },
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

          {/* TRUST SECTION */}
          <section className="py-16">
            <div className="max-w-lg mx-auto px-4">
              <h2 className="text-2xl font-bold tracking-tight text-center mb-10">Why Austin trusts us</h2>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { stat: "5,000+", label: "Devices Fixed" },
                  { stat: "4.9★", label: "Avg Rating" },
                  { stat: "< 30 min", label: "Most Repairs" },
                  { stat: "90 Days", label: "Warranty" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#f5f5f7] rounded-2xl p-5 text-center">
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
          <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-[#e8e8ed]/60 p-4 md:hidden">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full bg-[#0071e3] text-white py-3.5 rounded-2xl text-base font-semibold cursor-pointer"
            >
              Get Started — Check Pricing
            </button>
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
      `}</style>
    </main>
  );
}
