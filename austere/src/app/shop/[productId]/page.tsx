'use client';

import getProduct from '@/lib/getProduct';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProductItem } from '../../../../types/types';

const ProductView = ({ product }: { product: ProductItem }) => {
  const { scrollYProgress } = useScroll();
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0.1, 0.3], ['0%', '-100%']);

  return (
    <div className="bg-charcoal text-white">
      <div className="fixed top-8 left-8 z-50">
        <Link href="/shop" className="text-aged-stone hover:text-warm-limestone transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to The Collection
        </Link>
      </div>

      <motion.div style={{ opacity: imageOpacity, scale: imageScale }} className="h-screen w-full fixed top-0 left-0">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"/>
      </motion.div>

      <div className="h-screen flex items-center justify-center relative z-10">
        <motion.div style={{ y: textY }} className="text-center">
            <h1 className="text-6xl md:text-8xl font-serif text-warm-limestone tracking-tighter leading-none">{product.name}</h1>
            <p className="text-2xl text-aged-stone mt-4">£{product.price}</p>
        </motion.div>
      </div>

      <div className="relative z-20 bg-charcoal py-24 px-8">
        <div className="max-w-3xl mx-auto space-y-20">
            <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.8}} viewport={{once: true, amount: 0.5}}>
                <p className="text-2xl md:text-3xl text-aged-stone leading-relaxed font-serif text-center">{product.description}</p>
            </motion.div>

            <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.8}} viewport={{once: true, amount: 0.5}} className="text-center border-t border-b border-aged-stone/20 py-16">
                <h3 className="text-4xl font-serif text-warm-limestone">Bespoke Customisation</h3>
                <p className="text-lg text-aged-stone mt-4 max-w-2xl mx-auto">Each piece is tailored to your precise specifications. To begin this journey, please request a private consultation with our master tailor.</p>
            </motion.div>
            
            <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.8}} viewport={{once: true, amount: 0.5}} className="text-center">
                <button className="bg-warm-limestone text-charcoal py-4 px-12 rounded-md font-semibold hover:bg-opacity-90 transition-colors text-xl">
                    Request Consultation
                </button>
            </motion.div>
        </div>
      </div>
    </div>
  );
}

const ProductDetailPage = async ({ params }: { params: { productId: string } }) => {
  const product = await getProduct(params.productId);

  if (!product) {
    notFound();
  }

  return <ProductView product={product} />;
};

export default ProductDetailPage;
