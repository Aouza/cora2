import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { env } from "../src/env";

// Configuração do Stripe no client-side
const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Configuração do Stripe no server-side
const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});

export { stripePromise, stripe };
