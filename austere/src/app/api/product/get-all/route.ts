import { NextResponse } from "next/server";
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    try {
        const productsDir = join(process.cwd(), 'public', 'products');
        const files = await readdir(productsDir);
        const products = await Promise.all(
            files.map(async (file) => {
                const content = await readFile(join(productsDir, file), 'utf-8');
                return content;
            })
        );

        return NextResponse.json({
            ok: true,
            status: 200,
            message: 'Products fetched successfully',
            data: products
        });
    } catch (e) {
        return NextResponse.json({
            ok: false,
            status: 500,
            error: `Error fetching product data: ${e}`
        });
    };
};