import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
/**
 * Merges multiple class names together.
 *
 * @param inputs - The class names to merge.
 * @returns The merged class names.
 */
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

/**
 * Generates a URL for Google OAuth.
 *
 * @returns The URL for Google OAuth.
 */
export function getGoogleOAuthURL() {
  const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  const qs = new URLSearchParams();
  qs.append('redirect_uri', "http://localhost:3000/oauth/google/callback");
  qs.append('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string)
  qs.append('access_type', 'offline');
  qs.append('response_type', 'code');
  qs.append('prompt', 'consent');
  qs.append('scope', [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
  ].join(' '));
  
  return `${rootURL}?${qs.toString()}`;
}

/**
 * Generates a URL for GitHub OAuth.
 *
 * @returns The URL for GitHub OAuth.
 */
export function getGithubOAuthURL() {
  const rootURL = "https://github.com/login/oauth/authorize";
  const qs = new URLSearchParams();
  qs.append('client_id', process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string);

  return `${rootURL}?${qs.toString()}`;
}