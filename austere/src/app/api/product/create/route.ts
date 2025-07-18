import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { ProductSchema } from "@/lib/schema";
import * as z from "zod";

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        ProductSchema.parse(body);

        // Store in local file system
        const productsDir = join(process.cwd(), 'public', 'products');
        await writeFile(join(productsDir, body.id), JSON.stringify(body, null, 2));

        return NextResponse.json({
            ok: true,
            status: 201,
            message: 'Product created successfully',
        });
    } catch(e) {
        if (e instanceof(z.ZodError)) {
            return NextResponse.json({
                ok: false,
                status: 400,
                error: `Validation error: ${JSON.stringify(e.issues)}`
            });
        };

        return NextResponse.json({
            ok: false,
            status: 500,
            error: `Error creating product: ${e}`
        });
    };
};