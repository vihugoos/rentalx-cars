import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload-file";

import { IStorageProvider } from "../IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
    async save(filename: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, filename),
            resolve(`${upload.tmpFolder}/${folder}`, filename)
        );

        return filename;
    }

    async delete(filename: string, folder: string): Promise<void> {
        const pathFile = resolve(`${upload.tmpFolder}/${folder}`, filename);

        await fs.promises.stat(pathFile);
        await fs.promises.unlink(pathFile);
    }
}
