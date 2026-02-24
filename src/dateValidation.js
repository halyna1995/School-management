export function isValidStartDate(startDate) {
  // Check format yyyy-MM-dd
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return false;
  }

  const parts = startDate.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (month < 1 || month > 12) return false;
  if (day < 1) return false;

  let daysInMonth = 31;

  // Months with 30 days
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    daysInMonth = 30;
  }
  // February (28 or 29)
  else if (month === 2) {
    const isLeapYear =
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    daysInMonth = isLeapYear ? 29 : 28;
  }

  if (day > daysInMonth) return false;

  return true;
}