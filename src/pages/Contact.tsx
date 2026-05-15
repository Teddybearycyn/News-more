import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import SEO from "../components/SEO.tsx";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send the data here
  };

  return (
    <>
      <SEO 
        title="Contact Our Experts" 
        description="Get in touch with News More Expert for technical consultancy, professional collaborations, or general inquiries. We are here to help you scale." 
        canonical="/contact"
        keywords={["contact News More", "tech consultancy", "freelance help", "professional collaboration"]}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl md:text-8xl font-display font-medium leading-tight mb-12">
              Let's <br /><span className="text-orange-500 italic">Collaborate.</span>
            </h1>
            <p className="text-xl text-white/50 leading-relaxed mb-12 max-w-md">
              Have a question or a project in mind? We're always open to discussing new opportunities and providing technical expertise.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 border border-white/10 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-white/40 mb-2">Email Address</h4>
                  <a href="mailto:info.axelionscale@gmail.com" className="text-xl hover:text-orange-500 transition-colors">
                    info.axelionscale@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 border border-white/10 flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-white/40 mb-2">Location</h4>
                  <div className="text-xl text-white/80">Worldwide • Remote First</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-orange-600/5 blur-[120px] rounded-full -z-10" />
            
            <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8 md:p-12">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <CheckCircle size={80} className="text-orange-500 mx-auto mb-8" />
                  <h2 className="text-3xl font-display font-medium mb-4">Message Sent!</h2>
                  <p className="text-white/50">We'll get back to you at info.axelionscale@gmail.com as soon as possible.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-orange-500 font-bold uppercase tracking-widest text-sm"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Email</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Subject</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Consultancy Inquiry" 
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Message</label>
                    <textarea 
                      required 
                      rows={6}
                      placeholder="Tell us about your project..." 
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all"
                  >
                    Send Message <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Added Section for AdSense Content Compliance */}
        <div className="mt-40 pt-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">Consultancy & <span className="text-orange-500">Service Framework.</span></h2>
            <p className="text-white/40 leading-relaxed">
              We provide high-impact technical advisory for growing digital entities. Our communication process is streamlined to ensure maximum efficiency for both our analysts and our partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto px-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">How much does a technical audit cost?</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Every project is unique. We provide custom quotes based on the architectural complexity and depth of analysis required. Initial consultations are always dedicated to understanding your specific 2026 growth goals.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Do you offer 24/7 technical support?</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                We specialize in strategic engineering and architecture. For ongoing operations support, we help you build and train internal teams or connect you with verified institutional partners in our network.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">What is your typical turnaround time?</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                For standard technical consultations, we aim to deliver preliminary findings within 72 hours of receiving the project brief and necessary system access.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Confidentiality & Non-Disclosure</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                We operate under strict professional confidentiality. Mutual NDAs are standard practice for all consultancy engagements to protect your proprietary IP and strategic initiatives.
              </p>
            </div>
          </div>

          <div className="mt-20 p-10 bg-orange-600/5 border border-orange-500/10 rounded-[40px] text-center max-w-3xl mx-auto">
            <p className="text-white/70 text-sm italic">
              "We believe that clear, professional communication is the foundation of scalable technical success. Whether you are a solo-founder or a growing enterprise, we bring the same level of integrity to every interaction."
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
