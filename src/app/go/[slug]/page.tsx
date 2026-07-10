import { redirect } from "next/navigation";
import { resolveAffiliate } from "@/lib/data";

export const runtime = "nodejs";

// Affiliate redirects must never be indexed.
export const metadata = {
  robots: { index: false, follow: false },
};

type Params = { slug: string };

export default async function GoRedirectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const r = await resolveAffiliate(slug);
  if (!r) {
    redirect(`/?ref=${encodeURIComponent(slug)}`);
  }
  const target = r.targetUrl;
  if (target.startsWith("/")) {
    redirect(`${target}?ref=${encodeURIComponent(slug)}`);
  }
  redirect(target);
}
