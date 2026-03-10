import type { Context } from "@netlify/functions";

const CACHE_TTL = 86400; // 24 hours

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${CACHE_TTL}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const company = url.searchParams.get("company");
  const city = url.searchParams.get("city");
  const state = url.searchParams.get("state");
  const debug = url.searchParams.get("debug") === "1";

  // Read API key at request time (not module level) to ensure env is loaded
  const apiKey = process.env.GOOGLE_PLACES_API_KEY || "";

  // Diagnostic mode: show env status without exposing the full key
  if (debug) {
    const keyPreview = apiKey
      ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)} (${apiKey.length} chars)`
      : "EMPTY";

    // List all env var names that contain "GOOGLE" or "PLACES" or "API"
    const relevantEnvKeys = Object.keys(process.env).filter(
      (k) => /google|places|api_key/i.test(k)
    );

    return jsonResponse({
      diagnostic: true,
      envVarName: "GOOGLE_PLACES_API_KEY",
      keyPresent: !!apiKey,
      keyPreview,
      relevantEnvVars: relevantEnvKeys,
      params: { company, city, state },
    });
  }

  if (!company) {
    return jsonResponse({ error: "Missing 'company' parameter" }, 400);
  }

  if (!apiKey) {
    return jsonResponse({
      error: "Google Places API key not configured",
      hint: "Set GOOGLE_PLACES_API_KEY in Netlify environment variables. Use ?debug=1 to check env status.",
    }, 500);
  }

  try {
    // Step 1: Text Search to find the business
    const query = [company, city, state].filter(Boolean).join(" ");
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query + " roofing contractor")}&key=${apiKey}`;

    console.log("[reviews] Text Search query:", query + " roofing contractor");

    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    console.log("[reviews] Text Search status:", searchData.status);

    if (
      searchData.status !== "OK" ||
      !searchData.results ||
      searchData.results.length === 0
    ) {
      return jsonResponse({
        found: false,
        reviews: [],
        debug: {
          googleStatus: searchData.status,
          errorMessage: searchData.error_message || null,
          query: query + " roofing contractor",
          resultsCount: searchData.results?.length || 0,
        },
      });
    }

    // Take the first result
    const place = searchData.results[0];

    // Step 2: Place Details to get reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,rating,user_ratings_total,reviews,formatted_phone_number,opening_hours,website&key=${apiKey}`;

    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    console.log("[reviews] Details status:", detailsData.status);

    if (detailsData.status !== "OK" || !detailsData.result) {
      return jsonResponse({
        found: false,
        reviews: [],
        debug: {
          googleStatus: detailsData.status,
          errorMessage: detailsData.error_message || null,
          placeId: place.place_id,
          placeName: place.name,
        },
      });
    }

    const details = detailsData.result;

    // Format the response — show 4+ star reviews with meaningful text
    const reviews = (details.reviews || [])
      .filter((r: any) => r.rating >= 4 && r.text.length > 20)
      .slice(0, 5)
      .map((r: any) => ({
        name: r.author_name,
        rating: r.rating,
        text: r.text,
        timeAgo: r.relative_time_description,
      }));

    return jsonResponse({
      found: true,
      businessName: details.name,
      rating: details.rating || null,
      totalReviews: details.user_ratings_total || 0,
      phone: details.formatted_phone_number || null,
      website: details.website || null,
      hours: details.opening_hours?.weekday_text || null,
      reviews,
    });
  } catch (err: any) {
    console.error("[reviews] Error:", err);
    return jsonResponse({
      found: false,
      reviews: [],
      error: err.message || "API request failed",
    });
  }
};
