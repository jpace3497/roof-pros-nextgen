import type { Context } from "@netlify/functions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
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

    const buildPrice = process.env.STRIPE_PRICE_BUILD;
    const hostingPrice = process.env.STRIPE_PRICE_HOSTING;
    const domainPrice = process.env.STRIPE_PRICE_DOMAIN;

    if (!buildPrice || !hostingPrice) {
      throw new Error("Missing Stripe price environment variables");
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price: buildPrice,
        quantity: 1,
      },
      {
        price: hostingPrice,
        quantity: 1,
      },
    ];

    if (includeDomain && domainPrice) {
      lineItems.push({
        price: domainPrice,
        quantity: 1,
      });
    }

    const siteUrl = process.env.URL || "https://roof-demo.netlify.app";

    const demoPath = [companySlug, city?.toLowerCase(), state?.toLowerCase()]
      .filter(Boolean)
      .join("/");

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
      JSON.stringify({
        error: err.message || "Failed to create checkout session",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};