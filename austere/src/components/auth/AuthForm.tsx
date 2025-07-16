'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AuthForm = ({ mode }: { mode: 'login' | 'signup' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="relative h-screen overflow-hidden bg-charcoal text-white flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-yacht.png')" }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7))` }}
      />

      <motion.div 
        className="relative z-10 bg-black bg-opacity-30 p-8 rounded-lg shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="flex justify-center mb-6">
          <Image src="/austere-logo.png" alt="Austere Logo" width={150} height={40} className="invert" />
        </div>
        <h2 className="text-3xl font-serif text-center text-warm-limestone mb-6">
          {mode === 'login' ? 'Welcome Back' : 'Join the Waitlist'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-aged-stone">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full bg-white bg-opacity-10 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-warm-limestone focus:border-warm-limestone"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-aged-stone">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full bg-white bg-opacity-10 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-warm-limestone focus:border-warm-limestone"
              required
            />
          </div>
          {mode === 'signup' && (
            <div>
              <label htmlFor="referralCode" className="block text-sm font-medium text-aged-stone">Referral Code (Optional)</label>
              <input
                type="text"
                id="referralCode"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="mt-1 block w-full bg-white bg-opacity-10 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-warm-limestone focus:border-warm-limestone"
              />
            </div>
          )}
          <button 
            type="submit"
            className="w-full bg-warm-limestone text-charcoal py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default AuthForm;
