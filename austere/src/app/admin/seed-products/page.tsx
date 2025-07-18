'use client';

import { useState } from 'react';

const newProducts = [
  {
    id: 'the-kyoto.json',
    category: 'Suits',
    name: 'The Kyoto',
    description: 'A masterpiece of tailoring that marries Eastern minimalism with Western structure. Hand-stitched silk lapels and traditional Japanese textile accents create an unparalleled statement of refinement.',
    price: '4800',
    image: { src: '/the-kyoto.png', alt: 'The Kyoto suit, a fusion of Eastern and Western tailoring.' },
    handcraftedHours: 180,
    edition: 'Limited Edition',
    materials: ['Japanese Wool', 'Hand-Dyed Silk', 'Mother of Pearl Buttons']
  },
  {
    id: 'magnum-opus.json',
    category: 'Evening Wear',
    name: 'Magnum Opus',
    description: 'The pinnacle of evening attire. This tuxedo features rare black vicuña wool, hand-pleated silk, and platinum-finished hardware. Each piece requires over 300 hours of meticulous craftsmanship.',
    price: '12000',
    image: { src: '/magnum-opus.png', alt: 'The Magnum Opus tuxedo, epitome of luxury evening wear.' },
    handcraftedHours: 320,
    edition: 'Bespoke Only',
    materials: ['Vicuña Wool', 'Italian Silk', 'Platinum Hardware']
  },
  {
    id: 'berlin.json',
    category: 'Suits',
    name: 'The Berlin',
    description: 'A stunningly sharp suit in a versatile grey. The embodiment of understated power and modern European elegance. Impeccably tailored for a commanding presence.',
    price: '3800',
    image: { src: '/berlin.png', alt: 'The Berlin suit, modern European elegance.' },
    handcraftedHours: 160,
    edition: 'Made to Measure',
    materials: ['Super 150s Wool', 'Brushed Steel Buttons']
  },
  {
    id: 'andorra.json',
    category: 'Outerwear',
    name: 'The Andorra',
    description: 'A masterfully crafted overcoat that combines warmth with unparalleled sophistication. Made from the finest cashmere and lined with hand-quilted silk.',
    price: '6500',
    image: { src: '/andorra.png', alt: 'The Andorra overcoat, luxury winter wear.' },
    handcraftedHours: 220,
    edition: 'Limited Edition',
    materials: ['Mongolian Cashmere', 'Quilted Silk Lining', 'Horn Buttons']
  },
  {
    id: 'craft-blueprint.json',
    category: 'Accessories',
    name: 'Craft Blueprint',
    description: 'An exquisite silk scarf featuring our signature architectural patterns. Hand-rolled edges and custom-dyed using traditional techniques.',
    price: '1800',
    image: { src: '/craft-blueprint.png', alt: 'The Craft Blueprint silk scarf.' },
    handcraftedHours: 80,
    edition: 'Seasonal Collection',
    materials: ['Mulberry Silk', 'Natural Dyes', 'Hand-Rolled Edges']
  }
];

const SeedProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleSeed = async () => {
    setLoading(true);
    const newResults: string[] = [];

    for (const product of newProducts) {
      try {
        const res = await fetch('/api/product/create', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
        const data = await res.json();
        if (data.ok) {
          newResults.push(`Successfully created ${product.name}`);
        } else {
          newResults.push(`Error creating ${product.name}: ${data.error || 'Unknown error'}`);
        }
      } catch (error) {
        newResults.push(`Failed to send request for ${product.name}`);
      }
    }
    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="bg-travertine min-h-screen text-sepia p-8">
      <h1 className="text-4xl font-serif mb-8">Seed New Products</h1>
      <p className="mb-4">Click the button to add the new collection pieces to the database.</p>
      <button 
        onClick={handleSeed}
        disabled={loading}
        className="bg-sepia text-warm-limestone font-bold py-2 px-6 rounded-md hover:bg-sepia/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Seeding...' : 'Seed Products'}
      </button>
      {results.length > 0 && (
        <div className="mt-8 p-4 bg-warm-limestone/50 rounded-md">
          <h2 className="text-2xl font-serif mb-2">Results:</h2>
          <ul className="list-disc list-inside">
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SeedProductsPage;
