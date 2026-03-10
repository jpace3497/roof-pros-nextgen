import { useParams, useSearchParams } from "react-router-dom";
import type { LeadData } from "@/types/lead";

const STRIP_SUFFIXES = /\s+(llc|inc|co|corp|ltd|company|group)$/i;

/**
 * Convert a URL slug to a display name.
 *  - replaces hyphens with spaces
 *  - title-cases each word
 *  - strips common business suffixes (LLC, Inc, etc.)
 */
function slugToName(slug: string): string {
  const raw = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return raw.replace(STRIP_SUFFIXES, "").trim();
}

/**
 * Format a raw digit string into (XXX) XXX-XXXX.
 * If the input already contains formatting characters, return as-is.
 */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return raw; // return original if we can't parse it
}

/**
 * Build a `tel:` href from a phone string.
 */
export function phoneTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+1${digits.slice(-10)}`;
}

/**
 * Parse the current URL into a LeadData object.
 *
 * Expected route patterns:
 *   /:slug
 *   /:slug/:city
 *   /:slug/:city/:state
 *
 * Optional query params: ?phone=...&email=...
 */
export function useLeadData(): LeadData | null {
  const { slug, city, state } = useParams<{
    slug: string;
    city?: string;
    state?: string;
  }>();
  const [searchParams] = useSearchParams();

  if (!slug) return null;

  const phoneRaw = searchParams.get("phone");
  const email = searchParams.get("email");

  return {
    companyName: slugToName(slug),
    companySlug: slug,
    city: city
      ? city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : undefined,
    state: state ? state.toUpperCase() : undefined,
    phone: phoneRaw ? formatPhone(phoneRaw) : undefined,
    email: email || undefined,
  };
}
