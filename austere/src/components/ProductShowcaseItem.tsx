'use client';

import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ProductItem } from '../../types/types';

interface ProductShowcaseItemProps {
  product: ProductItem;
}

const ProductShowcaseItem = ({ product }: ProductShowcaseItemProps) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 48 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] as Easing, staggerChildren: 0.18 }
    }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as Easing } }
  };

  return (
    <motion.div 
      className="w-[80vw] h-[75vh] flex shadow-2xl"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.48 }}
    >
      <Link href={`/shop/${product.id.replace('.json', '')}`} className="w-full h-full flex group">
        <div className="w-1/3 bg-warm-limestone p-12 flex flex-col justify-between">
          <motion.div variants={childVariants}>
            <h2 className="text-5xl font-serif text-sepia leading-tight">{product.name}</h2>
          </motion.div>
          <motion.div variants={childVariants}>
            <p className="text-base text-sepia/80 leading-relaxed">{product.description}</p>
            <p className="text-2xl font-mono text-sepia mt-8">£{product.price}</p>
          </motion.div>
        </div>

        <div className="w-2/3 h-full overflow-hidden relative">
          <Image 
            src={product.image.src}
            alt={product.image.alt}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-[980ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductShowcaseItem;
