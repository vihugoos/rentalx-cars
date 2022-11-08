import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "@shared/container/providers/date-provider/IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    dateNow(): Date {
        return dayjs().toDate();
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    diffInHours(date_1: Date, date_2: Date): number {
        const date_1_utc = this.convertToUTC(date_1);
        const date_2_utc = this.convertToUTC(date_2);

        return dayjs(date_1_utc).diff(date_2_utc, "hours");
    }

    diffInDays(date_1: Date, date_2: Date): number {
        const date_1_utc = this.convertToUTC(date_1);
        const date_2_utc = this.convertToUTC(date_2);

        return dayjs(date_1_utc).diff(date_2_utc, "days");
    }

    todayAdd24Hours(): Date {
        return dayjs().add(1, "day").toDate();
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }
}

export { DayjsDateProvider };
