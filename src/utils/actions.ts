export function convertTo12HourFormat(isoDateString:any) {
  // Create a Date object from the ISO date string
  const date = new Date(isoDateString);

  // Extract the date parts
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getUTCDate()).padStart(2, '0');

  // Extract and convert the time parts
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  // Determine AM or PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format the date in the desired 12-hour format
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;

  return formattedDate;
}

