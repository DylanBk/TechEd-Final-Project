'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Customization {
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
}

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
  customization: Customization;
}

interface CustomizationState {
  selectedSize: string;
  selectedColor: string;
  selectedMaterial: string;
  selectedEmbellishments: string[];
  selectedHardware: string[];
}

export default function ProductPage() {
  const params = useParams();
  const productId = params?.productId as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [customization, setCustomization] = useState<CustomizationState>({
    selectedSize: '',
    selectedColor: '',
    selectedMaterial: '',
    selectedEmbellishments: [],
    selectedHardware: []
  });
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      try {
        const response = await fetch('/api/product/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: productId }),
        });
        const data = await response.json();
        if (data.ok) {
          const productData = JSON.parse(data.data);
          setProduct(productData);
          // Set initial customization values
          setCustomization(prev => ({
            ...prev,
            selectedSize: productData.customization.sizes[0],
            selectedColor: productData.customization.colors[0],
            selectedMaterial: productData.customization.materials[0]
          }));
        } else {
          throw new Error(data.error || 'Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const calculateTotalPrice = () => {
    if (!product) return 0;
    
    let total = parseInt(product.price);
    
    // Add embellishment prices
    product.customization.embellishments?.forEach(emb => {
      if (customization.selectedEmbellishments.includes(emb.name)) {
        total += parseInt(emb.price);
      }
    });

    // Add hardware prices
    product.customization.hardwareOptions?.forEach(hw => {
      if (customization.selectedHardware.includes(hw.name)) {
        total += parseInt(hw.price);
      }
    });

    return total;
  };

  const handleCustomizationChange = (type: keyof CustomizationState, value: string) => {
    setCustomization(prev => {
      if (type === 'selectedEmbellishments' || type === 'selectedHardware') {
        const array = prev[type];
        const newArray = array.includes(value)
          ? array.filter(item => item !== value)
          : [...array, value];
        return { ...prev, [type]: newArray };
      }
      return { ...prev, [type]: value };
    });
  };

  const handleCheckout = async () => {
    if (!product) return;

    try {
      const customizedProduct = {
        ...product,
        finalPrice: calculateTotalPrice(),
        customization: {
          ...customization,
          totalPrice: calculateTotalPrice()
        }
      };

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [customizedProduct],
        }),
      });

      const { sessionId, error } = await response.json();
      if (error) throw new Error(error);

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      if (stripeError) throw stripeError;

    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal text-warm-limestone flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-serif"
        >
          Preparing Your Experience...
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-charcoal text-warm-limestone flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-6">Product Not Found</h2>
          <button
            onClick={() => router.push('/shop')}
            className="text-warm-copper hover:text-warm-limestone transition-colors"
          >
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-warm-limestone">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] overflow-hidden rounded-sm"
          >
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h1 className="text-5xl font-serif mb-4">{product.name}</h1>
              <p className="text-warm-copper text-2xl mb-8">Starting from £{parseInt(product.price).toLocaleString()}</p>
              
              <div className="space-y-6 mb-12">
                <div>
                  <h3 className="text-lg font-serif mb-2">Description</h3>
                  <p className="text-aged-stone/80 leading-relaxed">{product.description}</p>
                </div>

                {/* Customization Options */}
                <div className="space-y-6">
                  {/* Size Selection */}
                  <div>
                    <h3 className="text-lg font-serif mb-2">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.customization.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleCustomizationChange('selectedSize', size)}
                          className={`px-4 py-2 rounded-sm border transition-all duration-200 hover:bg-warm-copper/20 ${
                            customization.selectedSize === size
                              ? 'bg-warm-copper text-charcoal border-warm-copper'
                              : 'border-aged-stone/30 text-aged-stone/80 hover:border-warm-copper'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <h3 className="text-lg font-serif mb-2">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.customization.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleCustomizationChange('selectedColor', color)}
                          className={`px-4 py-2 rounded-sm border transition-all duration-200 hover:bg-warm-copper/20 ${
                            customization.selectedColor === color
                              ? 'bg-warm-copper text-charcoal border-warm-copper'
                              : 'border-aged-stone/30 text-aged-stone/80 hover:border-warm-copper'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Material Selection */}
                  <div>
                    <h3 className="text-lg font-serif mb-2">Material</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.customization.materials.map((material) => (
                        <button
                          key={material}
                          onClick={() => handleCustomizationChange('selectedMaterial', material)}
                          className={`px-4 py-2 rounded-sm border transition-all duration-200 hover:bg-warm-copper/20 ${
                            customization.selectedMaterial === material
                              ? 'bg-warm-copper text-charcoal border-warm-copper'
                              : 'border-aged-stone/30 text-aged-stone/80 hover:border-warm-copper'
                          }`}
                        >
                          {material}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Embellishments */}
                  {product.customization.embellishments && (
                    <div>
                      <h3 className="text-lg font-serif mb-2">Embellishments</h3>
                      <div className="space-y-2">
                        {product.customization.embellishments.map((emb) => (
                          <div
                            key={emb.name}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-charcoal/50 p-2 rounded-sm transition-colors"
                            onClick={() => handleCustomizationChange('selectedEmbellishments', emb.name)}
                          >
                            <input
                              type="checkbox"
                              id={emb.name}
                              checked={customization.selectedEmbellishments.includes(emb.name)}
                              onChange={() => {}}
                              className="form-checkbox text-warm-copper"
                            />
                            <label htmlFor={emb.name} className="flex-1 cursor-pointer">
                              <span className="text-warm-limestone">{emb.name}</span>
                              <span className="text-warm-copper ml-2">+£{parseInt(emb.price).toLocaleString()}</span>
                              <p className="text-aged-stone/60 text-sm">{emb.description}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hardware Options */}
                  {product.customization.hardwareOptions && (
                    <div>
                      <h3 className="text-lg font-serif mb-2">Hardware</h3>
                      <div className="space-y-2">
                        {product.customization.hardwareOptions.map((hw) => (
                          <div
                            key={hw.name}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-charcoal/50 p-2 rounded-sm transition-colors"
                            onClick={() => handleCustomizationChange('selectedHardware', hw.name)}
                          >
                            <input
                              type="checkbox"
                              id={hw.name}
                              checked={customization.selectedHardware.includes(hw.name)}
                              onChange={() => {}}
                              className="form-checkbox text-warm-copper"
                            />
                            <label htmlFor={hw.name} className="flex-1 cursor-pointer">
                              <span className="text-warm-limestone">{hw.name}</span>
                              <span className="text-warm-copper ml-2">+£{parseInt(hw.price).toLocaleString()}</span>
                              <p className="text-aged-stone/60 text-sm">{hw.description}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Total Price */}
                <div className="border-t border-aged-stone/30 pt-6">
                  <h3 className="text-2xl font-serif mb-2">Total</h3>
                  <p className="text-warm-copper text-3xl">£{calculateTotalPrice().toLocaleString()}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-warm-copper text-charcoal py-4 rounded-sm font-serif text-lg transition-all duration-200 hover:bg-warm-copper/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              Proceed to Payment (£{calculateTotalPrice().toLocaleString()})
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
