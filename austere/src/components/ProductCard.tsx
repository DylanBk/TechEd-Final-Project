'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  materials: string[];
  handcraftedHours: number;
  category: string;
  edition: string;
  customization: {
    sizes: string[];
    colors: string[];
    materials: string[];
    embellishments?: Array<{
      name: string;
      price: string;
      description: string;
    }>;
    hardwareOptions?: Array<{
      name: string;
      price: string;
      description: string;
    }>;
  };
}

const ProductCard = ({ id, name, price, description, image, materials, handcraftedHours, category, edition }: ProductCardProps) => {
  return (
    <Link href={`/shop/${id}`} className="block">
      <motion.div 
        className="group relative bg-charcoal text-warm-limestone overflow-hidden rounded-sm cursor-pointer h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-80" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-8 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-serif">{name}</h3>
            <p className="text-warm-copper">£{parseInt(price).toLocaleString()}</p>
          </div>
          <p className="text-aged-stone/60 text-sm mb-2">{category} • {edition}</p>
          <div className="overflow-hidden">
            <motion.p 
              className="text-aged-stone/80 text-sm mb-4 line-clamp-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {description}
            </motion.p>
            <div className="space-y-2 text-xs text-aged-stone/60">
              <p>{materials.join(' • ')}</p>
              <p>{handcraftedHours} Hours of Craftsmanship</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
