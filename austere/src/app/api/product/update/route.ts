import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { s3Client as client } from "@/config/config";
import { ProductSchema } from "@/lib/schema";
import * as z from 'zod';


export async function PUT(request: Request) {
    try {
        const body = await request.json();
        ProductSchema.parse(body);

        const input = {
            Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            Key: body.id,
            Body: JSON.stringify(body)
        };
        const command = new PutObjectCommand(input);
        const res = await client.send(command);

        return NextResponse.json({
            ok: true,
            status: res.$metadata.httpStatusCode || 204,
            message: 'Product updated successfully',
        });
    } catch (e) {
        if (e instanceof z.ZodError) {
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