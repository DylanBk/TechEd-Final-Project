'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants, Easing } from 'framer-motion';

const columnVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HeritageNarrative = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '28%']);

  return (
    <section ref={ref} className="relative bg-charcoal text-white overflow-hidden">
      <div className="relative h-[72vh] z-0">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/atelier-workshop.jpg')",
            filter: 'grayscale(92%)',
            y 
          }}
        />
        <div className="absolute inset-0 bg-charcoal/65 flex items-center justify-center">
          <motion.h2 
            className="text-5xl md:text-7xl font-serif text-warm-limestone tracking-wider"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.98, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            Milano → London → You
          </motion.h2>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-12 py-24">
        {[{
          title: 'The Origins',
          text: 'Our story begins in the heart of 1960s Milan, where a small group of master tailors dedicated themselves to a singular vision: crafting garments that were not merely worn, but experienced. This was a time of artisanal purity, where every stitch was a testament to a legacy of quality.',
        }, {
          title: 'The Evolution',
          text: 'As the world changed, so did we. We embraced innovation not as a replacement for tradition, but as its partner. Today, our artisans\' generational wisdom is augmented by cutting-edge technology, allowing for a level of precision and personalization previously unimaginable.',
        }, {
          title: 'The Future',
          text: 'The future of luxury is not about owning, but about creating. We are transforming personal style into a data-driven art form, where your unique preferences and our sartorial expertise converge to create something truly singular. This is your opportunity to design your legacy.',
        }].map((col, i) => (
          <motion.div 
            key={col.title} 
            custom={i} 
            variants={columnVariant} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.28 }}
          >
            <h3 className="text-2xl font-serif text-warm-copper mb-4 border-b border-warm-copper/18 pb-2">{col.title}</h3>
            <p className="text-aged-stone font-sans leading-relaxed">
              {col.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeritageNarrative;
