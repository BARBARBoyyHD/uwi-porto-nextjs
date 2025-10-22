export function normalizeDate(dateString: string): string | null {
  if (!dateString) return null;
  const parts = dateString.split("-");
  if (parts.length === 3) {
    // Convert DD-MM-YYYY → YYYY-MM-DD
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  return dateString; // already in YYYY-MM-DD format
}
