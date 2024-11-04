import { convertMonthInNumber } from "./convertMonthInNumber.util";

export const parseDate = (dataString: string): String => {
    const [date, hours] = dataString.split("-");
    const [day, month, year] = date.split(" ");
    const [hour, minutes] = hours.split(":");

    const newDate = new Date(
        Date.UTC(parseInt(year), convertMonthInNumber(month) - 1, parseInt(day), parseInt(hour), parseInt(minutes))
    //    parseInt(year), convertMonthInNumber(month) - 1, parseInt(day), parseInt(hour), parseInt(minutes)
    );

    return newDate.toISOString();
};