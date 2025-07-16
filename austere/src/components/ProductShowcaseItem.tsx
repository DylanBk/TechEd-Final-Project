'use client';

import { ProductItem } from '../../types/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProductShowcaseItemProps {
  product: ProductItem;
}

const ProductShowcaseItem = ({ product }: ProductShowcaseItemProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.2 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div 
      className="w-[80vw] h-[75vh] flex shadow-2xl"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <Link href={`/shop/${product.id.replace('.json', '')}`} className="w-full h-full flex group">
        {/* Text Panel */}
        <div className="w-1/3 bg-warm-limestone p-12 flex flex-col justify-between">
          <motion.div variants={childVariants}>
            <h2 className="text-5xl font-serif text-sepia leading-tight">{product.name}</h2>
          </motion.div>
          <motion.div variants={childVariants}>
            <p className="text-base text-sepia/80 leading-relaxed">{product.description}</p>
            <p className="text-2xl font-mono text-sepia mt-8">£{product.price}</p>
          </motion.div>
        </div>

        {/* Image Panel */}
        <div className="w-2/3 h-full overflow-hidden relative">
          <Image 
            src={product.image.src}
            alt={product.image.alt}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductShowcaseItem;
