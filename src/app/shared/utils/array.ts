export function removeDuplicateStringElementArray(array: string[]): string[] {
  return [...new Set(array)];
}
