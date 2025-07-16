'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProductItem } from '../../types/types';

const ProductCard = ({ product }: { product: ProductItem }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const textVariants = {
    rest: { y: '100%', opacity: 0 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
  };

  return (
    <motion.div
      className="relative group overflow-hidden rounded-lg shadow-2xl block"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Image
        src={product.image.src}
        alt={product.image.alt}
        width={400}
        height={500}
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 text-white overflow-hidden">
        <motion.div variants={textVariants}>
          <h3 className="text-2xl font-serif text-warm-limestone">{product.name}</h3>
          <p className="text-aged-stone mt-1">£{product.price}</p>
          <p className="text-sm text-warm-limestone mt-4 opacity-90">View Details →</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
