import { container } from "tsyringe";

import { IDateProvider } from "./date-provider/IDateProvider";
import { DayjsDateProvider } from "./date-provider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
