export const validateClientUrl = (input: string): boolean => {
  if (!input || !input.trim()) return false;
  try {
    const parsed = new URL(input.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};
