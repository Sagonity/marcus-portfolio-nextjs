import Link from "next/link";
import { getDictionary } from "@/i18n";

// not-found receives no params, so it's shown in English with a link to both languages.
export default async function NotFound() {
  const t = await getDictionary("en");
  const no = await getDictionary("no");
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold">404 – {t.notFound.title}</h1>
      <p className="mt-3 text-muted">
        {t.notFound.text} / {no.notFound.text}
      </p>
      <div className="mt-8 flex justify-center gap-4 text-sm font-semibold text-accent">
        <Link href="/en">{t.notFound.back}</Link>
        <Link href="/no">{no.notFound.back}</Link>
      </div>
    </div>
  );
}
