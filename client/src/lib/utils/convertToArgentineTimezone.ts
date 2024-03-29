import moment from "moment";

export const convertToArgentineTimezone = (dateStr: string) => {
    const utcDate = moment.utc(dateStr);

    const bsAsDate = utcDate.tz("America/Argentina/Buenos_Aires");
    
    // Use moment.format to display the date in the desired format
    const formattedDate = bsAsDate.format("ddd DD/MM - hh:mm A");

    const datePart = formattedDate.slice(0, 10); // "Dom 16/07"
    const timePart = formattedDate.slice(12); // "04:20 PM"

    return { datePart, timePart };
  };