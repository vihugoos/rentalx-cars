import { container } from "tsyringe";

import { IDateProvider } from "./date-provider/IDateProvider";
import { DayjsDateProvider } from "./date-provider/implementations/DayjsDateProvider";
import { IMailProvider } from "./mail-provider/IMailProvider";
import { EtherealMailProvider } from "./mail-provider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./storage-provider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./storage-provider/implementations/S3StorageProvider";
import { IStorageProvider } from "./storage-provider/IStorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

container.registerInstance<IMailProvider>(
    "MailProvider",
    new EtherealMailProvider()
);

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.DISK_STORAGE]
);
