'use client';

import getProducts from '@/lib/getProducts';
import { useEffect, useState } from 'react';
import { ProductItem } from '../../../types/types';
import dynamic from 'next/dynamic';

const ProductGallery = dynamic(() => import('@/components/ProductGallery'), { 
  ssr: false,
  loading: () => (
    <div className="bg-charcoal text-white min-h-screen flex items-center justify-center">
      <p className="text-aged-stone text-xl">Preparing the gallery...</p>
    </div>
  )
});

const ShopPage = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getProducts();
      setProducts(productData);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-charcoal text-white min-h-screen flex items-center justify-center">
        <p className="text-aged-stone text-xl">Curating the collection...</p>
      </div>
    );
  }

  return <ProductGallery products={products} />;
};

export default ShopPage;