'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PhilosophyStatement = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  const quoteLines = [
    "Each thread tells a story.",
    "Each cut speaks of intention.",
    "Each garment becomes a legacy."
  ];

  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.4,
        duration: 0.8,
        ease: 'easeOut'
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] bg-warm-limestone flex flex-col items-center justify-center text-center overflow-hidden px-6 md:px-[180px]"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url('/philosophy-overhead.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: bgY 
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />

      <div className="relative z-20">
        <div className="max-w-[680px]">
          {quoteLines.map((line, i) => (
            <motion.h2
              key={i}
              custom={i}
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-warm-limestone mb-4"
              style={{ textShadow: '2px 2px 15px rgba(0,0,0,0.7)' }}
            >
              {line}
            </motion.h2>
          ))}
        </div>
        
        <motion.p 
          className="max-w-2xl text-aged-stone leading-relaxed mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          From the ateliers of Milano to the coastal workshops of the Mediterranean, we honor centuries of European craftsmanship. Each piece begins not as manufacture, but as dialogue between your vision and our artisans' generational wisdom.
        </motion.p>
      </div>
    </section>
  );
};

export default PhilosophyStatement;
