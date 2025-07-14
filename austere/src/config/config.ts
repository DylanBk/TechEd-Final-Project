import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client ({
    region: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_REGION as string,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_USER_ACCESS_KEY as string,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_USER_SECRET_ACCESS_KEY as string
    }
});