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
        title="Contact Us" 
        description="Get in touch with News More for consultancy, collaborations, or general inquiries." 
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
      </div>
    </>
  );
}
