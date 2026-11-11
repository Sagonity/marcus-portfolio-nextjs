import type { MetadataRoute } from "next";
import { htmlLang, locales } from "@/i18n";

const base = "https://marcustangen.no";
const paths = ["", "/projects", "/hobbies", "/resume"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${base}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [htmlLang[l], `${base}/${l}${path}`]),
        ),
      },
    })),
  );
}
