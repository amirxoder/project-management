import { v4 as uuidv4 } from "uuid";
/**
 * Generates a new UUID.
 * @returns {string} A new UUID.
 */

export function generateUUID(): string {
  return uuidv4().replace(/-/g, "").substring(0, 8);
}
