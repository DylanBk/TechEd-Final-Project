'use client';

import Image from "next/image";
import { ProductItem } from "../../types/types";

const Product = (props: ProductItem) => {

    return (
        <div className='flex flex-col p-4 border border-black rounded-lg bg-gray-300 text-black'>
            <Image
                src={props.image.src}
                alt={props.image.alt}
                width={300}
                height={300}
                placeholder="empty"
            />
            
            <h3 className="text-xl">{props.name}</h3>
            <p className="text-sm">{props.description}</p>
            <p className="text-bold">£{props.price}</p>
            <p>Category: {props.category}</p>
        </div>
    )
};

export default Product;