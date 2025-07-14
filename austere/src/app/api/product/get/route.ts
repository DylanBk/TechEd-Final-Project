import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";

import { s3Client as client } from "@/config/config";


export async function POST(request: Request) {
    try {
        const body = await request.json();

        const input = {
            Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            Key: body.key
        };
        const command = new GetObjectCommand(input);
        const {Body} = await client.send(command);

        const res = await Body?.transformToString();

        return NextResponse.json({
            ok: true,
            status: 200,
            data: res
        });
    } catch (e) {
        return NextResponse.json({
            ok: false,
            status: 500,
            error: `Error getting product: ${e}`
        });
    };
};