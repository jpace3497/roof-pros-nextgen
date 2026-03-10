import { useEffect, useState } from "react";
import type { LeadData } from "@/types/lead";

export interface GoogleReview {
  name: string;
  rating: number;
  text: string;
  timeAgo: string;
}

export interface GoogleReviewsData {
  found: boolean;
  businessName?: string;
  rating?: number;
  totalReviews?: number;
  phone?: string;
  website?: string;
  hours?: string[];
  reviews: GoogleReview[];
}

const CACHE_VERSION = "v3"; // bump to invalidate old entries missing hours/website
const CACHE_PREFIX = `hexara_reviews_${CACHE_VERSION}_`;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getCacheKey(lead: LeadData): string {
  return `${CACHE_PREFIX}${lead.companySlug}_${lead.city || ""}_${lead.state || ""}`.toLowerCase();
}

function getFromCache(key: string): GoogleReviewsData | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

function setCache(key: string, data: GoogleReviewsData): void {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // localStorage full or unavailable — ignore
  }
}

export function useGoogleReviews(lead: LeadData): {
  data: GoogleReviewsData | null;
  loading: boolean;
} {
  const [data, setData] = useState<GoogleReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheKey = getCacheKey(lead);

    // Check cache first
    const cached = getFromCache(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    const params = new URLSearchParams({ company: lead.companyName });
    if (lead.city) params.set("city", lead.city);
    if (lead.state) params.set("state", lead.state);

    fetch(`/.netlify/functions/reviews?${params.toString()}`)
      .then((res) => res.json())
      .then((result: GoogleReviewsData) => {
        setData(result);
        setCache(cacheKey, result);
      })
      .catch(() => {
        setData({ found: false, reviews: [] });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lead.companySlug, lead.city, lead.state]);

  return { data, loading };
}
