'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // In a real application, you would verify the payment status with Stripe here
        setLoading(false);
      } catch (err) {
        setError('Unable to verify payment status');
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      setError('Invalid session');
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal text-warm-limestone flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-serif"
        >
          Confirming Your Order...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-charcoal text-warm-limestone flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-6">An Error Occurred</h2>
          <p className="text-aged-stone/80 mb-8">{error}</p>
          <Link
            href="/shop"
            className="text-warm-copper hover:text-warm-limestone transition-colors"
          >
            Return to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-warm-limestone flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center"
      >
        <h1 className="text-5xl font-serif mb-8">Thank You for Your Order</h1>
        
        <div className="space-y-6 mb-12">
          <p className="text-aged-stone/80 text-lg leading-relaxed">
            Your bespoke item has been confirmed. Our artisans will begin crafting your piece with the utmost attention to detail and dedication to excellence.
          </p>
          
          <div className="border-t border-aged-stone/30 pt-6">
            <h3 className="text-2xl font-serif mb-4">What Happens Next?</h3>
            <ul className="text-aged-stone/80 space-y-4 text-left">
              <li className="flex items-start">
                <span className="text-warm-copper mr-4">1.</span>
                You will receive an email confirmation of your order within the next few minutes.
              </li>
              <li className="flex items-start">
                <span className="text-warm-copper mr-4">2.</span>
                Our team will contact you within 24-48 hours to arrange final measurements and discuss any specific requirements.
              </li>
              <li className="flex items-start">
                <span className="text-warm-copper mr-4">3.</span>
                We will provide regular updates on the crafting process of your bespoke item.
              </li>
            </ul>
          </div>
        </div>

        <Link
          href="/shop"
          className="inline-block bg-warm-copper text-charcoal px-8 py-3 rounded-sm font-bold"
        >
          Explore More Pieces
        </Link>
      </motion.div>
    </div>
  );
} 