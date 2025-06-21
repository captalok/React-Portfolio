/**
 * Formats a date object or date string to 'YYYY-MM-DD' format
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  // If it's already a string in ISO format, return it directly
  if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return date;
  }
  
  const d = new Date(date);
  
  // Handle invalid dates
  if (isNaN(d.getTime())) {
    console.warn('Invalid date passed to formatDate:', date);
    return 'Invalid Date';
  }
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Formats a date to a more readable format (e.g., "January 1, 2023")
 * @param {Date|string} date - The date to format
 * @returns {string} Human-readable date string
 */
export const formatReadableDate = (date) => {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    console.warn('Invalid date passed to formatReadableDate:', date);
    return 'Invalid Date';
  }
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Calculates the difference in days between two dates
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} Difference in days
 */
export const dateDiffInDays = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    console.warn('Invalid dates passed to dateDiffInDays:', date1, date2);
    return 0;
  }
  
  // Calculate the difference in milliseconds
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Adds days to a date
 * @param {Date|string} date - The starting date
 * @param {number} days - Number of days to add
 * @returns {Date} New date with days added
 */
export const addDays = (date, days) => {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    console.warn('Invalid date passed to addDays:', date);
    return new Date();
  }
  
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * Gets the current date in 'YYYY-MM-DD' format
 * @returns {string} Current date string
 */
export const getCurrentDate = () => {
  return formatDate(new Date());
};

/**
 * Checks if a date is today
 * @param {Date|string} date - The date to check
 * @returns {boolean} True if the date is today
 */
export const isToday = (date) => {
  const d = new Date(date);
  const today = new Date();
  
  if (isNaN(d.getTime())) {
    return false;
  }
  
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

export default {
  formatDate,
  formatReadableDate,
  dateDiffInDays,
  addDays,
  getCurrentDate,
  isToday
};