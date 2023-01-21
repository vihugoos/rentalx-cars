import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "@config/upload-file";

import { IStorageProvider } from "../IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    async save(filename: string, folder: string): Promise<string> {
        const pathFile = resolve(upload.tmpFolder, filename);

        const fileContent = await fs.promises.readFile(pathFile);

        const ContentType = mime.getType(pathFile);

        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: filename,
                ACL: "public-read",
                Body: fileContent,
                ContentType,
            })
            .promise();

        await fs.promises.unlink(pathFile);

        return filename;
    }

    async delete(filename: string, folder: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: filename,
            })
            .promise();
    }
}
