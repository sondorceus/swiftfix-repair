"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Script from "next/script";

const BRAND = "Austin Mobile Repair";
const PHONE = "(877) 549-2056";
const PHONE_TEL = "+18775492056";

function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const textSize = size === "sm" ? "16px" : size === "lg" ? "28px" : "20px";
  const subSize = size === "sm" ? "9px" : size === "lg" ? "14px" : "11px";
  return (
    <div className="flex flex-col leading-none">
      <span style={{ fontSize: textSize, fontWeight: 700, letterSpacing: "-0.02em", background: "linear-gradient(90deg, #00c853, #00e676)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Austin Mobile
      </span>
      <span style={{ fontSize: subSize, fontWeight: 500, letterSpacing: "0.08em", color: "#c7c7cc", textTransform: "uppercase" as const, marginTop: "2px" }}>
        Repair
      </span>
    </div>
  );
}

type Step = "select" | "issue" | "time" | "confirm";

const IPHONE_SERIES = [
  { id: "17", label: "iPhone 17", year: "2025", frame: "#1C1C1E", accent: "#00c853", notch: "dynamic", cameras: 3, edges: "round", image: "/iphone17.png?v=3",
    variants: [
      { id: "iphone17", label: "iPhone 17", size: '6.1"' },
      { id: "iphone17plus", label: "iPhone 17 Plus", size: '6.7"' },
      { id: "iphone17pro", label: "iPhone 17 Pro", size: '6.3"' },
      { id: "iphone17promax", label: "iPhone 17 Pro Max", size: '6.9"' },
      { id: "iphone17air", label: "iPhone 17 Air", size: '6.6"' },
    ]},
  { id: "16", label: "iPhone 16", image: "/iphone16.png?v=4", year: "2024", frame: "#3C3C3C", accent: "#7856FF", notch: "dynamic", cameras: 3, edges: "round",
    variants: [
      { id: "iphone16", label: "iPhone 16", size: '6.1"' },
      { id: "iphone16plus", label: "iPhone 16 Plus", size: '6.7"' },
      { id: "iphone16pro", label: "iPhone 16 Pro", size: '6.3"' },
      { id: "iphone16promax", label: "iPhone 16 Pro Max", size: '6.9"' },
    ]},
  { id: "15", label: "iPhone 15", year: "2023", frame: "#2C2C2E", accent: "#00c853", notch: "dynamic", cameras: 3, edges: "round", image: "/iphone15.png?v=3",
    variants: [
      { id: "iphone15", label: "iPhone 15", size: '6.1"' },
      { id: "iphone15plus", label: "iPhone 15 Plus", size: '6.7"' },
      { id: "iphone15pro", label: "iPhone 15 Pro", size: '6.1"' },
      { id: "iphone15promax", label: "iPhone 15 Pro Max", size: '6.7"' },
    ]},
  { id: "14", label: "iPhone 14", image: "/iphone14.png?v=2", year: "2022", frame: "#1C1C1E", accent: "#5E5CE6", notch: "dynamic", cameras: 2, edges: "flat",
    variants: [
      { id: "iphone14", label: "iPhone 14", size: '6.1"' },
      { id: "iphone14plus", label: "iPhone 14 Plus", size: '6.7"' },
      { id: "iphone14pro", label: "iPhone 14 Pro", size: '6.1"' },
      { id: "iphone14promax", label: "iPhone 14 Pro Max", size: '6.7"' },
    ]},
  { id: "13", label: "iPhone 13", image: "/iphone13.png?v=1", year: "2021", frame: "#48484A", accent: "#FF375F", notch: "classic", cameras: 2, edges: "flat",
    variants: [
      { id: "iphone13mini", label: "iPhone 13 Mini", size: '5.4"' },
      { id: "iphone13", label: "iPhone 13", size: '6.1"' },
      { id: "iphone13pro", label: "iPhone 13 Pro", size: '6.1"' },
      { id: "iphone13promax", label: "iPhone 13 Pro Max", size: '6.7"' },
    ]},
  { id: "12", label: "iPhone 12", image: "/iphone12.png?v=1", year: "2020", frame: "#636366", accent: "#30D158", notch: "classic", cameras: 2, edges: "flat",
    variants: [
      { id: "iphone12mini", label: "iPhone 12 Mini", size: '5.4"' },
      { id: "iphone12", label: "iPhone 12", size: '6.1"' },
      { id: "iphone12pro", label: "iPhone 12 Pro", size: '6.1"' },
      { id: "iphone12promax", label: "iPhone 12 Pro Max", size: '6.7"' },
    ]},
  { id: "11", label: "iPhone 11", image: "/iphone11.png?v=1", year: "2019", frame: "#8E8E93", accent: "#FF9F0A", notch: "classic", cameras: 2, edges: "round",
    variants: [
      { id: "iphone11", label: "iPhone 11", size: '6.1"' },
      { id: "iphone11pro", label: "iPhone 11 Pro", size: '5.8"' },
      { id: "iphone11promax", label: "iPhone 11 Pro Max", size: '6.5"' },
    ]},
];

function makeRepairs(p: { screen: number; battery: number; speaker: number; frontCam: number; rearCam: number; backGlass: number }) {
  const port = Math.round(p.screen * 0.35 / 5) * 5;
  const water = Math.round(p.screen * 0.55 / 5) * 5;
  return [
    { name: "Screen Repair", price: `$${p.screen}`, time: "30-45 min", icon: "📱" },
    { name: "Battery Replacement", price: `$${p.battery}`, time: "20 min", icon: "🔋" },
    { name: "Camera Lens", price: `from $${p.frontCam}`, time: "25-30 min", icon: "📷", _sub: [
      { name: "Front Camera", price: `$${p.frontCam}`, icon: "🤳" },
      { name: "Rear Camera (Full Module)", price: `$${p.rearCam}`, icon: "📷" },
    ]},
    { name: "Back Glass", price: `$${p.backGlass}`, time: "40 min", icon: "🔲" },
    { name: "Charging Port", price: `$${port}`, time: "25 min", icon: "⚡" },
    { name: "Speaker", price: `from $${p.speaker}`, time: "25 min", icon: "🔊", _sub: [
      { name: "Earpiece Speaker", price: `$${p.speaker}`, icon: "🔈" },
      { name: "Bottom Speaker", price: `$${p.speaker}`, icon: "🔊" },
    ]},
    { name: "Water Damage", price: `$${water}+`, time: "1-2 hrs", icon: "💧" },
    { name: "Other Issue", price: "Free Quote", time: "Varies", icon: "🔧" },
  ];
}

const R = (screen: number, battery: number, speaker: number, frontCam: number, rearCam: number, backGlass: number) =>
  makeRepairs({ screen, battery, speaker, frontCam, rearCam, backGlass });

const IPHONE_REPAIRS: Record<string, ReturnType<typeof makeRepairs>> = {
  //            screen bat  spk  fCam rCam back
  iphone17: R(279, 139, 119, 159, 209, 219), iphone17plus: R(289, 139, 119, 159, 209, 229), iphone17pro: R(309, 149, 129, 169, 229, 239), iphone17promax: R(329, 149, 129, 169, 229, 249), iphone17air: R(299, 139, 119, 159, 219, 229),
  iphone16: R(249, 119, 99, 139, 179, 189), iphone16plus: R(259, 119, 99, 139, 179, 199), iphone16pro: R(279, 129, 109, 149, 199, 209), iphone16promax: R(299, 129, 109, 149, 199, 219),
  iphone15: R(219, 109, 89, 129, 159, 169), iphone15plus: R(229, 109, 89, 129, 159, 179), iphone15pro: R(249, 119, 99, 139, 179, 189), iphone15promax: R(269, 119, 99, 139, 179, 199),
  iphone14: R(189, 99, 79, 119, 139, 149), iphone14plus: R(199, 99, 79, 119, 139, 159), iphone14pro: R(219, 109, 89, 129, 159, 169), iphone14promax: R(229, 109, 89, 129, 159, 179),
  iphone13: R(179, 89, 69, 109, 129, 139), iphone13mini: R(169, 89, 69, 99, 119, 129), iphone13pro: R(189, 89, 79, 119, 139, 149), iphone13promax: R(199, 99, 79, 119, 139, 159),
  iphone12: R(169, 79, 69, 99, 109, 129), iphone12mini: R(159, 79, 59, 89, 99, 119), iphone12pro: R(179, 79, 69, 109, 119, 139), iphone12promax: R(189, 89, 79, 109, 129, 149),
  iphone11: R(149, 69, 59, 89, 99, 109), iphone11pro: R(159, 69, 59, 99, 109, 119), iphone11promax: R(169, 79, 69, 99, 109, 129),
  iphonese3: R(129, 59, 49, 69, 79, 89), iphonese2: R(119, 49, 39, 59, 69, 79),
};

const MACBOOK_SERIES = [
  { id: "mbair", label: "MacBook Air", year: "M1–M4", variants: [
    { id: "mbair-m4", label: "MacBook Air M4", size: '13"/15"' },
    { id: "mbair-m3", label: "MacBook Air M3", size: '13"/15"' },
    { id: "mbair-m2", label: "MacBook Air M2", size: '13"/15"' },
    { id: "mbair-m1", label: "MacBook Air M1", size: '13"' },
  ]},
  { id: "mbpro14", label: "MacBook Pro 14\"", year: "M1–M4", variants: [
    { id: "mbpro14-m4", label: "MacBook Pro 14\" M4", size: '14"' },
    { id: "mbpro14-m3", label: "MacBook Pro 14\" M3", size: '14"' },
    { id: "mbpro14-m2", label: "MacBook Pro 14\" M2", size: '14"' },
    { id: "mbpro14-m1", label: "MacBook Pro 14\" M1", size: '14"' },
  ]},
  { id: "mbpro16", label: "MacBook Pro 16\"", year: "M1–M4", variants: [
    { id: "mbpro16-m4", label: "MacBook Pro 16\" M4", size: '16"' },
    { id: "mbpro16-m3", label: "MacBook Pro 16\" M3", size: '16"' },
    { id: "mbpro16-m2", label: "MacBook Pro 16\" M2", size: '16"' },
    { id: "mbpro16-m1", label: "MacBook Pro 16\" M1", size: '16"' },
  ]},
  { id: "mbpro13", label: "MacBook Pro 13\"", year: "M1–M2/Intel", variants: [
    { id: "mbpro13-m2", label: "MacBook Pro 13\" M2", size: '13"' },
    { id: "mbpro13-m1", label: "MacBook Pro 13\" M1", size: '13"' },
    { id: "mbpro13-intel", label: "MacBook Pro 13\" Intel", size: '13"' },
  ]},
  { id: "mbolder", label: "Older MacBook", year: "2015–2019", variants: [
    { id: "mbolder-pro15", label: "MacBook Pro 15\" (2015-2019)", size: '15"' },
    { id: "mbolder-air13", label: "MacBook Air (2017-2020)", size: '13"' },
    { id: "mbolder-12", label: "MacBook 12\" Retina", size: '12"' },
  ]},
];

const MACBOOK_REPAIRS = [
  { name: "Screen Repair", price: "Custom Quote", time: "1-2 hrs", icon: "🖥" },
  { name: "Battery Service", price: "Custom Quote", time: "1-2 hrs", icon: "🔋" },
  { name: "Keyboard Repair", price: "Custom Quote", time: "1-2 hrs", icon: "⌨️" },
  { name: "Trackpad Repair", price: "Custom Quote", time: "1 hr", icon: "🖱" },
  { name: "Logic Board", price: "Custom Quote", time: "2-3 hrs", icon: "🔧" },
  { name: "SSD/Storage", price: "Custom Quote", time: "1 hr", icon: "💾" },
  { name: "Charging Port", price: "Custom Quote", time: "1 hr", icon: "⚡" },
  { name: "Other Issue", price: "Custom Quote", time: "Varies", icon: "🔧" },
];

const SAMSUNG_SERIES = [
  { id: "galaxys", label: "Galaxy S Series", year: "S21–S24", variants: [
    { id: "gs24ultra", label: "Galaxy S24 Ultra", size: '6.8"' },
    { id: "gs24plus", label: "Galaxy S24+", size: '6.7"' },
    { id: "gs24", label: "Galaxy S24", size: '6.2"' },
    { id: "gs24fe", label: "Galaxy S24 FE", size: '6.7"' },
    { id: "gs23ultra", label: "Galaxy S23 Ultra", size: '6.8"' },
    { id: "gs23", label: "Galaxy S23/S23+", size: '6.1"/6.6"' },
    { id: "gs22", label: "Galaxy S22 Series", size: '6.1"-6.8"' },
    { id: "gs21", label: "Galaxy S21 Series", size: '6.2"-6.8"' },
  ]},
  { id: "galaxyz", label: "Galaxy Z Fold/Flip", year: "Foldables", variants: [
    { id: "gzfold5", label: "Galaxy Z Fold 5", size: '7.6"' },
    { id: "gzfold4", label: "Galaxy Z Fold 4", size: '7.6"' },
    { id: "gzflip5", label: "Galaxy Z Flip 5", size: '6.7"' },
    { id: "gzflip4", label: "Galaxy Z Flip 4", size: '6.7"' },
  ]},
  { id: "galaxya", label: "Galaxy A Series", year: "Budget", variants: [
    { id: "ga54", label: "Galaxy A54", size: '6.4"' },
    { id: "ga34", label: "Galaxy A34", size: '6.6"' },
    { id: "ga15", label: "Galaxy A15", size: '6.5"' },
    { id: "ga14", label: "Galaxy A14", size: '6.6"' },
  ]},
  { id: "galaxynote", label: "Galaxy Note", year: "Note Series", variants: [
    { id: "gnote20", label: "Galaxy Note 20 / Ultra", size: '6.7"/6.9"' },
    { id: "gnote10", label: "Galaxy Note 10 / 10+", size: '6.3"/6.8"' },
  ]},
];

const SAMSUNG_REPAIRS = [
  { name: "Screen Repair", price: "Contact for Price", time: "1-2 hrs", icon: "📱" },
  { name: "Battery Replacement", price: "Contact for Price", time: "1 hr", icon: "🔋" },
  { name: "Charging Port", price: "Contact for Price", time: "45 min", icon: "⚡" },
  { name: "Camera Repair", price: "Contact for Price", time: "1 hr", icon: "📷" },
  { name: "Back Glass", price: "Contact for Price", time: "1 hr", icon: "🔲" },
  { name: "Water Damage", price: "Contact for Price", time: "1-2 hrs", icon: "💧" },
  { name: "Other Issue", price: "Contact for Price", time: "Varies", icon: "🔧" },
];

const BOOKING_OPTIONS = [
  { label: "ASAP", sub: "A technician will contact you within 30 minutes", badge: "Fastest", icon: "⚡" },
  { label: "Schedule", sub: "Today, tomorrow, or later this week", badge: null, icon: "📅" },
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
            i < current ? "bg-[#00c853] w-8" : i === current ? "bg-[#00c853] w-12" : "bg-white/5 w-8"
          }`}
        />
      ))}
    </div>
  );
}

function BeforeAfterSlider({ label, before, after, beforeColor, afterColor, icon }: { label: string; before: string; after: string; beforeColor: string; afterColor: string; icon: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  };

  return (
    <div className="bg-[#1a1a2e] rounded-2xl overflow-hidden border border-white/10">
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <p className="font-semibold text-sm">{label}</p>
      </div>
      <div
        ref={containerRef}
        className="relative h-48 mx-4 mb-4 rounded-xl overflow-hidden cursor-col-resize select-none"
        onMouseDown={() => { dragging.current = true; }}
        onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchStart={() => { dragging.current = true; }}
        onTouchMove={(e) => { updatePos(e.touches[0].clientX); }}
        onTouchEnd={() => { dragging.current = false; }}
        onClick={(e) => updatePos(e.clientX)}
      >
        {/* Before (full) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center" style={{ background: `linear-gradient(135deg, ${beforeColor}, #242424)` }}>
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-red-300 text-xs font-bold uppercase tracking-wider mb-1">Before</p>
          <p className="text-[#c7c7cc] text-xs leading-relaxed max-w-[200px]">{before}</p>
        </div>
        {/* After (clipped by slider position) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center" style={{ background: `linear-gradient(135deg, ${afterColor}, #242424)`, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">After</p>
          <p className="text-[#c7c7cc] text-xs leading-relaxed max-w-[200px]">{after}</p>
        </div>
        {/* Slider handle */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-[#0a0a0a]/80 z-10" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0a0a0a] shadow-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4M8 15l4 4 4-4" /></svg>
          </div>
        </div>
      </div>
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
    <div className="flex items-center gap-4 bg-[#1a1a2e] rounded-2xl p-4 border border-white/15">
      <div className="w-12 h-12 rounded-full bg-[#00c853] flex items-center justify-center text-white font-bold text-lg shrink-0">
        JM
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm leading-relaxed">James M.</p>
        <p className="text-[#c7c7cc] text-xs font-medium">Certified Tech · 4.9★ · 1,200+ repairs</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[#00c853] font-bold text-sm leading-relaxed">{eta} min</p>
        <p className="text-[#c7c7cc] text-[12px] font-medium leading-relaxed">ETA away</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>("select");
  const [footerPage, setFooterPage] = useState<"about" | "faq" | "contact" | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    setCookieConsent(saved);
  }, []);
  const [chatMode, setChatMode] = useState<"choose" | "chat" | "call">("choose");
  const [chatMessages, setChatMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "Hey! Need a repair? I can help with pricing, timing, or any questions about our service!" }
  ]);
  const [chatMsg, setChatMsg] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const sendChat = async () => {
    if (!chatMsg.trim()) return;
    const msg = chatMsg;
    setChatMsg("");
    setChatMessages(prev => [...prev, { from: "user", text: msg }]);
    setChatLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: msg }) });
      const data = await res.json();
      setChatMessages(prev => [...prev, { from: "bot", text: data.reply }]);
    } catch {
      setChatMessages(prev => [...prev, { from: "bot", text: "Sorry, something went wrong. Call us!" }]);
    }
    setChatLoading(false);
  };

  const [deviceType, setDeviceType] = useState<"iphone" | "macbook" | "android" | "other" | null>(null);
  const [otherDeviceText, setOtherDeviceText] = useState("");
  const [otherIssueText, setOtherIssueText] = useState("");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedModelSeries, setSelectedModelSeries] = useState<string | null>(null);
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
  const [damagePhoto, setDamagePhoto] = useState<string | null>(null);
  const [damagePhotoName, setDamagePhotoName] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert("Photo must be under 10MB"); return; }
    setDamagePhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => setDamagePhoto(reader.result as string);
    reader.readAsDataURL(file);
  };
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [expandedRepair, setExpandedRepair] = useState<string | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const initAutocomplete = useCallback(() => {
    if (!addressRef.current || autocompleteRef.current || typeof google === "undefined") return;
    const ac = new google.maps.places.Autocomplete(addressRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      fields: ["formatted_address"],
    });
    ac.setBounds(new google.maps.LatLngBounds(
      { lat: 30.1, lng: -98.0 },
      { lat: 30.6, lng: -97.5 }
    ));
    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (place?.formatted_address) setAddress(place.formatted_address);
    });
    autocompleteRef.current = ac;
  }, []);

  useEffect(() => {
    if (step === "confirm") initAutocomplete();
  }, [step, initAutocomplete]);

  // Map variant IDs back to their series repair key
  const getRepairKey = (model: string | null) => {
    if (!model) return null;
    if (IPHONE_REPAIRS[model]) return model;
    const base = model.replace(/promax|plus|pro|mini/g, "");
    return IPHONE_REPAIRS[base] ? base : model;
  };

  const currentRepairs = deviceType === "iphone" && iphoneModel
    ? IPHONE_REPAIRS[getRepairKey(iphoneModel) || ""] || []
    : deviceType === "macbook" ? MACBOOK_REPAIRS
    : deviceType === "android" ? SAMSUNG_REPAIRS : [];

  const deviceLabel = deviceType === "iphone" && iphoneModel
    ? IPHONE_SERIES.flatMap(s => s.variants).find(v => v.id === iphoneModel)?.label || "iPhone"
    : deviceType === "macbook" && selectedModel
    ? MACBOOK_SERIES.flatMap(s => s.variants).find(v => v.id === selectedModel)?.label || "MacBook"
    : deviceType === "android" && selectedModel
    ? SAMSUNG_SERIES.flatMap(s => s.variants).find(v => v.id === selectedModel)?.label || "Samsung Galaxy"
    : deviceType === "other" ? otherDeviceText || "Other Device"
    : deviceType === "macbook" ? "MacBook" : deviceType === "android" ? "Samsung Galaxy" : "Device";

  const handleDeviceSelect = (d: "iphone" | "macbook" | "android" | "other") => {
    setDeviceType(d);
    setIphoneModel(null);
    setSelectedSeries(null);
    setSelectedModel(null);
    setSelectedModelSeries(null);
    setRepair(null);
    setTimeChoice(null);
    setSelectedDate(null);
    setSpecificSlot(null);
    setOtherDeviceText("");
    setOtherIssueText("");
    if (d === "iphone" || d === "macbook" || d === "android") {
      setShowModelPicker(true); pushHistory("model");
    } else if (d === "other") {
      setStep("issue"); pushHistory("issue");
    }
  };

  const handleSeriesSelect = (seriesId: string) => {
    setSelectedSeries(seriesId);
  };

  const handleVariantSelect = (variantId: string) => {
    if (deviceType === "iphone") {
      setIphoneModel(variantId);
    } else {
      setSelectedModel(variantId);
    }
    setShowModelPicker(false);
    setSelectedSeries(null);
    setSelectedModelSeries(null);
    setStep("issue");
  };

  const handleRepairSelect = (r: { name: string; price: string; time: string; icon: string }) => {
    setRepair(r);
    setStep("time"); pushHistory("time");
  };

  const handleTimeSelect = (choice: string) => {
    setTimeChoice(choice);
    setSelectedDate(null);
    setSpecificSlot(null);
    if (choice === "ASAP") {
      setStep("confirm"); pushHistory("confirm");
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSpecificSlot(null);
  };

  const handleSlotSelect = (slot: string) => {
    setSpecificSlot(slot);
    setStep("confirm"); pushHistory("confirm");
  };

  useEffect(() => {
    const onPop = () => { handleBack(); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  });

  const pushHistory = (s: string) => {
    window.history.pushState({ step: s }, "", `#${s}`);
  };

  const handleBack = () => {
    if (step === "confirm") setStep("time");
    else if (step === "time") setStep("issue");
    else if (step === "issue") {
      if (deviceType === "iphone" || deviceType === "macbook" || deviceType === "android") {
        setStep("select");
        setShowModelPicker(true);
        setSelectedSeries(null);
        setSelectedModelSeries(null);
        setIphoneModel(null);
        setSelectedModel(null);
        setRepair(null);
      } else {
        setStep("select");
        setDeviceType(null);
      }
    } else if (step === "select" && showModelPicker && (selectedSeries || selectedModelSeries)) {
      setSelectedSeries(null);
      setSelectedModelSeries(null);
    } else if (step === "select" && showModelPicker) {
      setShowModelPicker(false);
      setDeviceType(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/book", {
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
          damagePhoto: damagePhoto ? damagePhotoName : null,
          otherDeviceText: deviceType === "other" ? otherDeviceText : undefined,
          otherIssueText: deviceType === "other" ? otherIssueText : undefined,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again or call us directly.");
    }
  };

  const resetAll = () => {
    setStep("select");
    setDeviceType(null);
    setIphoneModel(null);
    setRepair(null);
    setTimeChoice(null);
    setDamagePhoto(null);
    setDamagePhotoName(null);
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
    <main className="min-h-screen bg-[#111] text-white">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onLoad={initAutocomplete}
      />
      {/* STICKY NAV — compact, app-like */}
      <nav className="sticky top-0 z-40 bg-[#111]/95 backdrop-blur-xl border-b border-black/60">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => { resetAll(); setFooterPage(null); }} className="cursor-pointer" aria-label="Go to homepage"><Logo size="sm" /></button>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-xs text-[#34c759] font-medium">
              <LivePulse />
              <span className="hidden sm:inline">Techs Available</span>
            </div>
            <a href={`https://wa.me/${PHONE_TEL.replace('+','')}`} target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp" className="tap-spring w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#20bd5a] transition">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href={`tel:${PHONE_TEL}`} aria-label="Call us" className="tap-spring bg-[#00c853] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-[#00e676] transition">
              Call Us
            </a>
          </div>
        </div>
      </nav>

      {/* HERO — minimal, app-like */}
      {step === "select" && !showModelPicker && !footerPage && (
        <section className="bg-[#111] text-white">
          <div className="max-w-lg mx-auto px-4 pt-12 pb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-3">
              Fix your phone<br />at home.
            </h1>
            <p className="text-[#c7c7cc] text-lg mb-4 font-medium">
              Premium OEM-grade parts. Expert repair at your door.
            </p>
            <div className="flex items-center gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 bg-[#34c759]/15 text-[#34c759] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#34c759]/20">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                No Fix, No Pay
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#0a0a0a]/5 text-[#c7c7cc] text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                30-Day Warranty
              </span>
            </div>

            {/* Device selection — immediate action */}
            <div className="space-y-3">
              {[
                { id: "iphone" as const, label: "iPhone", sub: "From $69", icon: "📱" },
                { id: "macbook" as const, label: "MacBook", sub: "Custom quote", icon: "💻" },
                { id: "android" as const, label: "Samsung", sub: "Custom quote", icon: "📲" },
                { id: "other" as const, label: "Other", sub: "Any device", icon: "🔧" },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDeviceSelect(d.id)}
                  className="tap-spring w-full flex items-center gap-4 p-5 rounded-2xl bg-[#0a0a0a]/5 border border-white/10 hover:bg-[#0a0a0a]/10 hover:border-white/20 transition-all duration-200 cursor-pointer text-left"
                >
                  <span className="text-3xl">{d.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-lg">{d.label}</p>
                    <p className="text-[#c7c7cc] text-sm">{d.sub}</p>
                  </div>
                  <svg className="w-5 h-5 text-[#c7c7cc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            {/* How it works — visual step flow with driving van */}
            <div className="mt-10">
              <div className="flex items-start justify-between relative">
                {/* Track line */}
                <div className="absolute top-4 left-[16%] right-[16%] h-[2px] bg-[#0a0a0a]/10">
                  <div className="h-full bg-[#00c853] w-0 animate-[progressLine_2.5s_ease-out_0.5s_forwards]" />
                </div>
                {/* Driving van */}
                <div className="absolute top-[2px] left-[16%] z-20 animate-[driveVan_2.5s_ease-out_0.5s_forwards]" style={{ transform: "translateX(-50%)" }}>
                  <svg width="32" height="18" viewBox="0 0 32 18" fill="none" style={{ filter: "drop-shadow(0 0 8px rgba(0,113,227,0.6))" }}><path d="M4 12V8l2-4h7l4-2h6l3 4h2v4a1 1 0 01-1 1h-1.1a3 3 0 00-5.8 0h-6.2a3 3 0 00-5.8 0H4a1 1 0 01-1-1z" fill="#00c853"/><path d="M13 4l4-2h6l2.5 3H12.5z" fill="#4da6ff" opacity="0.6"/><path d="M6 4h5v4H5l1-4z" fill="#4da6ff" opacity="0.4"/><line x1="13" y1="4" x2="13" y2="8" stroke="#005bb5" strokeWidth="0.5" opacity="0.4"/><circle cx="8" cy="14" r="2.5" fill="#333" stroke="#555" strokeWidth="0.5"/><circle cx="8" cy="14" r="1" fill="#888"/><circle cx="23" cy="14" r="2.5" fill="#333" stroke="#555" strokeWidth="0.5"/><circle cx="23" cy="14" r="1" fill="#888"/><rect x="27" y="7" width="2" height="1" rx="0.5" fill="#ff4444" opacity="0.8"/><rect x="3" y="7" width="1.5" height="1" rx="0.5" fill="#ffcc00" opacity="0.8"/></svg>
                </div>
                {[
                  { num: "1", label: "Pick device" },
                  { num: "2", label: "Choose repair" },
                  { num: "3", label: "Book time" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center relative z-10 w-1/3">
                    <div className="w-8 h-8 rounded-full bg-[#00c853] flex items-center justify-center text-white text-sm font-bold shadow-[0_0_12px_rgba(0,113,227,0.3)]">
                      {s.num}
                    </div>
                    <p className="text-white text-xs font-semibold mt-2">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-[#c7c7cc] text-[11px] mt-5 font-medium">Takes about a minute · Fast service · 30-day warranty</p>
            </div>
          </div>
        </section>
      )}

      {/* MODEL PICKER — two-step: Series → Variant (iPhone / MacBook / Samsung) */}
      {showModelPicker && !footerPage && (
        <section className="bg-[#111] text-white min-h-[60vh]">
          <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
            <button onClick={handleBack} aria-label="Go back" className="tap-spring relative z-10 inline-flex items-center gap-2 text-[#00c853] text-base font-semibold mb-6 px-5 py-2.5 rounded-full bg-[#0a0a0a]/8 border border-white/15 hover:bg-[#0a0a0a]/15 cursor-pointer transition active:scale-95">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>

            {/* MacBook / Samsung — simple list picker */}
            {(deviceType === "macbook" || deviceType === "android") && (() => {
              const seriesData = deviceType === "macbook" ? MACBOOK_SERIES : SAMSUNG_SERIES;
              const activeSeries = selectedModelSeries ? seriesData.find(s => s.id === selectedModelSeries) : null;
              const title = deviceType === "macbook" ? "Select your MacBook" : "Select your Samsung";

              if (activeSeries) return (
                <div className="animate-[fadeIn_0.2s_ease-out]">
                  <h2 className="text-2xl font-bold tracking-tight mb-1">{activeSeries.label}</h2>
                  <p className="text-[#c7c7cc] text-sm mb-6 font-medium leading-relaxed">Pick your exact model</p>
                  <div className="space-y-3">
                    {activeSeries.variants.map((v, i) => (
                      <button key={v.id} onClick={() => handleVariantSelect(v.id)} className="card-3d w-full flex items-center justify-between px-5 rounded-2xl cursor-pointer text-left h-[70px]" style={{ animationDelay: `${i * 0.06}s` }}>
                        <div>
                          <p className="font-bold text-white text-[15px]">{v.label}</p>
                          <p className="text-[#aaa] text-xs font-medium">{v.size}</p>
                        </div>
                        <svg className="w-5 h-5 text-[#aaa] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    ))}
                  </div>
                </div>
              );

              return (
                <>
                  <h2 className="text-2xl font-bold tracking-tight mb-1">{title}</h2>
                  <p className="text-[#c7c7cc] text-sm mb-6 font-medium leading-relaxed">Choose your series, then pick your model</p>
                  <div className="space-y-2">
                    {seriesData.map((s) => (
                      <button key={s.id} onClick={() => setSelectedModelSeries(s.id)} className="card-3d w-full flex items-center justify-between p-5 rounded-2xl cursor-pointer text-left">
                        <div>
                          <p className="font-semibold text-white text-lg">{s.label}</p>
                          <p className="text-[#aaa] text-sm font-medium">{s.year} · {s.variants.length} models</p>
                        </div>
                        <svg className="w-5 h-5 text-[#aaa]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    ))}
                  </div>
                </>
              );
            })()}

            {/* iPhone — series grid with renders */}
            {deviceType === "iphone" && !selectedSeries && (
              <>
                <h2 className="text-2xl font-bold tracking-tight mb-1">Select your iPhone</h2>
                <p className="text-[#c7c7cc] text-sm mb-6 font-medium leading-relaxed">Choose your series, then pick your exact model</p>
                <div className="grid grid-cols-2 gap-3">
                  {IPHONE_SERIES.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => handleSeriesSelect(s.id)}
                      className="card-3d group flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer text-center h-[130px]"
                      style={{ animationDelay: `${idx * 0.06}s` }}
                    >
                      {(s as { image?: string }).image ? (
                        <img src={(s as { image?: string }).image} alt={s.label} loading="lazy" className="w-16 h-16 object-contain mb-2 group-hover:scale-110 transition-transform" style={s.id === "16" ? { transform: "scale(1.07)" } : undefined} />
                      ) : (
                        <div className="icon-circle w-12 h-12 rounded-full bg-[#0a0a0a]/50 flex items-center justify-center mb-2 group-active:bg-[#0a0a0a]/20 transition-colors">
                          <span className="text-2xl">📱</span>
                        </div>
                      )}
                      <p className="font-bold text-white text-[13px] leading-tight">{s.label}</p>
                      <p className="text-[#aaa] text-[11px] font-medium mt-0.5">{s.year} · {s.variants.length} models</p>
                    </button>
                  ))}
                </div>
              </>
            )}
            {deviceType === "iphone" && selectedSeries && (
              <>
                {(() => { const series = IPHONE_SERIES.find(s => s.id === selectedSeries); if (!series) return null; return (
                  <div className="animate-[fadeIn_0.2s_ease-out]">
                    <h2 className="text-2xl font-bold tracking-tight mb-1">{series.label} Series</h2>
                    <p className="text-[#c7c7cc] text-sm mb-6 font-medium leading-relaxed">Pick your exact model</p>
                    <div className="space-y-3">
                      {series.variants.map((v, i) => (
                        <button
                          key={v.id}
                          onClick={() => handleVariantSelect(v.id)}
                          className="card-3d w-full flex items-center justify-between px-5 rounded-2xl cursor-pointer text-left h-[70px]"
                          style={{ animationDelay: `${i * 0.06}s` }}
                        >
                          <div>
                            <p className="font-bold text-white text-[15px]">{v.label}</p>
                            <p className="text-[#aaa] text-xs font-medium">{v.size} display</p>
                          </div>
                          <svg className="w-5 h-5 text-[#aaa] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                ); })()}
              </>
            )}
            <p className="text-[#c7c7cc] text-[12px] text-center mt-4 font-medium leading-relaxed">Premium parts at competitive rates. Repaired at your home, office, or anywhere in Austin.</p>
          </div>
        </section>
      )}

      {/* STEP: ISSUE SELECTION */}
      {step === "issue" && !footerPage && (
        <section className="animate-[fadeIn_0.3s_ease-out]">
          <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
            <button onClick={handleBack} aria-label="Go back" className="tap-spring relative z-10 inline-flex items-center gap-2 text-[#00c853] text-base font-semibold mb-6 px-5 py-2.5 rounded-full bg-[#0a0a0a]/8 border border-white/15 hover:bg-[#0a0a0a]/15 cursor-pointer transition active:scale-95">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
            <StepIndicator current={1} total={3} />

            {deviceType === "other" ? (
              <>
                <h2 className="text-2xl font-bold tracking-tight mb-1">Tell us about your device</h2>
                <p className="text-[#c7c7cc] text-sm mb-6 font-medium leading-relaxed">Describe your device and the issue</p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="other-device" className="block text-xs font-medium text-[#c7c7cc] mb-1.5 uppercase tracking-wider">Device</label>
                    <input id="other-device" type="text" placeholder="e.g. iPad Pro, Google Pixel 8, Nintendo Switch..." value={otherDeviceText} onChange={(e) => setOtherDeviceText(e.target.value)} required aria-label="Device name" className="w-full px-4 py-3.5 bg-[#1a1a2e] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#c7c7cc] focus:outline-none focus:border-[#00c853] focus:ring-4 focus:ring-[#00c853]/10 transition" />
                  </div>
                  <div>
                    <label htmlFor="other-issue" className="block text-xs font-medium text-[#c7c7cc] mb-1.5 uppercase tracking-wider">What&apos;s wrong?</label>
                    <textarea id="other-issue" placeholder="Describe the issue..." value={otherIssueText} onChange={(e) => setOtherIssueText(e.target.value)} required rows={3} className="w-full px-4 py-3.5 bg-[#1a1a2e] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#c7c7cc] focus:outline-none focus:border-[#00c853] focus:ring-4 focus:ring-[#00c853]/10 transition resize-none" />
                  </div>
                  <button onClick={() => { setRepair({ name: otherIssueText || "Custom Repair", price: "Custom Quote", time: "TBD", icon: "🔧" }); setStep("time"); }} disabled={!otherDeviceText || !otherIssueText} className="tap-spring w-full bg-[#00c853] text-white py-4 rounded-2xl text-base font-semibold hover:bg-[#00e676] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    Continue to Scheduling
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold tracking-tight mb-1">What&apos;s the issue?</h2>
                <p className="text-[#c7c7cc] text-sm mb-2 font-medium leading-relaxed">{deviceLabel} · {deviceType === "iphone" ? "Tap to see pricing" : "All repairs quoted individually"}</p>
                <p className="text-[#34c759] text-xs font-medium mb-6">A certified technician comes to you — fast</p>

                <div className="grid grid-cols-2 gap-3">
                  {currentRepairs.map((r, idx) => {
                    const hasSub = !!(r as { _sub?: unknown[] })._sub;
                    const isExpanded = expandedRepair === r.name;
                    const subs = (r as { _sub?: { name: string; price: string; icon: string }[] })._sub;
                    return (
                      <div key={r.name} className={isExpanded ? "col-span-2" : ""} style={{ animationDelay: `${idx * 0.06}s` }}>
                        <button
                          onClick={() => hasSub ? setExpandedRepair(isExpanded ? null : r.name) : handleRepairSelect(r)}
                          className="card-3d w-full flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer text-center h-[130px] group"
                          style={{ animationDelay: `${idx * 0.06}s` }}
                        >
                          <div className="icon-circle w-12 h-12 rounded-full bg-[#0a0a0a]/50 flex items-center justify-center mb-2 group-active:bg-[#0a0a0a]/20 transition-colors">
                            <span className="text-2xl">{r.icon}</span>
                          </div>
                          <p className="font-bold text-white text-[13px] leading-tight">{r.name}</p>
                          <p className="text-[#00c853] font-extrabold text-base mt-1">{r.price}</p>
                          {hasSub && <svg className={`w-3 h-3 text-[#aaa] mt-0.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>}
                        </button>
                        {isExpanded && subs && (
                          <div className="grid grid-cols-2 gap-2 mt-2 animate-[fadeIn_0.2s_ease-out]">
                            {subs.map((sub) => (
                              <button key={sub.name} onClick={() => handleRepairSelect({ ...sub, time: r.time })} className="tap-spring flex flex-col items-center p-3 rounded-xl bg-[#1a1a2e] border border-white/10 cursor-pointer">
                                <span className="text-lg mb-1">{sub.icon}</span>
                                <span className="text-xs font-semibold">{sub.name}</span>
                                <span className="text-[#00c853] font-bold text-sm">{sub.price}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Trust mini-bar */}
            <div className="flex items-center justify-center gap-6 mt-8 text-[#c7c7cc] text-xs">
              <span>✓ Free diagnostics</span>
              <span>✓ Premium parts</span>
              <span>✓ 30-day parts warranty</span>
            </div>
          </div>
        </section>
      )}

      {/* STEP: TIME SELECTION */}
      {step === "time" && repair && !footerPage && (
        <section className="animate-[fadeIn_0.3s_ease-out]">
          <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
            <button onClick={handleBack} aria-label="Go back" className="tap-spring relative z-10 inline-flex items-center gap-2 text-[#00c853] text-base font-semibold mb-6 px-5 py-2.5 rounded-full bg-[#0a0a0a]/8 border border-white/15 hover:bg-[#0a0a0a]/15 cursor-pointer transition active:scale-95">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
            <StepIndicator current={2} total={3} />

            {/* Selected repair summary */}
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#c7c7cc] font-medium">{deviceLabel}</p>
                <p className="font-semibold">{repair.name}</p>
              </div>
              <div className="text-right">
                <p className="text-[#00c853] font-bold">{repair.price}</p>
                <p className="text-[#c7c7cc] text-xs font-medium">~{repair.time}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight mb-1">When works best?</h2>
            <p className="text-[#c7c7cc] text-sm mb-6 font-medium leading-relaxed">A technician will come to your location</p>

            {/* Technician card — Uber-like */}
            <div className="mb-6">
              <TechCard />
            </div>

            {/* Booking type: ASAP or Schedule */}
            <div className="space-y-3 mb-6">
              {BOOKING_OPTIONS.map((opt) => {
                const isSelected = timeChoice === opt.label;
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleTimeSelect(opt.label)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer text-left ${
                      isSelected
                        ? "border-2 border-[#00c853] bg-[#00c853]/10 transition-all duration-200"
                        : "card-3d"
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div className="flex-1">
                      <p className={`font-semibold text-lg ${isSelected ? "text-white" : "text-white"}`}>{opt.label}</p>
                      <p className={`text-xs font-medium ${isSelected ? "text-[#c7c7cc]" : "text-[#aaa]"}`}>{opt.sub}</p>
                    </div>
                    {opt.badge && (
                      <span className="text-[12px] bg-[#34c759] text-white px-2 py-0.5 rounded-full font-medium">{opt.badge}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Schedule: Date picker */}
            {timeChoice === "Schedule" && (
              <div className="animate-[fadeIn_0.2s_ease-out] mb-6">
                <p className="text-xs text-[#c7c7cc] uppercase tracking-wider font-medium mb-3">Pick a date</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {getNext7Days().map((d) => (
                    <button
                      key={d.value}
                      onClick={() => handleDateSelect(d.value)}
                      className={`flex-shrink-0 px-4 py-3 rounded-xl text-center text-sm font-medium cursor-pointer ${
                        selectedDate === d.value
                          ? "border border-[#00c853] bg-[#00c853] text-white transition"
                          : "card-3d text-white"
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
                <p className="text-xs text-[#c7c7cc] uppercase tracking-wider font-medium mb-3">Pick a time</p>
                <div className="space-y-2">
                  {SCHEDULE_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSlotSelect(slot)}
                      className={`w-full p-3 rounded-xl text-center text-sm font-medium cursor-pointer ${
                        specificSlot === slot
                          ? "border border-[#00c853] bg-[#00c853] text-white transition"
                          : "card-3d text-white"
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
      {step === "confirm" && !submitted && repair && !footerPage && (
        <section className="animate-[fadeIn_0.3s_ease-out]">
          <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
            <button onClick={handleBack} aria-label="Go back" className="tap-spring relative z-10 inline-flex items-center gap-2 text-[#00c853] text-base font-semibold mb-6 px-5 py-2.5 rounded-full bg-[#0a0a0a]/8 border border-white/15 hover:bg-[#0a0a0a]/15 cursor-pointer transition active:scale-95">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
            <StepIndicator current={3} total={3} />

            {/* Order summary — DoorDash checkout style */}
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-5 mb-6">
              <p className="text-xs text-[#c7c7cc] uppercase tracking-wider font-medium mb-3">Your repair</p>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold">{repair.name}</p>
                  <p className="text-[#c7c7cc] text-xs font-medium">{deviceLabel}</p>
                </div>
                <p className="text-[#00c853] font-bold text-lg">{repair.price}</p>
              </div>
              <div className="border-t border-white/15 pt-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#34c759]">●</span>
                  <span>{timeChoice === "ASAP" ? "ASAP — Next available tech" : `${getNext7Days().find(d => d.value === selectedDate)?.label || selectedDate}, ${specificSlot}`}</span>
                </div>
                <span className="text-[#c7c7cc]">~{repair.time}</span>
              </div>
            </div>

            <h2 className="text-xl font-bold tracking-tight mb-1">Almost done</h2>
            <p className="text-[#c7c7cc] text-sm mb-6 font-medium leading-relaxed">Where should we send the technician?</p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} className="space-y-4">
              <div>
                <label htmlFor="field-address" className="block text-xs font-medium text-[#c7c7cc] mb-1.5 uppercase tracking-wider">Location</label>
                <input
                  id="field-address"
                  ref={addressRef}
                  type="text"
                  placeholder="Start typing your Austin address…"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  autoComplete="off"
                  className="w-full px-4 py-3.5 bg-[#1a1a2e] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#c7c7cc] focus:outline-none focus:border-[#00c853] focus:ring-4 focus:ring-[#00c853]/10 transition"
                />
              </div>
              <div>
                <label htmlFor="field-name" className="block text-xs font-medium text-[#c7c7cc] mb-1.5 uppercase tracking-wider">Name</label>
                <input
                  id="field-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 bg-[#1a1a2e] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#c7c7cc] focus:outline-none focus:border-[#00c853] focus:ring-4 focus:ring-[#00c853]/10 transition"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="field-phone" className="block text-xs font-medium text-[#c7c7cc] mb-1.5 uppercase tracking-wider">Phone</label>
                  <input
                    id="field-phone"
                    type="tel"
                    placeholder="(512) 555-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-[#1a1a2e] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#c7c7cc] focus:outline-none focus:border-[#00c853] focus:ring-4 focus:ring-[#00c853]/10 transition"
                  />
                </div>
                <div>
                  <label htmlFor="field-email" className="block text-xs font-medium text-[#c7c7cc] mb-1.5 uppercase tracking-wider">Email <span className="normal-case text-[12px] font-medium">(optional)</span></label>
                  <input
                    id="field-email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#1a1a2e] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#c7c7cc] focus:outline-none focus:border-[#00c853] focus:ring-4 focus:ring-[#00c853]/10 transition"
                  />
                </div>
              </div>
              <p className="text-[12px] text-[#c7c7cc] -mt-2 font-medium leading-relaxed">Provide at least one so we can reach you</p>

              {/* Damage photo upload — optional */}
              <div>
                <label className="block text-xs font-medium text-[#c7c7cc] mb-1.5 uppercase tracking-wider">Photo of Damage <span className="normal-case text-[12px] font-medium">(optional)</span></label>
                <input ref={photoInputRef} type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} className="hidden" />
                {damagePhoto ? (
                  <div className="relative rounded-xl overflow-hidden border border-white/15">
                    <img src={damagePhoto} alt="Damage photo" className="w-full h-40 object-cover" />
                    <button type="button" onClick={() => { setDamagePhoto(null); setDamagePhotoName(null); }} aria-label="Remove photo" className="absolute top-2 right-2 bg-black/60 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm cursor-pointer hover:bg-black/80 transition">x</button>
                    <p className="absolute bottom-2 left-2 bg-black/60 text-white text-[12px] px-2 py-0.5 rounded-full">{damagePhotoName}</p>
                  </div>
                ) : (
                  <button type="button" onClick={() => photoInputRef.current?.click()} className="tap-spring w-full py-4 border-2 border-dashed border-white/20 rounded-xl text-[#c7c7cc] text-sm font-medium cursor-pointer hover:border-[#00c853]/40 hover:text-white transition flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Snap or upload a photo of the damage
                  </button>
                )}
                <p className="text-[#c7c7cc] text-[12px] mt-1.5 font-medium">Helps our tech prep the right parts before arrival</p>
              </div>

              <button
                type="submit"
                className="tap-spring w-full bg-[#00c853] text-white py-4 rounded-2xl text-base font-semibold hover:bg-[#00e676] transition cursor-pointer mt-2"
              >
                Book My Repair Now
              </button>

              <div className="flex items-center justify-center gap-4 text-[#c7c7cc] text-[12px] mt-3">
                <span>✓ Free diagnostics</span>
                <span>✓ Premium parts</span>
                <span>✓ Pay after repair</span>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* CONFIRMED — Uber-style tracking feel */}
      {submitted && repair && !footerPage && (
        <section className="animate-[fadeIn_0.4s_ease-out]">
          <div className="max-w-lg mx-auto px-4 pt-10 pb-12 text-center">
            <div className="w-20 h-20 rounded-full bg-[#34c759]/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#34c759]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-[#c7c7cc] text-sm mb-8 font-medium leading-relaxed">
              {timeChoice === "ASAP"
                ? `${name ? `${name}, a` : "A"} technician will contact you within 30 minutes to confirm your repair.`
                : `${name ? `${name}, your` : "Your"} repair is scheduled. You'll receive a confirmation and be contacted before your appointment.`}
            </p>

            {/* Fake tracking card */}
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-5 mb-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-[#c7c7cc] uppercase tracking-wider font-medium">Estimated arrival</p>
                <p className="text-[#00c853] font-bold">~20 min</p>
              </div>
              <TechCard />
            </div>

            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-5 mb-8 text-left">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold">{repair.name}</p>
                  <p className="text-[#c7c7cc] text-xs font-medium">{deviceLabel}</p>
                </div>
                <p className="text-[#00c853] font-bold">{repair.price}</p>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="text-[#00c853] text-sm font-medium cursor-pointer hover:underline"
            >
              Book another repair
            </button>
          </div>
        </section>
      )}

      {/* BELOW-FOLD */}
      {step === "select" && !showModelPicker && !footerPage && (
        <>
          {/* TRUST STATS */}
          <section className="py-8 bg-[#111]">
            <div className="max-w-lg mx-auto px-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#1a1a2e] rounded-2xl p-4 border border-white/10">
                  <p className="text-2xl font-bold text-[#00c853]">4,200+</p>
                  <p className="text-[#c7c7cc] text-xs font-medium mt-1">Repairs Done</p>
                </div>
                <div className="bg-[#1a1a2e] rounded-2xl p-4 border border-white/10">
                  <p className="text-2xl font-bold text-[#00c853]">4.9★</p>
                  <p className="text-[#c7c7cc] text-xs font-medium mt-1">Avg Rating</p>
                </div>
                <div className="bg-[#1a1a2e] rounded-2xl p-4 border border-white/10">
                  <p className="text-2xl font-bold text-[#00c853]">30-Day</p>
                  <p className="text-[#c7c7cc] text-xs font-medium mt-1">Warranty</p>
                </div>
              </div>
            </div>
          </section>

          {/* REVIEWS MARQUEE */}
          <section className="py-10 overflow-hidden bg-[#111]">
            <p className="text-white font-semibold text-lg text-center mb-6">Done right the first time.</p>
            <div className="relative">
              <div className="flex animate-[marquee_20s_linear_infinite] gap-4 w-max">
                {[
                  { text: "Fixed my screen in 25 minutes at my office.", name: "Sarah K." },
                  { text: "Better than any Apple Store trip I've had.", name: "Emily W." },
                  { text: "Battery was dying by noon. Fixed in 15 min.", name: "James H." },
                  { text: "Professional, fast, and exactly as quoted.", name: "David R." },
                  { text: "MacBook keyboard fixed same day. Great warranty.", name: "Amanda P." },
                  { text: "Fixed my screen in 25 minutes at my office.", name: "Sarah K." },
                  { text: "Better than any Apple Store trip I've had.", name: "Emily W." },
                  { text: "Battery was dying by noon. Fixed in 15 min.", name: "James H." },
                  { text: "Professional, fast, and exactly as quoted.", name: "David R." },
                  { text: "MacBook keyboard fixed same day. Great warranty.", name: "Amanda P." },
                ].map((r, i) => (
                  <div key={i} className="flex-shrink-0 w-[260px] bg-[#1a1a2e] rounded-2xl p-4 border border-white/10">
                    <p className="text-sm text-white/85 font-medium mb-2">&ldquo;{r.text}&rdquo;</p>
                    <p className="text-xs text-[#c7c7cc]">— {r.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* QUICK FAQ */}
          <section className="py-12 bg-[#111]">
            <div className="max-w-lg mx-auto px-4">
              <h2 className="text-xl font-bold text-center mb-6">Quick questions</h2>
              <div className="space-y-2">
                {[
                  { q: "How long do repairs take?", a: "Most repairs are completed in 20-45 minutes depending on the issue." },
                  { q: "What if you can't fix it?", a: "If we can't fix your device, you pay nothing. Zero risk." },
                  { q: "Do you use quality parts?", a: "Yes. Every part is premium OEM-grade, inspected and tested before installation." },
                  { q: "What's your warranty?", a: "Every repair comes with a 30-day parts warranty. If anything goes wrong, we fix it free." },
                  { q: "How do I pay?", a: "Pay after the repair is complete. We accept all major payment methods." },
                ].map((item) => (
                  <details key={item.q} className="group bg-[#1a1a2e] rounded-2xl border border-white/10 overflow-hidden">
                    <summary className="px-5 py-4 cursor-pointer font-semibold text-sm flex items-center justify-between list-none">
                      {item.q}
                      <svg className="w-4 h-4 text-[#c7c7cc] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <p className="px-5 pb-4 text-[#c7c7cc] text-sm leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>


          {/* FOOTER CTA */}
          <section className="py-16 bg-[#111] text-center">
            <div className="max-w-lg mx-auto px-4">
              <h2 className="text-2xl font-bold mb-2">Ready when you are.</h2>
              <p className="text-[#c7c7cc] text-sm mb-6 font-medium">Book in under a minute. A tech comes to you — fast.</p>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="tap-spring bg-[#00c853] text-white px-10 py-4 rounded-2xl text-base font-semibold cursor-pointer hover:bg-[#00e676] transition">
                Start Repair
              </button>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-[#111] text-[#c7c7cc] py-12 border-t border-white/10">
            <div className="max-w-lg mx-auto px-4">
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Company</p>
                  <div className="space-y-2">
                    <button onClick={() => { setFooterPage("about"); window.scrollTo({ top: 0 }); }} className="block text-xs hover:text-white transition cursor-pointer">About Us</button>
                    <button onClick={() => { setFooterPage("contact"); window.scrollTo({ top: 0 }); }} className="block text-xs hover:text-white transition cursor-pointer">Contact</button>
                  </div>
                </div>
                <div>
                  <p className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Support</p>
                  <div className="space-y-2">
                    <button onClick={() => { setFooterPage("faq"); window.scrollTo({ top: 0 }); }} className="block text-xs hover:text-white transition cursor-pointer">FAQ</button>
                    <a href={`tel:${PHONE_TEL}`} className="block text-xs hover:text-white transition">{PHONE}</a>
                  </div>
                </div>
                <div>
                  <p className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Service</p>
                  <div className="space-y-2">
                    <p className="text-xs">Austin, TX</p>
                    <p className="text-xs">Mon-Sat 8AM-8PM</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6 text-center">
                <p className="text-[11px] text-[#c7c7cc]/60 mb-2">© 2026 {BRAND}</p>
                <a href="/privacy" className="text-[11px] text-[#c7c7cc]/40 hover:text-[#c7c7cc]/70 transition">Privacy Policy</a>
              </div>
            </div>
          </footer>

          {/* STICKY BOTTOM CTA — mobile */}
          <div className="sticky bottom-0 bg-[#111]/90 backdrop-blur-xl border-t border-white/10 p-3 md:hidden">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="tap-spring w-full bg-[#00c853] text-white py-3 rounded-2xl text-sm font-semibold cursor-pointer">
              Start Repair
            </button>
          </div>
        </>
      )}

      {/* FOOTER PAGES */}
      {footerPage && (
        <section className="min-h-screen bg-[#111] text-white">
          <div className="max-w-lg mx-auto px-4 pt-6 pb-16">
            <button onClick={() => { setFooterPage(null); window.scrollTo({ top: 0 }); }} aria-label="Go back" className="tap-spring relative z-10 inline-flex items-center gap-2 text-[#00c853] text-base font-semibold mb-6 px-5 py-2.5 rounded-full bg-[#0a0a0a]/8 border border-white/15 hover:bg-[#0a0a0a]/15 cursor-pointer transition active:scale-95">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Home
            </button>

            {footerPage === "about" && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="text-[#c7c7cc] mb-6 leading-relaxed">Austin Mobile Repair was founded with a simple mission: bring professional device repair directly to you. No store visits. No long waits. Just fast, quality repairs at your door.</p>
                <div className="space-y-4 mb-8">
                  <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/10">
                    <p className="font-semibold mb-1">Our Mission</p>
                    <p className="text-[#c7c7cc] text-sm">Make device repair as easy as ordering a ride. Premium parts, certified technicians, and a 30-day warranty on every repair.</p>
                  </div>
                  <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/10">
                    <p className="font-semibold mb-1">Why We&apos;re Different</p>
                    <p className="text-[#c7c7cc] text-sm">We come to your home, office, or anywhere in Austin. Every part is inspected and tested before installation. If we can&apos;t fix it, you don&apos;t pay.</p>
                  </div>
                  <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/10">
                    <p className="font-semibold mb-1">Serving Austin, TX</p>
                    <p className="text-[#c7c7cc] text-sm">We cover all of Austin and surrounding areas. iPhone, MacBook, Samsung — we fix them all.</p>
                  </div>
                </div>
              </div>
            )}

            {footerPage === "faq" && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
                <div className="space-y-3">
                  {[
                    { q: "How does the repair work?", a: "Pick your device and issue on our site. A certified technician drives to your location and fixes it on the spot." },
                    { q: "How long do repairs take?", a: "Most repairs are completed in 20-45 minutes depending on the issue." },
                    { q: "What if you can't fix it?", a: "If we can't fix your device, you pay nothing. Zero risk." },
                    { q: "Do you use quality parts?", a: "Yes. Every part is premium-quality, inspected and tested before installation." },
                    { q: "What's your warranty?", a: "Every repair comes with a 30-day parts warranty." },
                    { q: "Where do you service?", a: "We cover all of Austin, TX and surrounding areas." },
                    { q: "How do I pay?", a: "Pay after the repair is complete. We accept all major payment methods." },
                    { q: "Can I see pricing before I book?", a: "Yes. Our booking flow shows you the exact price for your device and repair type before you confirm." },
                  ].map((item) => (
                    <div key={item.q} className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/10">
                      <p className="font-semibold text-sm mb-1">{item.q}</p>
                      <p className="text-[#c7c7cc] text-sm">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {footerPage === "contact" && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                <div className="space-y-4 mb-8">
                  <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-4 bg-[#1a1a2e] rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-[#00c853] text-sm">{PHONE}</p>
                    </div>
                  </a>
                  <a href="mailto:support@atxgadgetfix.com" className="flex items-center gap-4 bg-[#1a1a2e] rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-[#00c853] text-sm">support@atxgadgetfix.com</p>
                    </div>
                  </a>
                  <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/10">
                    <span className="text-2xl mb-2 block">🕐</span>
                    <p className="font-semibold">Hours</p>
                    <p className="text-[#c7c7cc] text-sm">Monday – Saturday: 8AM – 8PM</p>
                    <p className="text-[#c7c7cc] text-sm">Sunday: Closed</p>
                  </div>
                  <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/10">
                    <span className="text-2xl mb-2 block">📍</span>
                    <p className="font-semibold">Service Area</p>
                    <p className="text-[#c7c7cc] text-sm">All of Austin, TX and surrounding areas. We come to you.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CHAT WIDGET */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-50 group/chat">
        {chatOpen && (
          <div className="mb-3 w-[300px] bg-[#111] border border-white/15 rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-[#00c853] px-4 py-3 flex items-center justify-between">
              <p className="text-white font-semibold text-sm">Austin Mobile Repair</p>
              <button onClick={() => setChatOpen(false)} aria-label="Close chat" className="text-white/80 hover:text-white cursor-pointer text-lg">x</button>
            </div>
            <div className="p-4">
              {chatMode === "choose" && (
                <>
                  <p className="text-white text-sm mb-4">Hey! How would you like to connect?</p>
                  <div className="space-y-2">
                    <button onClick={() => setChatMode("chat")} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0a]/5 border border-white/10 hover:bg-[#0a0a0a]/10 cursor-pointer transition text-left active:scale-[0.98]">
                      <span className="text-xl">💬</span><div><p className="font-semibold text-sm text-white">Live Chat</p><p className="text-[#888] text-xs">Ask about repairs</p></div>
                    </button>
                    <button onClick={() => setChatMode("call")} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0a]/5 border border-white/10 hover:bg-[#0a0a0a]/10 cursor-pointer transition text-left active:scale-[0.98]">
                      <span className="text-xl">📞</span><div><p className="font-semibold text-sm text-white">Talk to a Human</p><p className="text-[#888] text-xs">Call us directly</p></div>
                    </button>
                  </div>
                </>
              )}
              {chatMode === "chat" && (
                <>
                  <button onClick={() => setChatMode("choose")} className="text-[#888] text-xs mb-2 cursor-pointer hover:text-white">← Back</button>
                  <div className="h-[200px] overflow-y-auto space-y-2 mb-2 pr-1">
                    {chatMessages.map((m, i) => (
                      <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${m.from === "user" ? "bg-[#00c853] text-white" : "bg-[#0a0a0a]/10 text-white/90"}`}>{m.text}</div>
                      </div>
                    ))}
                    {chatLoading && <div className="flex justify-start"><div className="bg-[#0a0a0a]/10 text-white/60 px-3 py-2 rounded-xl text-xs">Typing...</div></div>}
                  </div>
                  <div className="flex gap-2">
                    <input value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="Ask me anything..." aria-label="Chat message" className="flex-1 px-3 py-2 bg-[#0a0a0a]/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-[#aaa] focus:outline-none focus:border-[#00c853]" />
                    <button onClick={sendChat} disabled={chatLoading} aria-label="Send message" className="bg-[#00c853] text-white px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer hover:bg-[#00e676] transition disabled:opacity-50">Send</button>
                  </div>
                </>
              )}
              {chatMode === "call" && (
                <div className="text-center py-2">
                  <button onClick={() => setChatMode("choose")} className="text-[#888] text-xs mb-3 cursor-pointer hover:text-white block mx-auto">← Back</button>
                  <a href={`tel:${PHONE_TEL}`} className="block w-full bg-[#00c853] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#00e676] transition text-center mb-2">📞 Call {PHONE}</a>
                  <p className="text-[#888] text-xs">Mon-Sat 8AM-8PM</p>
                </div>
              )}
            </div>
          </div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)} aria-label={chatOpen ? "Close chat" : "Open live chat"} className="w-14 h-14 rounded-full bg-[#00c853] text-white flex items-center justify-center shadow-lg hover:bg-[#00e676] hover:opacity-100 transition-all duration-300 cursor-pointer active:scale-90 animate-[chatFade_4s_ease-out_forwards]">
          {chatOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          )}
        </button>
      </div>

      {cookieConsent === null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111]/95 backdrop-blur-sm border-t border-white/10 px-3 py-2 animate-[fadeIn_0.3s_ease-out]">
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <p className="text-white/80 text-[11px] flex-1">We use cookies to improve your experience.</p>
            <button onClick={() => { localStorage.setItem("cookie-consent", "essential"); setCookieConsent("essential"); }} aria-label="Accept essential cookies only" className="text-white/60 text-[11px] font-medium cursor-pointer hover:text-white transition whitespace-nowrap">Essential</button>
            <button onClick={() => { localStorage.setItem("cookie-consent", "full"); setCookieConsent("full"); }} aria-label="Accept all cookies" className="bg-[#00c853] text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer hover:bg-[#00e676] transition whitespace-nowrap">Accept All</button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes progressLine { from { width: 0; } to { width: 100%; } }
        @keyframes chatFade { 0% { opacity: 1; } 60% { opacity: 1; } 100% { opacity: 0.35; } }
        @keyframes driveVan { 0% { left: 16%; opacity: 0; } 10% { opacity: 1; } 85% { left: 84%; opacity: 1; } 100% { left: 84%; opacity: 0; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </main>
  );
}
