import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const debugInfo = {
    stripe: {
      hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
      hasPriceId: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      publishableKeyPrefix:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 10) +
        "...",
    },
    general: {
      hasDomain: !!process.env.NEXT_PUBLIC_DOMAIN,
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      nodeEnv: process.env.NODE_ENV,
    },
    resend: {
      hasApiKey: !!process.env.RESEND_API_KEY,
    },
  };

  return NextResponse.json(debugInfo);
}
