import type { Context } from "@netlify/functions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-01-27.acacia",
});

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { companyName, companySlug, city, state, includeDomain } = body;

    if (!companyName) {
      return new Response(JSON.stringify({ error: "Missing companyName" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const locationLabel = [city, state].filter(Boolean).join(", ");

    // Build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      // $1500 one-time website build
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Website Build",
            description: `Custom roofing website for ${companyName}${locationLabel ? ` in ${locationLabel}` : ""}`,
          },
          unit_amount: 150000, // $1500 in cents
        },
        quantity: 1,
      },
      // $100/month hosting & maintenance
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Hosting & Maintenance",
            description: `Monthly hosting and maintenance for ${companyName} website`,
          },
          unit_amount: 10000, // $100 in cents
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ];

    // Optional: +$15/month domain registration
    if (includeDomain) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Domain Registration & Management",
            description: "Custom domain registration and DNS management",
          },
          unit_amount: 1500, // $15 in cents
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      });
    }

    // Build success/cancel URLs
    const siteUrl = process.env.URL || "https://roof-demo.netlify.app";
    const demoPath = [companySlug, city?.toLowerCase(), state?.toLowerCase()].filter(Boolean).join("/");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${siteUrl}/${demoPath}?checkout=success`,
      cancel_url: `${siteUrl}/${demoPath}?checkout=cancel`,
      metadata: {
        companyName,
        companySlug,
        city: city || "",
        state: state || "",
        includeDomain: includeDomain ? "true" : "false",
      },
      subscription_data: {
        metadata: {
          companyName,
          companySlug,
          city: city || "",
          state: state || "",
        },
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    console.error("[checkout] Error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to create checkout session" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
