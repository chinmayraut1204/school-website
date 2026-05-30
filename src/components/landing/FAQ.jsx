import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const faqData = [
  {
    question: 'Is my donation tax-deductible under government regulations?',
    answer: 'Yes! All financial contributions to our Government Model School are processed through our registered NGO trust and are 100% eligible for tax exemption under Section 80G of the Income Tax Act. A formal tax receipt is emailed to you instantly upon payment.'
  },
  {
    question: 'How do you ensure the audit transparency of the donation funds?',
    answer: 'We maintain absolute financial transparency. 100% of donor funds go directly to specific projects (e.g. tablet procurement, library desks, meal programs). Our financial statements are audited annually by certified independent CAs, and audit logs are published publicly on our portal.'
  },
  {
    question: 'Can I sponsor a specific student\'s education or scholarship?',
    answer: 'Absolutely! Our "Girls & Merit Scholarships" program allows you to sponsor the full-year costs (uniforms, textbooks, and tutorial support) of targeted high-performing or underprivileged students for ₹5,000 annually. You will receive quarterly academic progress sheets of your sponsored student.'
  },
  {
    question: 'Can I donate physical items like computer monitors, tables, or schoolbooks?',
    answer: 'Yes, we gladly welcome high-quality physical donations such as working keyboards, tablets, library books, science apparatus, or laboratory desks. Please fill out our contact form or call the school principal office directly to schedule a delivery.'
  },
  {
    question: 'Is there a minimum or maximum limit for online contributions?',
    answer: 'There are no limits! You can contribute as little as ₹10 to help buy midday nutrition, or sponsor major infrastructure projects. Every rupee counts toward providing a secure, modernized education for rural children.'
  }
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIdx(prev => (prev === idx ? null : idx));
  };

  return (
    <section 
      id="faq" 
      className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">
            Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto mb-6 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Have questions about tax certificates, donation routing, or volunteering? Browse our common answers below or get in touch.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <GlassCard
                key={idx}
                hoverEffect={false}
                glowColor="rgba(99, 102, 241, 0.1)"
                className={`transition-all duration-300 text-left border ${
                  isOpen 
                    ? 'border-indigo-500/30 dark:border-indigo-500/35 bg-white/90 dark:bg-slate-900/80 shadow-md' 
                    : 'border-slate-200/50 dark:border-slate-800/40 bg-white/60 dark:bg-slate-900/40'
                }`}
                animate={false}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className={`w-5 h-5 transition-colors flex-shrink-0 ${
                      isOpen ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'
                    }`} />
                    <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-xl transition-colors ${
                    isOpen 
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800/60 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
