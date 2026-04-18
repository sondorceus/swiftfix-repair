import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ATX Gadget Fix",
  description: "Privacy Policy for ATX Gadget Fix — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: April 18, 2026</p>

      <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">1. Information We Collect</h2>
          <p>When you use ATX Gadget Fix, we may collect:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Contact information</strong> — name, email, phone number provided through booking or chat</li>
            <li><strong>Device details</strong> — model, issue description for your repair request</li>
            <li><strong>Usage data</strong> — pages visited and interactions, collected via Google Analytics (GA4)</li>
            <li><strong>Chat messages</strong> — messages sent through our on-site chat widget</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>To schedule and complete your repair service</li>
            <li>To contact you about your repair status</li>
            <li>To improve our website and services</li>
            <li>To analyze site traffic and usage patterns</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">3. Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Google Analytics</strong> — for anonymous website usage analysis</li>
            <li><strong>Payment processors</strong> — to complete your repair payment</li>
            <li><strong>Service providers</strong> — that help us operate our website and business</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">4. Cookies</h2>
          <p>We use cookies and similar technologies to analyze traffic and improve your experience. Google Analytics uses cookies to collect anonymous usage data. You can control cookies through your browser settings.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">5. Data Retention</h2>
          <p>We retain your contact information and repair records for up to 12 months after your last interaction. Analytics data is retained according to Google Analytics default settings (14 months).</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Request access to your personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of analytics tracking</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">7. Security</h2>
          <p>We use industry-standard security measures to protect your data, including HTTPS encryption and secure data storage.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">8. Contact</h2>
          <p>For privacy-related questions or requests, contact us at:</p>
          <p className="mt-2">ATX Gadget Fix<br />Austin, TX<br />Phone: <a href="tel:+15129609256" className="text-green-400 hover:underline">(512) 960-9256</a></p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-white/10">
        <a href="/" className="text-sm text-green-400 hover:underline">&larr; Back to Home</a>
      </div>
    </main>
  );
}
