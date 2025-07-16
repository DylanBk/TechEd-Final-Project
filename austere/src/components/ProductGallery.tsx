'use client';

'use client';

import ProductShowcaseItem from './ProductShowcaseItem';
import { ProductItem } from '../../types/types';

interface ProductGalleryProps {
  products: ProductItem[];
}

const ProductGallery = ({ products }: ProductGalleryProps) => {
  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-travertine">
      {/* Intro Title */}
      <div className="h-screen w-screen snap-start flex flex-col items-center justify-center">
        <h1 className="text-8xl font-serif font-medium text-sepia tracking-tight">The Collection</h1>
        <p className="text-sepia/70 mt-4">A curation of masterworks.</p>
      </div>

      {/* Products */}
      {products.map((product) => (
        <div key={product.id} className="h-screen w-screen snap-start flex items-center justify-center">
          <ProductShowcaseItem product={product} />
        </div>
      ))}

      {/* Outro */}
      <div className="h-screen w-screen snap-start flex items-center justify-center">
        <h1 className="text-8xl font-serif font-medium text-sepia tracking-tight">FIN.</h1>
      </div>
    </div>
  );
};

export default ProductGallery;
