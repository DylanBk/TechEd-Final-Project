'use client';

import { useState } from 'react';

const newProducts = [
  {
    id: 'magnum-opus.json',
    category: 'Accessories',
    name: 'Magnum Opus',
    description: 'An avant-garde statement piece. A sculptural metal handbag that challenges the conventions of form and function. For the bold.',
    price: '7500',
    image: { src: '/magnum-opus.png', alt: 'A sculptural, avant-garde metal handbag.' },
    handcraftedHours: 220,
    edition: '1 of 1',
    materials: ['Titanium Alloy', 'Polished Chrome']
  },
  {
    id: 'the-kyoto.json',
    category: 'Dresses',
    name: 'The Kyoto',
    description: 'A hyper-modern interpretation of classic silhouettes, inspired by the juxtaposition of tradition and technology in Japanese design. A truly striking garment.',
    price: '9200',
    image: { src: '/the-kyoto.png', alt: 'A striking, hyper-modern dress with Japanese design themes.' },
    handcraftedHours: 180,
    edition: 'One of Three',
    materials: ['Kinetic Weave', 'Carbon Silk', 'Bioluminescent Thread']
  },
  {
    id: 'andorra.json',
    category: 'Suits',
    name: 'The Andorra',
    description: 'Tailored from pristine white fabric, this suit features intricate blue embroidery reminiscent of the Andorran mountain ranges. A testament to European heritage and craftsmanship.',
    price: '12500',
    image: { src: '/andorra.png', alt: 'A striking white suit with blue embroidery resembling mountain ranges.' },
    handcraftedHours: 310,
    edition: 'Bespoke',
    materials: ['Loro Piana Wool', 'Mountain Wildflower Silk', 'Sapphire Thread']
  },
  {
    id: 'berlin.json',
    category: 'Suits',
    name: 'The Berlin',
    description: 'A stunningly sharp suit in a versatile grey. The embodiment of understated power and modern European elegance. Impeccably tailored for a commanding presence.',
    price: '8800',
    image: { src: '/berlin.png', alt: 'A stunning, impeccably tailored grey suit.' },
    handcraftedHours: 250,
    edition: 'Made to Measure',
    materials: ['Super 200s Wool', 'Brushed Steel Buttons']
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
