'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const StoneInput = ({ ...props }) => (
  <input
    className="w-full p-4 bg-charcoal border border-aged-stone/30 rounded-sm placeholder-aged-stone/50 text-warm-limestone focus:outline-none focus:border-warm-copper transition-shadow duration-300 shadow-inner-stone focus:shadow-inner-copper"
    {...props}
  />
);

const standards = [
  {
    value: 120,
    title: "Annual Commissions",
    description: "A strict limit to preserve the sanctity of our craft and the uniqueness of each creation.",
    suffix: ''
  },
  {
    value: 72,
    title: "Artisan Hours",
    description: "The minimum time dedicated by our master artisans to a single garment, ensuring peerless quality.",
    suffix: '+'
  },
  {
    value: 90,
    title: "European Sourced",
    description: "Over 90% of our materials are sourced from heritage European mills and tanneries.",
    suffix: '%'
  }
];

const ExclusivityRevelation = () => {
  return (
    <section 
      className="relative min-h-screen bg-charcoal text-white py-24 px-6 md:px-12 overflow-hidden"
      style={{ 
        backgroundImage: `
          linear-gradient(to bottom, rgba(15, 20, 25, 0.95), rgba(26, 26, 26, 0.98)), 
          repeating-linear-gradient(45deg, rgba(255,255,255,0.01), rgba(255,255,255,0.01) 1px, transparent 1px, transparent 5px)
        ` 
      }}
    >
      <div className="container mx-auto md:grid md:grid-cols-5 md:gap-16 items-center">
        {/* Left Column */}
        <div className="md:col-span-3">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-serif mb-12 text-warm-copper">The Austere Standard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {standards.map((standard, i) => (
                <motion.div 
                  key={standard.title}
                  className="text-center p-6 border border-aged-stone/10 rounded-sm bg-black/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <p className="text-6xl font-mono text-warm-copper">
                    <CountUp end={standard.value} duration={2.5} suffix={standard.suffix} enableScrollSpy scrollSpyOnce />
                  </p>
                  <h3 className="text-lg font-sans mt-3 text-warm-limestone">{standard.title}</h3>
                  <p className="text-sm text-aged-stone mt-2">{standard.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 mt-16 md:mt-0">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-serif mb-8 text-warm-copper">Gain Access</h2>
            <form className="space-y-6">
              <StoneInput type="text" placeholder="Full Name" />
              <StoneInput type="email" placeholder="Email Address" />
              <motion.button 
                type="submit" 
                className="w-full p-4 bg-warm-copper text-charcoal font-bold rounded-sm transition-transform"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Request Invitation
              </motion.button>
            </form>
            <p className="mt-8 text-aged-stone text-center text-sm">Refer a fellow connoisseur, advance your position.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExclusivityRevelation;
