'use client';

import React from 'react';
import { useActionState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type props = {
  mode: 'login' | 'signup';
  step: (prevState: any, formData: FormData) => Promise<any>;
};

const AuthForm = ({ mode, step }: props) => {
  const [state, action, pending] = useActionState(step, undefined);

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

        <form className="space-y-6" action={action}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-aged-stone">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full bg-white bg-opacity-10 border border-gray-600 rounded-md py-2 px-3 text-black focus:outline-none focus:ring-warm-limestone focus:border-warm-limestone"
              required
            />
            {state?.errors?.name && <p className="text-red-400 text-sm mt-1">{state.errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-aged-stone">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full bg-white bg-opacity-10 border border-gray-600 rounded-md py-2 px-3 text-black focus:outline-none focus:ring-warm-limestone focus:border-warm-limestone"
              required
            />
            {state?.errors?.email && <p className="text-red-400 text-sm mt-1">{state.errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-aged-stone">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full bg-white bg-opacity-10 border border-gray-600 rounded-md py-2 px-3 text-black focus:outline-none focus:ring-warm-limestone focus:border-warm-limestone"
              required
            />
            {state?.errors?.password && <p className="text-red-400 text-sm mt-1">{state.errors.password}</p>}
          </div>

          {mode === 'signup' && (
            <div>
              <label htmlFor="referralCode" className="block text-sm font-medium text-aged-stone">Referral Code (Optional)</label>
              <input
                type="text"
                id="referralCode"
                name="referralCode"
                className="mt-1 block w-full bg-white bg-opacity-10 border border-gray-600 rounded-md py-2 px-3 text-black focus:outline-none focus:ring-warm-limestone focus:border-warm-limestone"
              />
              {state?.errors?.referralCode && <p className="text-red-400 text-sm mt-1">{state.errors.referralCode}</p>}
            </div>
          )}

          {/* General and message errors */}
          {Array.isArray(state?.errors?.general) &&
            state.errors.general.map((msg: string, i: number) => (
              <p key={i} className="text-red-400 text-sm mt-2">{msg}</p>
            ))}
          {typeof state?.errors?.general === "string" && (
            <p className="text-red-400 text-sm mt-2">{state.errors.general}</p>
          )}
          {state?.errors?.message && (
            <p className="text-red-400 text-sm mt-2">{state.errors.message}</p>
          )}

          <button
            className="w-full bg-warm-limestone text-charcoal py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
            type="submit"
            disabled={pending}
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default AuthForm;