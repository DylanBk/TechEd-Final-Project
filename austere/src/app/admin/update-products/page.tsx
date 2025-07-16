'use client';

import { useEffect, useState } from 'react';
import { ProductItem } from '../../../../types/types';

const UpdateProductsPage = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product/get-all');
        const data = await res.json();
        if (data.ok) {
          const productDetailsPromises = data.data.map(async (p: { Key: string }) => {
            const detailRes = await fetch('/api/product/get', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ key: p.Key }),
            });
            const detailData = await detailRes.json();
            if (detailData.ok) {
              const parsedData = JSON.parse(detailData.data);
              return { ...parsedData, id: p.Key };
            }
            return null;
          });
          const productsData = (await Promise.all(productDetailsPromises)).filter(p => p !== null);
          setProducts(productsData);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleUpdate = async (productId: string, description: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const updatedProduct = { ...product, description };

    try {
      const res = await fetch('/api/product/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (data.ok) {
        alert('Product updated successfully!');
        setProducts(products.map(p => p.id === productId ? updatedProduct : p));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('An unexpected error occurred.');
    }
  };

  if (loading) {
    return <div className="bg-charcoal min-h-screen text-white flex items-center justify-center">Loading products...</div>;
  }

  return (
    <div className="bg-charcoal min-h-screen text-warm-limestone p-8">
      <h1 className="text-4xl font-serif mb-8">Update Product Descriptions</h1>
      <div className="space-y-6">
        {products.map(product => (
          <div key={product.id} className="bg-charcoal-light p-4 rounded-lg">
            <h2 className="text-2xl font-serif">{product.name}</h2>
            <p className="text-aged-stone mb-2">ID: {product.id}</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newDescription = (e.target as any).elements.description.value;
              handleUpdate(product.id, newDescription);
            }}>
              <textarea
                name="description"
                defaultValue={product.description || ''}
                className="w-full bg-charcoal p-2 rounded-md border border-aged-stone/20 mt-2"
                rows={3}
                placeholder="Enter product description..."
              />
              <button type="submit" className="bg-warm-limestone text-charcoal font-bold py-2 px-4 rounded-md mt-2 hover:bg-aged-stone transition-colors">
                Update Description
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateProductsPage;
