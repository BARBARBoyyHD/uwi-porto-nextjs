export function normalizeDate(dateString?: string): string | Date | null {
  if (!dateString) return null;

  // If already in YYYY-MM-DD format, return directly
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  // Convert from DD-MM-YYYY → YYYY-MM-DD
  const match = dateString.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    return `${year}-${month}-${day}`;
  }

  return null;
}
