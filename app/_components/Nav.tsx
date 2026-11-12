"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsGlobe2, BsList, BsX } from "react-icons/bs";
import { LOCALE_COOKIE, type Dictionary, type Locale } from "@/i18n";

export default function Nav({
  lang,
  t,
}: {
  lang: Locale;
  t: Dictionary["nav"];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${lang}`, label: t.home },
    { href: `/${lang}/projects`, label: t.projects },
    { href: `/${lang}/hobbies`, label: t.hobbies },
    { href: `/${lang}/resume`, label: t.resume },
  ];

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname.startsWith(href);

  const otherLang: Locale = lang === "en" ? "no" : "en";
  const otherPath = pathname.replace(/^\/[^/]+/, `/${otherLang}`);

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href={`/${lang}`} className="text-lg font-semibold tracking-tight">
          Marcus<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-2">
          <ul
            className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-1 border-b border-border bg-background px-5 pb-4 sm:static sm:flex sm:flex-row sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0`}
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-accent/10 text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={otherPath}
            hrefLang={otherLang === "no" ? "nb" : "en"}
            title={t.switchLanguage}
            aria-label={t.switchLanguage}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${otherLang}; path=/; max-age=31536000; samesite=lax`;
              setOpen(false);
            }}
            className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold uppercase text-muted hover:border-accent hover:text-accent"
          >
            <BsGlobe2 /> {otherLang}
          </Link>

          <button
            type="button"
            className="text-2xl sm:hidden"
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <BsX /> : <BsList />}
          </button>
        </div>
      </nav>
    </header>
  );
}
