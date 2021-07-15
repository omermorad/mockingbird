export function isPrimitive(value: string): boolean {
  return ['String', 'Boolean', 'Number', 'Date'].includes(value);
}
