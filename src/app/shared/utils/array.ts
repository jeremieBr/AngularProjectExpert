/**
 * Function which remove duplicate string element from an array
 * @param array Array of string with duplicate string element
 * @returns Array of unique string element
 */
export function removeDuplicateStringElementArray(array: string[]): string[] {
  return [...new Set(array)];
}
