import fs from "fs";

// eslint-disable-next-line consistent-return
export const deleteFile = async (path: string) => {
    try {
        await fs.promises.stat(path);
    } catch (error) {
        return error.message;
    }

    await fs.promises.unlink(path);
};
