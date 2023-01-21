export interface IDateProvider {
    dateNow(): Date;
    convertToUTC(date: Date): string;
    diffInHours(date_1: Date, date_2: Date): number;
    diffInDays(date_1: Date, date_2: Date): number;
    todayAdd24Hours(): Date;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfBefore(date_1: Date, date_2: Date): boolean;
}
