import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const testimonials = [
  {
    id: 't-1',
    name: 'Sunita Devi',
    role: 'Parent of Grade 9 Student',
    quote: 'The digital classrooms and coding training have completely transformed my daughter\'s perspective. She now comes home eager to study, and has even taught me how to operate computer systems!',
    rating: 5,
  },
  {
    id: 't-2',
    name: 'Rajesh Yadav',
    role: 'Alumnus (Class of 2024)',
    quote: 'Thanks to the scholarship donations, I was able to purchase my study materials and focus entirely on state exams. Today, I am pursuing my software diploma at the State Polytechnic College.',
    rating: 5,
  },
  {
    id: 't-3',
    name: 'Aniket Rawat',
    role: 'Grade 10 Student',
    quote: 'Experiencing practical science sessions in the physics and chemistry labs helped me fall in love with engineering. Having actual testing kits makes learning so much more exciting than reading textbooks.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    setActiveIdx(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-slate-900 text-white transition-colors duration-500 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[35vw] h-[35vw] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3 block">
            Impact Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Hear from Parents & Students
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            The best measure of our success is the voice of the community we serve. Discover how your donations are impacting lives on the ground.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="max-w-3xl mx-auto relative px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <GlassCard 
                hoverEffect={false}
                glowColor="rgba(16, 185, 129, 0.15)"
                className="p-8 sm:p-12 text-center bg-slate-800/20 border-slate-800/80 relative"
                animate={false}
              >
                {/* Quote Icon Background decoration */}
                <Quote className="absolute top-6 left-6 w-16 h-16 opacity-5 text-indigo-400" />
                
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[activeIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-lg sm:text-xl font-medium leading-relaxed text-slate-200 mb-8 italic">
                  "{testimonials[activeIdx].quote}"
                </p>

                <div>
                  <h4 className="text-base font-extrabold text-white">
                    {testimonials[activeIdx].name}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mt-1">
                    {testimonials[activeIdx].role}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-300 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${activeIdx === idx ? 'w-6 bg-emerald-400' : 'bg-slate-700'}
                  `}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-300 focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
