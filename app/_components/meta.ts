import type { Metadata } from "next";
import { htmlLang, locales, type Locale } from "@/i18n";

/** Title, description and hreflang links pointing at every language version of a page. */
export function pageMetadata(
  lang: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: Object.fromEntries(
        locales.map((l) => [htmlLang[l], `/${l}${path}`]),
      ),
    },
  };
}
