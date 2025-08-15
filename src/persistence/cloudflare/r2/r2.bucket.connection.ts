// !TODO: implement R2 bucket connection
import { S3Client } from "@aws-sdk/client-s3";

type R2BucketConfig = {
    region: string,
    endpoint: string,
    accessKey: string,
    secretKey: string
}

export class R2BucketConnection {
    private r2: S3Client;
    constructor(config: R2BucketConfig) {
        this.r2 = new S3Client({
            region: config.region,
            endpoint: config.endpoint,
            credentials: {
                accessKeyId: config.accessKey,
                secretAccessKey: config.secretKey
            }
        })
    }
}