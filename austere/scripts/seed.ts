const products = [
  {
    id: 'the-monaco',
    category: 'Outerwear',
    name: 'The Monaco',
    description: 'A timeless classic, reimagined. The Monaco jacket is crafted from a single piece of sustainably sourced vicuña wool, offering unparalleled softness and warmth. Its minimalist design is accentuated by hand-polished horn buttons and a silk-lined interior.',
    price: '7200',
    image: { src: '/hero-portrait.png', alt: 'A man in a tailored coat overlooking a city skyline.' }
  },
  {
    id: 'the-riviera',
    category: 'Trousers',
    name: 'The Riviera',
    description: 'Tailored for a perfect drape, the Riviera trousers are the epitome of relaxed elegance. Woven from a rare blend of cashmere and silk, they provide a lightweight feel with a subtle, natural stretch. Ideal for temperate evenings and discerning company.',
    price: '3500',
    image: { src: '/woman-on-yacht.png', alt: 'A woman in elegant trousers on a yacht.' }
  },
  {
    id: 'the-helsinki',
    category: 'Knitwear',
    name: 'The Helsinki',
    description: 'The Helsinki sweater is an exercise in textural mastery. Knitted from the finest Inner Mongolian cashmere, its unique waffle-knit structure provides both exceptional warmth and a contemporary silhouette. A versatile piece for the modern connoisseur.',
    price: '4800',
    image: { src: '/philosophy-overhead.png', alt: 'Overhead view of a finely crafted garment.' }
  },
  {
    id: 'the-kyoto',
    category: 'Shirts',
    name: 'The Kyoto',
    description: 'Inspired by the tranquility of Japanese design, the Kyoto shirt is crafted from a feather-light cotton and linen blend. Its seamless construction and hidden placket offer a clean, uninterrupted profile. A testament to the beauty of simplicity.',
    price: '2900',
    image: { src: '/woman-in-villa.png', alt: 'A woman in a light shirt in a luxurious villa.' }
  },
  {
    id: 'the-aspen',
    category: 'Footwear',
    name: 'The Aspen',
    description: 'The Aspen boot is handcrafted from a single piece of flawless cordovan leather. Its Goodyear-welted construction ensures durability and a lifetime of wear, while the shearling lining provides uncompromising comfort. A foundation for any distinguished wardrobe.',
    price: '5600',
    image: { src: '/hero-yacht.png', alt: 'A view of a yacht, representing a luxurious lifestyle.' }
  }
];

const createProducts = async () => {
  const url = `${process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'}/api/product/create`;

  for (const product of products) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const result = await response.json();

      if (result.ok) {
        console.log(`Successfully created product: ${product.name}`);
      } else {
        console.error(`Failed to create product: ${product.name}. Error: ${result.error}`);
      }
    } catch (error) {
      console.error(`An error occurred while creating product ${product.name}:`, error);
    }
  }
};

createProducts();
