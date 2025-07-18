import { NextResponse } from "next/server";
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const productsDir = join(process.cwd(), 'public', 'products');
        const filePath = join(productsDir, body.key);
        
        const content = await readFile(filePath, 'utf-8');

        return NextResponse.json({
            ok: true,
            status: 200,
            data: content
        });
    } catch (e) {
        return NextResponse.json({
            ok: false,
            status: 500,
            error: `Error getting product: ${e}`
        });
    }
};