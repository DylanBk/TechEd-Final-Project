import { Pool } from "pg";
import { S3Client } from "@aws-sdk/client-s3";

export const db = new Pool({
    connectionString: process.env.SUPABASE_URI
});

export const s3Client = new S3Client ({
    region: process.env.AWS_S3_BUCKET_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_USER_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY as string
    }
});