import fs from "fs";

export const deleteFile = async (path: string) => {
    await fs.promises.stat(path);
    await fs.promises.unlink(path);
};
