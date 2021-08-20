/**
 * Checks if a given constructor name is a primitive one
 * @param value
 */
export function isPrimitive(constructorName: string): boolean {
  return ['String', 'Boolean', 'Number', 'Date'].includes(constructorName);
}
