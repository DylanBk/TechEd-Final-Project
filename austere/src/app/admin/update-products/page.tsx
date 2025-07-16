'use client';

import { useState } from 'react';
import { ProductItem } from '../../../../types/types';

// Default provenance data for existing items
const provenanceData: { [key: string]: Partial<ProductItem> } = {
  'the-monolith-bag.json': { handcraftedHours: 150, edition: 'One of Ten', materials: ['Italian Leather', 'Polished Obsidian'] },
  'the-aethel-earrings.json': { handcraftedHours: 80, edition: 'Bespoke', materials: ['18k Gold', 'South Sea Pearls'] },
  'the-chronos-watch.json': { handcraftedHours: 450, edition: 'Numbered Edition', materials: ['Titanium', 'Sapphire Crystal', 'Swiss Movement'] },
  'the-vesper-blazer.json': { handcraftedHours: 120, edition: 'Made to Measure', materials: ['Cashmere-Silk Blend', 'Horn Buttons'] },
};

const EnrichProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleEnrichment = async () => {
    setLoading(true);
    const newResults: string[] = [];

    try {
      const res = await fetch('/api/product/get-all');
      const data = await res.json();
      if (!data.ok) throw new Error('Failed to get product list');

      for (const p of data.data) {
        const key = p.Key;
        if (!provenanceData[key]) {
          newResults.push(`Skipping ${key} (no new data).`);
          continue;
        }

        const detailRes = await fetch('/api/product/get', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) });
        const detailData = await detailRes.json();
        if (!detailData.ok || !detailData.data) {
          newResults.push(`Failed to fetch details for ${key}.`);
          continue;
        }

        const existingProduct = JSON.parse(detailData.data);
        const updatedProduct = { ...existingProduct, ...provenanceData[key] };

        const updateRes = await fetch('/api/product/update', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedProduct) });
        const updateData = await updateRes.json();
        
        if (updateData.ok) {
          newResults.push(`Successfully enriched ${key}.`);
        } else {
          newResults.push(`Error enriching ${key}: ${updateData.error || 'Unknown error'}`);
        }
      }
    } catch (error) {
      newResults.push(`An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`);
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="bg-travertine min-h-screen text-sepia p-8">
      <h1 className="text-4xl font-serif mb-8">Enrich Product Collection</h1>
      <p className="mb-4">Click the button to add provenance data to the existing collection pieces.</p>
      <button onClick={handleEnrichment} disabled={loading} className="bg-sepia text-warm-limestone font-bold py-2 px-6 rounded-md hover:bg-sepia/90 transition-colors disabled:opacity-50">
        {loading ? 'Enriching...' : 'Enrich Collection'}
      </button>
      {results.length > 0 && (
        <div className="mt-8 p-4 bg-warm-limestone/50 rounded-md">
          <h2 className="text-2xl font-serif mb-2">Results:</h2>
          <ul className="list-disc list-inside">
            {results.map((result, index) => <li key={index}>{result}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UpdateProductsPage;
