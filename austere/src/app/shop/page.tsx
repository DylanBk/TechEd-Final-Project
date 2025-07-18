'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

interface Product {
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

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product/get-all');
        const data = await response.json();
        if (data.ok) {
          const parsedProducts = data.data.map((item: any) => JSON.parse(item));
          console.log('Fetched products:', parsedProducts); // Debug log
          setProducts(parsedProducts);
        } else {
          throw new Error(data.error || 'Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal text-warm-limestone flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-serif"
        >
          Curating Collection...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-charcoal text-warm-limestone flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-6">Error</h2>
          <p className="text-aged-stone/80 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-warm-copper hover:text-warm-limestone transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="min-h-screen bg-charcoal text-warm-limestone flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-6">No Products Found</h2>
          <p className="text-aged-stone/80 mb-8">Please check back later for our latest collection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-warm-limestone p-6 md:p-12">
      <motion.h1 
        className="text-5xl md:text-6xl font-serif mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The Collection
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


