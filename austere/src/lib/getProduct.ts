import { ProductItem } from "../../types/types";

const getProduct = async (productId: string): Promise<ProductItem | null> => {
    try {
        const key = `${productId}.json`;
        const req = await fetch(
            `${process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'}/api/product/get`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key })
            }
        );

        if (!req.ok) {
            console.error(`Failed to fetch product: ${req.statusText}`);
            return null;
        }

        const res = await req.json();

        if (res.ok && res.data) {
            const productData = JSON.parse(res.data);
            return {
                id: key,
                category: productData.category,
                name: productData.name,
                description: productData.description,
                price: productData.price,
                image: {
                    src: productData.image.src,
                    alt: productData.image.alt
                }
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

export default getProduct;
