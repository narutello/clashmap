import { createFileRoute } from "@tanstack/react-router";

async function handle(request: Request): Promise<Response> {
  const { env } = await import("@/lib/env.server");
  const { runIngest } = await import("@/lib/ingest.server");
  const secret = env("CRON_SECRET");
  if (secret) {
    const auth = request.headers.get("authorization");
    const vercelCron = request.headers.get("x-vercel-cron");
    const ok = auth === `Bearer ${secret}` || vercelCron === "1";
    if (!ok) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }
  }
  try {
    const summary = await runIngest();
    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "ingest failed";
    console.error("[cron/sync]", err);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}

export const Route = createFileRoute("/api/cron/sync")({
  server: {
    handlers: {
      GET: ({ request }) => handle(request),
      POST: ({ request }) => handle(request),
    },
  },
});
