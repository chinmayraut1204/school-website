import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import { useToast } from '../../context/ToastContext';
import { useSchoolData } from '../../context/SchoolDataContext';

const Contact = () => {
  const { showToast } = useToast();
  const { schoolContact } = useSchoolData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !msg.trim()) {
      showToast('Please fill out all the fields.', 'error');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      showToast('Message sent successfully! Our administrative office will email you soon.', 'success');
      setName('');
      setEmail('');
      setMsg('');
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Contact Our Administrative Office
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto mb-6 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Have questions about physical donation drops, custom sponsorships, CSR partnerships, or student enrollment? Send us an inquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Column: Form & Info */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <GlassCard hoverEffect={false} className="p-8">
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Send a Direct Message</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Chinmay"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. user@domain.com"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                      Message
                    </label>
                    <textarea
                      required
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Write your query details here..."
                      rows="4"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full font-bold flex justify-center items-center gap-1.5"
                    glow
                    disabled={submitting}
                  >
                    {submitting ? (
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Inquiry
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Dispatched!</h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                      Thank you for contacting us. We appreciate your interest and will coordinate back to you at <strong>{email}</strong> within 2 business days.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSuccess(false)}>
                    Send Another Message
                  </Button>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Right Column: Address Map & Contacts */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <GlassCard hoverEffect={false} className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Contact Directory</h3>
                
                <div className="space-y-4">
                  <a 
                    href="https://maps.app.goo.gl/fxbLdHor1ciro2hv9" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-start gap-4 hover:opacity-80 transition-opacity"
                  >
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Location</span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 underline decoration-dotted decoration-indigo-500/50">
                        {schoolContact.address}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Phone Line</span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                        +91 {schoolContact.phone} (9 AM - 4 PM)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Trust & School Desk</span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {schoolContact.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder with stylings */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-40 relative group shadow-inner">
                {/* Embed modern stylized iframe maps placeholder */}
                <iframe
                  title="School Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.5350447305923!2d73.2114948!3d19.9860467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be74309859ef223%3A0x6f12719ba6677412!2sEklavya%20Primary%2C%20Secondary%20and%20Higher%20secondary%20Ashramschool%20Hiradpada!5e0!3m2!1sen!2sin!4v1717408000000!5m2!1sen!2sin"
                  className="w-full h-full border-none filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>


            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
