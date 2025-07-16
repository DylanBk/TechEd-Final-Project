'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    quote: "It's not just a suit. It's a statement of intent, understood without a word.",
    author: "A Founder, Monaco",
  },
  {
    quote: "The silhouette is architectural. The feeling is... sovereign. They've captured power in fabric.",
    author: "An Architect, London",
  },
  {
    quote: "In a world of noise, Austere is a confident whisper. It doesn't shout; it simply is.",
    author: "A Gallerist, Milan",
  },
];

const SocialProof = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 7000); // Change testimonial every 7 seconds
    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[index];

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.04,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section 
      className="relative bg-charcoal text-warm-limestone py-24 px-6 md:px-12 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(18, 18, 18, 0.95), rgba(18, 18, 18, 0.95)),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
        `,
        backgroundBlendMode: 'multiply',
      }}
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Testimonials */}
        <div className="lg:pr-8">
          <motion.h2 
            className="text-4xl font-serif mb-12 text-warm-copper"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            Whispers of Austere
          </motion.h2>
          
          <div className="h-48">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.p 
                  className="text-2xl md:text-3xl font-serif leading-snug"
                  variants={sentence}
                  initial="hidden"
                  animate="visible"
                >
                  {currentTestimonial.quote.split("").map((char, i) => (
                    <motion.span key={char + "-" + i} variants={letter}>
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
                <p className="mt-6 text-right text-aged-stone font-sans opacity-80">
                  - {currentTestimonial.author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Imagery */}
        <div className="relative h-[600px] mt-12 lg:mt-0">
          <motion.div 
            className="absolute top-0 left-0 w-3/5 h-2/3 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image src="/woman-on-yacht.png" alt="A woman in a designer gown on a luxury yacht at golden hour" layout="fill" objectFit="cover" className="rounded-sm" />
          </motion.div>
          <motion.div 
            className="absolute bottom-0 right-0 w-1/2 h-3/5 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Image src="/woman-in-villa.png" alt="A woman in a designer gown looking out from a modern cliffside villa" layout="fill" objectFit="cover" className="rounded-sm" />
          </motion.div>
          <motion.div 
            className="absolute bottom-1/4 left-1/2 w-1/3 h-1/3 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Image src="/social/social-3.jpg" alt="A woman in a powerful tailored outfit" layout="fill" objectFit="cover" className="rounded-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
