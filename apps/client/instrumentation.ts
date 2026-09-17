/**
 * Sentry error monitoring initialization for the server runtime.
 * Features:
 * - Server-side monitoring
 * - Environment detection
 */

import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
