import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates initials from a given name by taking the first letter of each word.
 *
 * @param name - The input name from which to generate initials.
 * @returns The initials generated from the input name.
 */
export function getInitials(name: string): string {
  const words = name.trim().split(' ');
  const initials = words.map(word => word[0].toUpperCase()).join('').slice(0, 2);
  return initials;
}