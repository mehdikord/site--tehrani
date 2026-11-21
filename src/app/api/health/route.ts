export const dynamic = "force-static";

/** Static mock site: no database is required, so health is a plain liveness probe. */
export function GET() {
  return Response.json({ ok: true });
}
