import { ProductItem } from '../../../../types/types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiBox, FiClock, FiFeather } from 'react-icons/fi';

async function getProduct(productId: string): Promise<ProductItem | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'}/api/product/get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: `${productId}.json` }),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.ok && data.data) return JSON.parse(data.data) as ProductItem;
    return null;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    return null;
  }
}

const ProvenanceDetail = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
  <div className="flex items-start">
    <Icon className="w-5 h-5 text-muted-gold/80 mr-4 mt-1 flex-shrink-0" />
    <div>
      <p className="text-sm text-ink-black/60 tracking-wider uppercase font-sans">{label}</p>
      <p className="text-lg text-ink-black font-serif">{value}</p>
    </div>
  </div>
);

const ProductDetailPage = async ({ params }: { params: { productId: string } }) => {
  const product = await getProduct(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-desk-wood text-aged-paper p-4 sm:p-8 md:p-12">
      <div className="relative w-full max-w-7xl mx-auto min-h-[90vh] grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Back Link */}
        <div className="absolute top-0 left-0 z-30">
          <Link href="/shop" className="inline-block text-aged-paper/70 hover:text-aged-paper transition-colors">
            &larr; Return to The Collection
          </Link>
        </div>

        {/* Image as centerpiece */}
        <div className="lg:col-span-7 xl:col-span-8 w-full h-[60vh] lg:h-auto relative flex items-center justify-center">
          <div className="relative w-full h-full max-h-[85vh]">
            <Image 
              src={product.image.src}
              alt={product.image.alt}
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>

        {/* Overlapping Info Panel */}
        <div className="lg:col-span-5 xl:col-span-4 w-full self-center z-10">
          <div className="bg-aged-paper text-ink-black p-8 md:p-10 shadow-2xl relative">
            <header className="mb-8 border-b border-ink-black/10 pb-6">
              <h1 className="text-4xl md:text-5xl font-serif leading-tight text-ink-black">{product.name}</h1>
              <p className="text-2xl font-mono text-ink-black/70 mt-4">£{product.price}</p>
            </header>

            {/* Curator's Note */}
            <div className="mb-8">
              <h2 className="font-serif text-xl text-ink-black/80 mb-3">Curator's Note</h2>
              <p className="text-base leading-relaxed text-ink-black/90 font-sans">
                {product.description}
              </p>
            </div>

            {/* Provenance Dossier */}
            {(product.edition || product.handcraftedHours || product.materials) && (
              <div className="space-y-5 mb-10">
                 <h3 className="font-serif text-xl text-ink-black/80 border-b border-ink-black/10 pb-2">Provenance</h3>
                {product.edition && <ProvenanceDetail icon={FiBox} label="Edition" value={product.edition} />}
                {product.handcraftedHours && <ProvenanceDetail icon={FiClock} label="Artisan Hours" value={product.handcraftedHours} />}
                {product.materials && product.materials.length > 0 && <ProvenanceDetail icon={FiFeather} label="Core Materials" value={product.materials.join(', ')} />}
              </div>
            )}

            <button className="w-full bg-ink-black text-aged-paper font-bold py-4 text-lg tracking-wider uppercase hover:bg-muted-gold hover:text-white transition-all duration-300">
              Acquire
            </button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default ProductDetailPage;
