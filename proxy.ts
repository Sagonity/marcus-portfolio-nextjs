import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, hasLocale, type Locale } from "./i18n";

/** Picks a language from the saved choice, then the browser's Accept-Language header. */
function getLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of accepted) {
    const base = tag.split("-")[0];
    if (base === "nb" || base === "nn" || base === "no") return "no";
    if (base === "en") return "en";
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (hasLocale(first)) return;

  request.nextUrl.pathname = `/${getLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, Vercel internals and any file with an extension (images, favicon, robots.txt, ...)
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
