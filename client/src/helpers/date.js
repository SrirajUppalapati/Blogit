import { parseISO, format } from "date-fns";

export function dateTOString(dateString) {
  const date = parseISO(dateString);
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();
  const month = format(date, "MMMM dd");

  const formattedDate = year === currentYear ? month : `${month}, ${year}`;
  return formattedDate;
}
