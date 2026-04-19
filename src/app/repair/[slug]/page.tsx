import type { Metadata } from "next";
import Link from "next/link";

const REPAIRS = [
  { slug: "iphone-17-screen", name: "iPhone 17 Screen Repair", device: "iPhone 17", repair: "Screen Replacement", price: 279, time: "30 min" },
  { slug: "iphone-17-pro-max-screen", name: "iPhone 17 Pro Max Screen Repair", device: "iPhone 17 Pro Max", repair: "Screen Replacement", price: 349, time: "30 min" },
  { slug: "iphone-16-pro-max-screen", name: "iPhone 16 Pro Max Screen Repair", device: "iPhone 16 Pro Max", repair: "Screen Replacement", price: 329, time: "30 min" },
  { slug: "iphone-16-screen", name: "iPhone 16 Screen Repair", device: "iPhone 16", repair: "Screen Replacement", price: 249, time: "30 min" },
  { slug: "iphone-15-pro-max-screen", name: "iPhone 15 Pro Max Screen Repair", device: "iPhone 15 Pro Max", repair: "Screen Replacement", price: 299, time: "30 min" },
  { slug: "iphone-15-screen", name: "iPhone 15 Screen Repair", device: "iPhone 15", repair: "Screen Replacement", price: 229, time: "30 min" },
  { slug: "iphone-14-pro-screen", name: "iPhone 14 Pro Screen Repair", device: "iPhone 14 Pro", repair: "Screen Replacement", price: 269, time: "30 min" },
  { slug: "iphone-13-screen", name: "iPhone 13 Screen Repair", device: "iPhone 13", repair: "Screen Replacement", price: 199, time: "25 min" },
  { slug: "iphone-battery-replacement", name: "iPhone Battery Replacement", device: "iPhone (all models)", repair: "Battery Replacement", price: 89, time: "20 min" },
  { slug: "iphone-camera-repair", name: "iPhone Camera Repair", device: "iPhone (all models)", repair: "Camera Lens Repair", price: 129, time: "30 min" },
  { slug: "samsung-galaxy-s24-screen", name: "Samsung Galaxy S24 Screen Repair", device: "Samsung Galaxy S24", repair: "Screen Replacement", price: 279, time: "45 min" },
  { slug: "samsung-galaxy-s23-screen", name: "Samsung Galaxy S23 Screen Repair", device: "Samsung Galaxy S23", repair: "Screen Replacement", price: 249, time: "45 min" },
  { slug: "macbook-screen-repair", name: "MacBook Screen Repair", device: "MacBook (all models)", repair: "Screen Replacement", price: 499, time: "1-2 days" },
  { slug: "macbook-battery-replacement", name: "MacBook Battery Replacement", device: "MacBook (all models)", repair: "Battery Replacement", price: 199, time: "1 hour" },
  { slug: "ipad-screen-repair", name: "iPad Screen Repair", device: "iPad (all models)", repair: "Screen Replacement", price: 199, time: "45 min" },
];

export function generateStaticParams() {
  return REPAIRS.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const repair = REPAIRS.find((r) => r.slug === params.slug);
  if (!repair) return { title: "Device Repair | ATX Gadget Fix" };
  return {
    title: `${repair.name} in Austin TX | From $${repair.price} | ATX Gadget Fix`,
    description: `${repair.name} starting at $${repair.price}. ${repair.time} turnaround. We come to you in Austin TX. 30-day warranty, no fix no pay. Book in 60 seconds.`,
    openGraph: {
      title: `${repair.name} — From $${repair.price}`,
      description: `${repair.device} ${repair.repair} starting at $${repair.price}. We come to you in Austin TX.`,
      type: "website",
      url: `https://atxgadgetfix.com/repair/${repair.slug}`,
    },
  };
}

