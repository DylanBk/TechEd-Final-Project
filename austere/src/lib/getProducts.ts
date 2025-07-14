import { ProductItem } from "../../types/types";

const getProducts = async () => {
    const products: ProductItem[] = [];

    const req = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'}/api/product/get-all`,
        { method: 'GET' }
    );
    const res = await req.json();

    if (res.data) {
        for (const p of res.data) {
            const req = await fetch(
                `${process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'}/api/product/get`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key: p.Key })
                }
            );
            const res = await req.json();
            res.data = JSON.parse(res.data);
            
            if (res.ok) {
                products.push({
                    id: p.Key,
                    category: res.data.category,
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    image: {
                        src: res.data.image.src,
                        alt: res.data.image.alt
                    }
                });
            };
        };
    }

    return products;
};

export default getProducts;