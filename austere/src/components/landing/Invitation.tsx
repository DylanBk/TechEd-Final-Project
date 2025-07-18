'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Invitation = () => {
  return (
    <section 
      className="relative min-h-[90vh] bg-charcoal text-warm-limestone flex flex-col items-center justify-center text-center p-6 overflow-hidden"
      style={{ backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.85), rgba(26, 26, 26, 0.95)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}>
      <motion.h2 
        className="text-6xl md:text-8xl font-serif mb-12 tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        Your Legacy, Woven
      </motion.h2>

      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-16">
        <Link href="/shop">
          <motion.button 
            className="w-64 h-16 bg-champagne-gold text-charcoal font-bold text-lg rounded-sm shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(184, 115, 51, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            Enter Shop
          </motion.button>
        </Link>
        <Link href="/request-invitation">
          <motion.button 
            className="w-64 h-16 border-2 border-warm-limestone/50 text-warm-limestone font-bold text-lg rounded-sm bg-transparent"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(248, 246, 240, 0.1)', borderColor: 'rgba(248, 246, 240, 1)' }}
            whileTap={{ scale: 0.98 }}
          >
            Request Invitation
          </motion.button>
        </Link>
      </div>

      <motion.div 
        className="text-center font-sans"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-aged-stone/80 text-sm">Questions? Reach our concierge</p>
        <div className="flex items-center justify-center space-x-4 mt-2 text-warm-limestone/90">
          <a href="mailto:atelier@austere.com" className="hover:text-champagne-gold transition-colors">atelier@austere.com</a>
          <span className="text-aged-stone/50">|</span>
          <a href="tel:+442071234567" className="hover:text-champagne-gold transition-colors">+44 20 7123 4567</a>
        </div>
      </motion.div>
    </section>
  );
};

export default Invitation;
