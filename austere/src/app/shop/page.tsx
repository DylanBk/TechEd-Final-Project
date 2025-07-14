import Link from 'next/link';

import getProducts from '@/lib/getProducts';

import Product from '@/components/Product';


const Shop = async () => {
  const productData = await getProducts();
  console.log(productData)

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-white">
      <h1 className="text-black text-4xl mb-8">Shop Page</h1>

      {productData ? (
        <div className="w-full flex flex-row flex-wrap justify-center md:justify-start gap-4">
          { productData.map((p, i) => (
            <Product
              key={i}
              id={p.id}
              category={p.category}
              name={p.name}
              description={p.description}
              price={p.price}
              image={{
                src: p.image.src,
                alt: p.image.alt
              }}
            />
          ))}
        </div>
      ) : (
        <h2 className='text-3xl text-black'>No Products Available</h2>
      )}

      <Link href="/">
        <button className="px-4 py-2 border border-black text-black rounded">Back to Home</button>
      </Link>
    </div>
  );
};

export default Shop;