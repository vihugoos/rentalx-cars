import { container } from "tsyringe";

import { IDateProvider } from "./date-provider/IDateProvider";
import { DayjsDateProvider } from "./date-provider/implementations/DayjsDateProvider";
import { IMailProvider } from "./mail-provider/IMailProvider";
import { EtherealMailProvider } from "./mail-provider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

container.registerInstance<IMailProvider>(
    "MailProvider",
    new EtherealMailProvider()
);