export default function RepairPage({ params }: { params: { slug: string } }) {
  const repair = REPAIRS.find((r) => r.slug === params.slug);
  if (!repair) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Repair not found</h1>
          <Link href="/" className="text-[#0071e3] hover:underline">Back to Home</Link>
        </div>
      </main>
    );
  }

  const related = REPAIRS.filter((r) => r.slug !== repair.slug).slice(0, 4);

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span style={{ fontSize: "16px", fontWeight: 700, background: "linear-gradient(90deg, #0071e3, #40a9ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Austin Mobile</span>
            <span style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.08em", color: "#c7c7cc", textTransform: "uppercase" as const }}>Repair</span>
          </Link>
          <Link href="/" className="bg-[#0071e3] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#0077ED] transition">
            Book Repair
          </Link>
        </div>
      </nav>

      <section className="max-w-lg mx-auto px-4 pt-10 pb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#0071e3] text-sm font-semibold mb-6 px-4 py-2 rounded-full bg-white/8 border border-white/15 hover:bg-white/15 transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          All Repairs
        </Link>

        <h1 className="text-3xl font-bold tracking-tight mb-2">{repair.name}</h1>
        <p className="text-[#c7c7cc] text-lg mb-6">
          Starting at <span className="text-[#0071e3] font-bold">${repair.price}</span> — We come to you
        </p>

        <Link href="/" className="block w-full bg-[#0071e3] text-white py-5 rounded-2xl text-xl font-bold text-center hover:bg-[#0077ED] transition shadow-lg shadow-[#0071e3]/20 mb-8">
          Book This Repair
        </Link>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-[#0071e3] text-lg font-bold">${repair.price}</p>
            <p className="text-[#c7c7cc] text-[10px]">Starting at</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-white text-lg font-bold">{repair.time}</p>
            <p className="text-[#c7c7cc] text-[10px]">Turnaround</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-white text-lg font-bold">30 Day</p>
            <p className="text-[#c7c7cc] text-[10px]">Warranty</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold mb-4">How It Works</h2>
          <div className="space-y-4">
            {[
              { num: "1", title: "Book Online", desc: "Select your device and issue — takes 60 seconds." },
              { num: "2", title: "We Come to You", desc: "A certified technician arrives at your location in Austin." },
              { num: "3", title: "Fixed on the Spot", desc: `${repair.repair} completed in ${repair.time}. No fix, no pay.` },
            ].map((s) => (
              <div key={s.num} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0071e3]/15 flex items-center justify-center shrink-0">
                  <span className="text-[#0071e3] text-sm font-bold">{s.num}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{s.title}</p>
                  <p className="text-[#c7c7cc] text-xs">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold mb-3">Why Choose ATX Gadget Fix?</h2>
          <ul className="space-y-2 text-sm text-[#c7c7cc]">
            <li className="flex items-start gap-2"><span className="text-[#0071e3]">✓</span> We come to your home, office, or any location</li>
            <li className="flex items-start gap-2"><span className="text-[#0071e3]">✓</span> Certified technicians with genuine parts</li>
            <li className="flex items-start gap-2"><span className="text-[#0071e3]">✓</span> 30-day warranty on all repairs</li>
            <li className="flex items-start gap-2"><span className="text-[#0071e3]">✓</span> No fix, no pay guarantee</li>
            <li className="flex items-start gap-2"><span className="text-[#0071e3]">✓</span> Same-day service available</li>
          </ul>
        </div>

        {related.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3">Other Repairs</h2>
            <div className="grid grid-cols-1 gap-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/repair/${r.slug}`} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition">
                  <span className="text-white text-sm font-medium">{r.name}</span>
                  <span className="text-[#0071e3] text-sm font-bold">${r.price}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link href="/" className="block w-full bg-[#0071e3] text-white py-4 rounded-2xl text-base font-bold text-center hover:bg-[#0077ED] transition mb-4">
          Book {repair.repair} Now
        </Link>

        <p className="text-center text-[#c7c7cc]/60 text-xs">
          Or call: <a href="tel:+15129609256" className="text-[#0071e3] hover:underline">(512) 960-9256</a>
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": repair.name,
            "description": `${repair.name} starting at $${repair.price}. We come to you in Austin TX.`,
            "provider": {
              "@type": "LocalBusiness",
              "name": "ATX Gadget Fix",
              "address": { "@type": "PostalAddress", "addressLocality": "Austin", "addressRegion": "TX" },
              "telephone": "(512) 960-9256",
            },
            "areaServed": { "@type": "City", "name": "Austin" },
            "offers": {
              "@type": "Offer",
              "price": repair.price,
              "priceCurrency": "USD",
            },
          }),
        }}
      />
    </main>
  );
}
