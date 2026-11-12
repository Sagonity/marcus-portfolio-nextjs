import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsEnvelopeAtFill, BsGeoAltFill } from "react-icons/bs";
import { FaGamepad } from "react-icons/fa6";
import { getDictionary, tr, type Locale } from "@/i18n";
import { hobbies, profile, projects } from "@/data/content";
import { Card, StatusBadge } from "../_components/ui";
import { hobbyIcon } from "../_components/hobbyIcons";
import { pageMetadata } from "../_components/meta";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  return {
    ...pageMetadata(lang, "", t.meta.title, t.meta.description),
    title: { absolute: t.meta.title },
  };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const t = (await getDictionary(lang)).home;
  const current = projects.find((p) => !p.completed);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            {t.greeting}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-muted">{tr(profile.role, lang)}</p>
          <p className="mt-6 leading-relaxed">{tr(profile.intro, lang)}</p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <BsGeoAltFill /> {tr(profile.location, lang)}
            </li>
            <li className="flex items-center gap-2">
              <BsEnvelopeAtFill />
              <a href={`mailto:${profile.email}`} className="hover:text-accent">
                {profile.email}
              </a>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/resume`}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:opacity-90"
            >
              {t.viewResume}
            </Link>
            <Link
              href={`/${lang}/projects`}
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent"
            >
              {t.seeProjects}
            </Link>
          </div>
        </div>

        <Image
          src="/images/Profilbilde.jpg"
          width={200}
          height={200}
          alt={profile.name}
          priority
          className="h-36 w-36 rounded-full border-4 border-surface object-cover shadow-lg ring-2 ring-accent sm:h-52 sm:w-52"
        />
      </section>

      {/* Currently working on */}
      {current && (
        <section>
          <h2 className="mb-4 text-xl font-semibold">{t.currentlyWorkingOn}</h2>
          <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <FaGamepad className="mt-1 shrink-0 text-3xl text-accent" />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold">
                    {tr(current.title, lang)}
                  </h3>
                  <StatusBadge status={tr(current.status, lang)} />
                </div>
                <p className="mt-2 text-muted">{tr(current.description, lang)}</p>
              </div>
            </div>
            <Link
              href={`/${lang}/projects`}
              className="flex shrink-0 items-center gap-2 text-sm font-semibold text-accent"
            >
              {t.projectsLink} <BsArrowRight />
            </Link>
          </Card>
        </section>
      )}

      {/* Hobbies preview */}
      <section>
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold">{t.awayFromScreen}</h2>
          <Link
            href={`/${lang}/hobbies`}
            className="flex shrink-0 items-center gap-2 text-sm font-semibold text-accent"
          >
            {t.allHobbies} <BsArrowRight />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {hobbies.map((hobby) => {
            const Icon = hobbyIcon(hobby.id);
            return (
              <Link
                key={hobby.id}
                href={`/${lang}/hobbies#${hobby.id}`}
                className="group"
              >
                <Card className="h-full transition-colors group-hover:border-accent">
                  <Icon className="text-3xl text-accent" />
                  <h3 className="mt-4 font-semibold">{tr(hobby.title, lang)}</h3>
                  <p className="text-sm text-muted">{tr(hobby.subtitle, lang)}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
