'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const StoneInput = ({ ...props }) => (
  <input
    className="w-full p-4 bg-charcoal border border-aged-stone/30 rounded-sm placeholder-aged-stone/50 text-warm-limestone focus:outline-none focus:border-warm-copper transition-shadow duration-300 shadow-inner-stone focus:shadow-inner-copper"
    {...props}
  />
);

export default function RequestInvitation() {
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    if (submitted && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (submitted && countdown === 0) {
      router.push('/');
    }
  }, [submitted, countdown, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your API
    // For now, we'll just simulate a submission
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-charcoal text-warm-limestone flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Request Received</h2>
          <p className="text-aged-stone text-lg max-w-md mx-auto mb-6">
            Thank you for your interest in Austere. We will review your request and contact you shortly.
          </p>
          <p className="text-warm-copper">
            Returning to home page in {countdown} seconds...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-warm-limestone flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-center">Request an Invitation</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <StoneInput 
                type="text" 
                placeholder="Full Name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div>
              <StoneInput 
                type="email" 
                placeholder="Email Address" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <motion.button 
              type="submit"
              className="w-full p-4 bg-warm-copper text-charcoal font-bold rounded-sm transition-transform"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Request
            </motion.button>
          </form>
          <p className="mt-8 text-aged-stone text-center text-sm">
            By submitting, you agree to be contacted about exclusive Austere offerings.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 