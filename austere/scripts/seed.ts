const products = [
  {
    id: 'the-kyoto',
    category: 'Suits',
    name: 'The Kyoto',
    description: 'A masterpiece of tailoring that marries Eastern minimalism with Western structure. Hand-stitched silk lapels and traditional Japanese textile accents create an unparalleled statement of refinement.',
    price: '4800',
    image: { src: '/the-kyoto.png', alt: 'The Kyoto suit, a fusion of Eastern and Western tailoring.' },
    handcraftedHours: 180,
    edition: 'Limited Edition',
    materials: ['Japanese Wool', 'Hand-Dyed Silk', 'Mother of Pearl Buttons'],
    customization: {
      sizes: ['46R', '48R', '50R', '52R', '54R'],
      colors: ['Midnight Black', 'Charcoal Grey', 'Navy Blue'],
      materials: ['Super 150s Wool', 'Cashmere Blend', 'Pure Silk'],
      embellishments: [
        { name: 'Hand-Embroidered Initials', price: '250', description: 'Custom monogram in traditional Japanese calligraphy' },
        { name: 'Mother of Pearl Buttons', price: '350', description: 'Upgrade to premium mother of pearl buttons' }
      ],
      hardwareOptions: [
        { name: 'Sterling Silver Cufflinks', price: '450', description: 'Custom-designed sterling silver cufflinks' },
        { name: 'Gold-Plated Hardware', price: '650', description: '18k gold-plated suit hardware and buttons' }
      ]
    }
  },
  {
    id: 'magnum-opus',
    category: 'Evening Wear',
    name: 'Magnum Opus',
    description: 'The pinnacle of evening attire. This tuxedo features rare black vicuña wool, hand-pleated silk, and platinum-finished hardware. Each piece requires over 300 hours of meticulous craftsmanship.',
    price: '12000',
    image: { src: '/magnum-opus.png', alt: 'The Magnum Opus tuxedo, epitome of luxury evening wear.' },
    handcraftedHours: 320,
    edition: 'Bespoke Only',
    materials: ['Vicuña Wool', 'Italian Silk', 'Platinum Hardware'],
    customization: {
      sizes: ['46R', '48R', '50R', '52R', '54R'],
      colors: ['Classic Black', 'Midnight Blue', 'Ivory White'],
      materials: ['Vicuña Wool', 'Merino Wool', 'Cashmere Blend'],
      embellishments: [
        { name: 'Diamond Buttons', price: '2800', description: 'Set of diamond-encrusted buttons' },
        { name: 'Silk Lapel', price: '800', description: 'Hand-pleated silk lapel with custom finish' }
      ],
      hardwareOptions: [
        { name: 'Platinum Hardware Set', price: '1500', description: 'Complete set of platinum-finished hardware' },
        { name: '18k Gold Hardware', price: '2000', description: 'Solid 18k gold hardware set' }
      ]
    }
  },
  {
    id: 'berlin',
    category: 'Suits',
    name: 'The Berlin',
    description: 'A stunningly sharp suit in a versatile grey. The embodiment of understated power and modern European elegance. Impeccably tailored for a commanding presence.',
    price: '3800',
    image: { src: '/berlin.png', alt: 'The Berlin suit, modern European elegance.' },
    handcraftedHours: 160,
    edition: 'Made to Measure',
    materials: ['Super 150s Wool', 'Brushed Steel Buttons'],
    customization: {
      sizes: ['46R', '48R', '50R', '52R', '54R'],
      colors: ['Stone Grey', 'Navy Blue', 'Charcoal'],
      materials: ['Super 150s Wool', 'Merino Wool', 'Wool-Silk Blend'],
      embellishments: [
        { name: 'Pick Stitching', price: '300', description: 'Hand-done pick stitching on lapels and pockets' },
        { name: 'Custom Lining', price: '400', description: 'Personalized silk lining with custom pattern' }
      ],
      hardwareOptions: [
        { name: 'Brushed Steel Set', price: '350', description: 'Complete set of brushed steel hardware' },
        { name: 'Rose Gold Hardware', price: '550', description: 'Rose gold-plated hardware set' }
      ]
    }
  },
  {
    id: 'andorra',
    category: 'Outerwear',
    name: 'The Andorra',
    description: 'A masterfully crafted overcoat that combines warmth with unparalleled sophistication. Made from the finest cashmere and lined with hand-quilted silk.',
    price: '6500',
    image: { src: '/andorra.png', alt: 'The Andorra overcoat, luxury winter wear.' },
    handcraftedHours: 220,
    edition: 'Limited Edition',
    materials: ['Mongolian Cashmere', 'Quilted Silk Lining', 'Horn Buttons'],
    customization: {
      sizes: ['46R', '48R', '50R', '52R', '54R'],
      colors: ['Camel', 'Charcoal', 'Navy'],
      materials: ['Pure Cashmere', 'Cashmere-Wool Blend', 'Baby Alpaca'],
      embellishments: [
        { name: 'Fur Collar', price: '1200', description: 'Detachable sable fur collar' },
        { name: 'Hand-Quilted Lining', price: '800', description: 'Custom pattern hand-quilted silk lining' }
      ],
      hardwareOptions: [
        { name: 'Horn Button Set', price: '400', description: 'Premium horn button set' },
        { name: 'Gold-Plated Hardware', price: '600', description: '18k gold-plated hardware set' }
      ]
    }
  },
  {
    id: 'craft-blueprint',
    category: 'Accessories',
    name: 'Craft Blueprint',
    description: 'An exquisite silk scarf featuring our signature architectural patterns. Hand-rolled edges and custom-dyed using traditional techniques.',
    price: '1800',
    image: { src: '/craft-blueprint.png', alt: 'The Craft Blueprint silk scarf.' },
    handcraftedHours: 80,
    edition: 'Seasonal Collection',
    materials: ['Mulberry Silk', 'Natural Dyes', 'Hand-Rolled Edges'],
    customization: {
      sizes: ['Standard'],
      colors: ['Azure Blue', 'Crimson', 'Emerald'],
      materials: ['Mulberry Silk', 'Cashmere-Silk Blend'],
      embellishments: [
        { name: 'Hand-Knotted Fringe', price: '200', description: 'Artisanal hand-knotted silk fringe' },
        { name: 'Monogram', price: '150', description: 'Hand-embroidered monogram' }
      ]
    }
  }
];

async function seedProducts() {
  for (const product of products) {
    try {
      const res = await fetch('http://localhost:3000/api/product/create', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          id: `${product.id}.json` // Add .json extension only for file storage
        }),
      });
      const data = await res.json();
      if (data.ok) {
        console.log(`Successfully created ${product.name}`);
      } else {
        console.error(`Error creating ${product.name}:`, data.error || 'Unknown error');
      }
    } catch (error) {
      console.error(`Failed to send request for ${product.name}:`, error);
    }
  }
}

seedProducts().then(() => console.log('Seeding complete'));
