import { motion } from "motion/react";
import { Shield, Lock, Eye, Scale } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 text-orange-500 text-xs font-bold uppercase tracking-widest mb-4">
            <Shield size={16} /> Legal Documentation
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 italic">
            Privacy <span className="text-zinc-500">Policy</span>
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed">
            Last updated: May 5, 2026. Your privacy is paramount to News More. This policy outlines how we handle your data with transparency and integrity.
          </p>
        </motion.div>

        <div className="prose prose-invert prose-orange max-w-none space-y-12 text-zinc-400">
          <section>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Eye className="text-orange-500" /> 1. Data Collection
            </h2>
            <p>
              We collect information that you provide directly to us, such as when you subscribe to our newsletter, contact us via email, or use our AI ChatBot features. This may include your name, email address, and any feedback you provide. We do not sell this data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Lock className="text-orange-500" /> 2. Use of Information
            </h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services (including market data accuracy).</li>
              <li>Respond to your comments, questions, and requests.</li>
              <li>Send you technical notices, updates, and security alerts.</li>
              <li>Analyze trends and usage to enhance the user experience on News More.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Scale className="text-orange-500" /> 3. Advertising and Analytics
            </h2>
            <p>
              We use Google AdSense to serve advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline">Google Ads Settings</a>.
            </p>
            <p>
              Cookies help us understand how you interact with our market charts and blog content, allowing us to prioritize the technical guides that the community finds most valuable.
            </p>
          </section>

          <section className="p-8 bg-zinc-900/50 rounded-3xl border border-white/5">
            <h3 className="text-white font-bold mb-4">Contact Information</h3>
            <p className="text-sm">
              If you have any questions about this Privacy Policy, please reach out to our legal team at <span className="text-orange-500">info.axelionscale@gmail.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
