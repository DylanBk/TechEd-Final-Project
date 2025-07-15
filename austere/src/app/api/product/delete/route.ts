import { NextResponse } from "next/server";

import { s3Client as client } from "@/config/config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";


export async function DELETE(request: Request) {
    try {
        const body = await request.json();

        const input = {
            Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            Key: body.key
        }
        const command = new DeleteObjectCommand(input);
        const res = await client.send(command);

        return NextResponse.json({
            ok: true,
            status: res.$metadata.httpStatusCode || 204,
            message: "Product deleted successfully"
        });
    } catch (e) {
        return NextResponse.json({
            ok: false,
            status: 500,
            error: `Error deleting product: ${e}`
        });
    };
};