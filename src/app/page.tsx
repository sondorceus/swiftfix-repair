import Link from "next/link";

const BRAND = "Austin Mobile Repair";
const TAGLINE = "We Fix Your iPhone Wherever You Are";
const PHONE = "(555) 123-4567";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#e8e8ed]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">{BRAND}</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#86868b]">
            <a href="#services" className="hover:text-[#1d1d1f] transition">Services</a>
            <a href="#how-it-works" className="hover:text-[#1d1d1f] transition">How It Works</a>
            <a href="#trust" className="hover:text-[#1d1d1f] transition">Why Us</a>
            <a href="#booking" className="hover:text-[#1d1d1f] transition">Book Repair</a>
          </div>
          <a href="#booking" className="bg-[#0071e3] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#0077ed] transition">
            Get Instant Quote
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-b from-black to-[#1d1d1f] text-white py-24 md:py-36">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[#86868b] text-sm uppercase tracking-widest mb-4">Premium Mobile Repair</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight mb-6">
            {TAGLINE}
          </h1>
          <p className="text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto mb-10 leading-relaxed">
            Same-day iPhone, MacBook & Android repairs. Free diagnostics.
            Our certified technicians come to your home, office, or anywhere you need us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking" className="bg-[#0071e3] text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-[#0077ed] transition inline-block">
              Get Instant Quote
            </a>
            <a href={`tel:${PHONE}`} className="border border-white/30 text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-white/10 transition inline-block">
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-semibold text-center tracking-tight mb-4">What We Fix</h2>
          <p className="text-[#86868b] text-center text-lg mb-16 max-w-xl mx-auto">Expert repairs for your most important devices</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📱", title: "iPhone Repair", desc: "Screen replacement, battery swap, charging port, water damage, camera repair. All iPhone models supported.", price: "From $49" },
              { icon: "💻", title: "MacBook Repair", desc: "Screen repair, keyboard replacement, battery service, logic board repair, SSD upgrades.", price: "From $99" },
              { icon: "🔧", title: "Android & More", desc: "Samsung Galaxy, Google Pixel, and other premium Android devices. By request.", price: "From $39" },
            ].map((s) => (
              <div key={s.title} className="bg-[#f5f5f7] rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <span className="text-4xl mb-4 block">{s.icon}</span>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-[#86868b] text-sm leading-relaxed mb-4">{s.desc}</p>
                <p className="text-[#0071e3] font-semibold">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-28 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-semibold text-center tracking-tight mb-4">How It Works</h2>
          <p className="text-[#86868b] text-center text-lg mb-16">Three simple steps to get your device fixed</p>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Book Online", desc: "Fill out our quick form or call us. Tell us your device and issue — we'll give you an instant quote." },
              { step: "02", title: "We Come to You", desc: "A certified technician arrives at your location — home, office, or café. No need to go anywhere." },
              { step: "03", title: "Fixed Same Day", desc: "Most repairs completed in 30-60 minutes. You watch the entire process. 90-day warranty included." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="text-5xl font-bold text-[#0071e3] mb-4">{s.step}</div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-[#86868b] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section id="trust" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-semibold text-center tracking-tight mb-16">Why Choose {BRAND}</h2>
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
              { icon: "✓", title: "Free Diagnostics", desc: "We diagnose your device for free before any repair begins." },
              { icon: "✓", title: "Genuine Parts", desc: "We use high-quality OEM-grade parts with full warranty." },
              { icon: "✓", title: "No Fix, No Fee", desc: "If we can't fix it, you don't pay. Simple as that." },
              { icon: "✓", title: "Same-Day Service", desc: "Most repairs completed the same day you book." },
              { icon: "✓", title: "Certified Techs", desc: "All technicians are certified and background-checked." },
              { icon: "✓", title: "Transparent Pricing", desc: "No hidden fees. You see the price before we start." },
            ].map((s) => (
              <div key={s.title} className="flex gap-3 p-4">
                <span className="text-[#0071e3] text-xl font-bold mt-0.5">{s.icon}</span>
                <div>
                  <h4 className="font-semibold mb-1">{s.title}</h4>
                  <p className="text-[#86868b] text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="py-20 md:py-28 bg-[#f5f5f7]">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-semibold text-center tracking-tight mb-4">Book Your Repair</h2>
          <p className="text-[#86868b] text-center text-lg mb-12">Get a free quote in under 2 minutes</p>
          <form className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#86868b]">First Name</label>
                <input type="text" defaultValue="John" className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl text-base focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#86868b]">Last Name</label>
                <input type="text" defaultValue="Smith" className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl text-base focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#86868b]">Email</label>
              <input type="email" defaultValue="john.smith@email.com" className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl text-base focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#86868b]">Phone</label>
              <input type="tel" defaultValue="(555) 987-6543" className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl text-base focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#86868b]">Device</label>
              <select defaultValue="iphone15" className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl text-base focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition bg-white">
                <option value="iphone15">iPhone 15 / 15 Pro</option>
                <option value="iphone14">iPhone 14 / 14 Pro</option>
                <option value="iphone13">iPhone 13 / 13 Pro</option>
                <option value="iphoneOlder">iPhone 12 or older</option>
                <option value="macbook">MacBook</option>
                <option value="android">Android Device</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#86868b]">Issue</label>
              <select defaultValue="screen" className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl text-base focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition bg-white">
                <option value="screen">Cracked / Broken Screen</option>
                <option value="battery">Battery Replacement</option>
                <option value="charging">Charging Port Issue</option>
                <option value="water">Water Damage</option>
                <option value="camera">Camera Not Working</option>
                <option value="other">Other Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#86868b]">Your Location (we come to you)</label>
              <input type="text" defaultValue="123 Main St, Dallas, TX" className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl text-base focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#86868b]">Additional Details</label>
              <textarea rows={3} defaultValue="Screen is cracked in the bottom left corner. Phone still works but touch is spotty in that area." className="w-full px-4 py-3.5 border border-[#e8e8ed] rounded-xl text-base focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition resize-none" />
            </div>
            <button type="submit" className="w-full bg-[#0071e3] text-white py-4 rounded-full text-lg font-medium hover:bg-[#0077ed] transition">
              Get Free Quote →
            </button>
            <p className="text-[#86868b] text-xs text-center">Free diagnostics. No obligation. We'll text you a quote within 15 minutes.</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1d1d1f] text-[#86868b] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">{BRAND}</h4>
              <p className="text-sm leading-relaxed">Premium mobile repair service. We come to you — fast, reliable, and affordable.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>iPhone Repair</li>
                <li>MacBook Repair</li>
                <li>Android Repair</li>
                <li>Screen Replacement</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>About Us</li>
                <li>Pricing</li>
                <li>Reviews</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>{PHONE}</li>
                <li>info@austinmobilerepair.com</li>
                <li>Mon-Sat: 8AM-8PM</li>
                <li>Sun: 10AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-xs">
            © 2026 {BRAND}. All rights reserved. | Same-day repair, wherever you are.
          </div>
        </div>
      </footer>
    </main>
  );
}
