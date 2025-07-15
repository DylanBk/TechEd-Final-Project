'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PortraitOfPower = () => {
  return (
    <section className="relative py-24 bg-charcoal overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
        {/* Image Column */}
        <motion.div 
          className="w-full md:w-1/2 h-[70vh] relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <Image 
            src="/hero-portrait.png" 
            alt="A powerful portrait embodying the Austere ethos"
            layout="fill"
            objectFit="cover"
            className="rounded-sm filter grayscale contrast-125"
          />
        </motion.div>

        {/* Text Column */}
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-serif text-warm-limestone leading-tight">
            The Individual,<br />Redefined.
          </h2>
          <p className="mt-6 text-lg text-aged-stone max-w-md">
            Austere is not worn; it is inhabited. A second skin that articulates not just style, but a philosophy of quiet power and deliberate presence.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PortraitOfPower;
