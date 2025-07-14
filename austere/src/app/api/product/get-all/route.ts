import { NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

import { s3Client as client } from "@/config/config";


export async function GET() {
    try {
        const input = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
        };
        const command = new ListObjectsV2Command(input);
        const res = await client.send(command);

        return NextResponse.json({
            ok: true,
            status: res.$metadata.httpStatusCode || 200,
            message: 'Products fetched successfully',
            data: res.Contents
        });
    } catch (e) {
        return NextResponse.json({
            ok: false,
            status: 500,
            error: `Error fetching product data: ${e}`
        });
    };
};