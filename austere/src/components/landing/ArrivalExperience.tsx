'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ArrivalExperience = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-charcoal text-white">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-yacht.png')" }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.42, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 bg-black opacity-32" />
      <div 
        className="absolute inset-0 opacity-22"
        style={{ backgroundImage: `radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.68))` }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.92, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src="/austere-logo.png" alt="Austere Logo" width={180} height={50} className="invert" />
        </motion.div>

        <motion.div
          className="text-left"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.98, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-7xl md:text-8xl font-serif leading-none tracking-tighter text-warm-limestone" style={{ letterSpacing: '-0.018em' }}>
            Exceed<br />
            Excellence
          </h1>
          <p className="mt-4 text-lg text-aged-stone font-sans">Crafted for the Few.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ArrivalExperience;
