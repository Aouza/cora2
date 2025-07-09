import { Resend } from "resend";
import { env } from "../src/env";

if (!env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is required");
}

export const resend = new Resend(env.RESEND_API_KEY);
