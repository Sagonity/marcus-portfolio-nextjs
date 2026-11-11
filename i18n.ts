export const locales = ["en", "no"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Value for <html lang>, hreflang etc. ("no" in the URL is Norwegian Bokmål). */
export const htmlLang: Record<Locale, string> = { en: "en", no: "nb" };
/** Locale used for formatting dates. */
export const intlLocale: Record<Locale, string> = { en: "en-GB", no: "nb-NO" };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A content string that is either the same in every language or translated per language. */
export type Localized = string | Record<Locale, string>;

export function tr(value: Localized, lang: Locale): string {
  return typeof value === "string" ? value : value[lang];
}

/** Formats "2025-04" as "Apr 2025" / "apr. 2025". */
export function formatMonth(yearMonth: string, lang: Locale): string {
  const [year, month] = yearMonth.split("-").map(Number);
  return new Intl.DateTimeFormat(intlLocale[lang], {
    month: "short",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  no: () => import("./dictionaries/no.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export const getDictionary = (lang: Locale): Promise<Dictionary> =>
  dictionaries[lang]();
