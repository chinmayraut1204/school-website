import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, DollarSign, Gift, Check, ShieldCheck, User, Mail, MessageSquare } from 'lucide-react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import Button from '../common/Button';
import GlassCard from '../common/GlassCard';
import confetti from 'canvas-confetti';

const presetAmounts = [500, 1000, 2500, 5000];

const Donation = () => {
  const { totalRaised, donationGoal, addDonation, totalDonationsCount } = useSchoolData();
  const { showToast } = useToast();

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMsg, setDonorMsg] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const percentRaised = Math.min(Math.round((totalRaised / donationGoal) * 100), 100);

  const handleAmountSelect = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d+$/.test(val)) {
      setCustomAmount(val);
      setSelectedAmount(null);
    }
  };

  const getFinalAmount = () => {
    if (selectedAmount !== null) return selectedAmount;
    return customAmount ? parseInt(customAmount, 10) : 0;
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    const finalAmount = getFinalAmount();

    if (finalAmount <= 0) {
      showToast('Please select or enter a valid donation amount', 'error');
      return;
    }

    if (!donorName.trim()) {
      showToast('Please enter your name', 'error');
      return;
    }

    if (!donorEmail.trim() || !/\S+@\S+\.\S+/.test(donorEmail)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate Payment Gateway Delay
    setTimeout(() => {
      const added = addDonation({
        name: donorName,
        email: donorEmail,
        amount: finalAmount,
        message: donorMsg || 'Wishing you the best!',
        category: 'General Infrastructure'
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      showToast(`Thank you, ${donorName}! Contribution of ₹${finalAmount.toLocaleString()} received.`, 'success');
      
      // Trigger premium celebration confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 2000);
  };

  const handleReset = () => {
    setDonorName('');
    setDonorEmail('');
    setDonorMsg('');
    setSelectedAmount(1000);
    setCustomAmount('');
    setPaymentMethod('UPI');
    setIsSuccess(false);
  };

  return (
    <section 
      id="donation" 
      className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-indigo-200/20 dark:bg-indigo-900/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-emerald-200/20 dark:bg-emerald-900/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">
            Make a Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Support Our Learning Initiatives
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto mb-6 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Every contribution directly provides school infrastructure, digital library tablets, midday meals, and student uniform sponsorships. 100% of funds reach school accounts directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Left Column: Progress Tracker */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <GlassCard hoverEffect={false} className="p-8 bg-slate-900 text-white border-indigo-950">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Gift className="w-5 h-5 text-indigo-400" />
                Donation Progress
              </h3>

              {/* Progress visual */}
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Raised</span>
                  <span className="text-2xl font-black text-emerald-400">₹{totalRaised.toLocaleString()}</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentRaised}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{percentRaised}% of goal</span>
                  <span>Goal: ₹{donationGoal.toLocaleString()}</span>
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Contributors</span>
                  <span className="text-xl font-bold text-slate-100">{totalDonationsCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Tax Exemption</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Sec 80G Tax Free
                  </span>
                </div>
              </div>
            </GlassCard>

            {/* Impact details card */}
            <GlassCard hoverEffect={false} className="p-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">What Your Money Buys:</h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <span><strong>₹500</strong>: Sponsors fresh midday meals for one student for a whole month.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <span><strong>₹1,000</strong>: Procures a kit of textbooks, notebooks, schoolbags, and stationery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <span><strong>₹2,500</strong>: Funds one desktop computer keyboard/mouse and digital learning software.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <span><strong>₹5,000</strong>: Full annual scholarship sponsoring academic coaching and uniform sets for a girl student.</span>
                </li>
              </ul>
            </GlassCard>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7">
            <GlassCard hoverEffect={false} className="p-8">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleDonateSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 text-left"
                  >
                    {/* Amount selector */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 block">
                        Select Contribution Amount (₹)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                        {presetAmounts.map((amt) => (
                          <button
                            type="button"
                            key={amt}
                            onClick={() => handleAmountSelect(amt)}
                            className={`
                              py-3 rounded-2xl text-sm font-bold border transition-all duration-300
                              ${selectedAmount === amt
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }
                            `}
                          >
                            ₹{amt}
                          </button>
                        ))}
                      </div>
                      
                      {/* Custom Amount */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          ₹
                        </div>
                        <input
                          type="text"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          placeholder="Enter Custom Amount"
                          className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Donor Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Chinmay"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            required
                            placeholder="e.g. name@domain.com"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Donor Message */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                        Message / Blessing (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute top-3.5 left-4 pointer-events-none text-slate-400">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          placeholder="Leave a short encouraging message for the children..."
                          value={donorMsg}
                          onChange={(e) => setDonorMsg(e.target.value)}
                          rows="2"
                          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* Payment Gateways Selection */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 block">
                        Choose Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['UPI', 'Card', 'Netbanking'].map((method) => (
                          <button
                            type="button"
                            key={method}
                            onClick={() => setPaymentMethod(method)}
                            className={`
                              py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all duration-300
                              ${paymentMethod === method
                                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                              }
                            `}
                          >
                            {paymentMethod === method && <Check className="w-3.5 h-3.5" />}
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="w-full text-white font-extrabold flex justify-center items-center shadow-lg"
                      glow
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing Securely...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          Confirm Donation of ₹{getFinalAmount().toLocaleString()}
                        </span>
                      )}
                    </Button>

                    <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                      128-bit SSL encrypted. Secure transaction gateway.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">Transaction Success!</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                        Your kind donation of <strong>₹{getFinalAmount().toLocaleString()}</strong> has been added to our campus funds. A receipt has been dispatched to <strong>{donorEmail}</strong>.
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 text-left max-w-sm mx-auto">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Your Impact:</span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        "Your contribution will assist in building high-performance modern library resources."
                      </p>
                    </div>

                    <div className="flex gap-4 max-w-xs mx-auto pt-2">
                      <Button variant="outline" size="md" onClick={handleReset} className="w-full">
                        Donate Again
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
