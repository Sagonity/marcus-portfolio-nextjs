import type { Metadata } from "next";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { getDictionary, tr, type Locale } from "@/i18n";
import { hobbies } from "@/data/content";
import { Card, PageHeader, filled } from "../../_components/ui";
import { hobbyIcon } from "../../_components/hobbyIcons";
import { pageMetadata } from "../../_components/meta";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/hobbies">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = (await getDictionary(lang)).hobbies;
  return pageMetadata(lang, "/hobbies", t.title, t.description);
}

export default async function HobbiesPage({
  params,
}: PageProps<"/[lang]/hobbies">) {
  const lang = (await params).lang as Locale;
  const t = (await getDictionary(lang)).hobbies;

  return (
    <>
      <PageHeader title={t.title}>{t.intro}</PageHeader>

      <div className="grid gap-6">
        {hobbies.map((hobby) => {
          const Icon = hobbyIcon(hobby.id);
          const stats = filled(hobby.stats);
          const links = filled(hobby.links);

          return (
            <Card key={hobby.id} className="scroll-mt-24">
              <section id={hobby.id} className="flex flex-col gap-5 sm:flex-row">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-3xl text-accent">
                  <Icon />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{tr(hobby.title, lang)}</h2>
                  <p className="text-sm text-muted">{tr(hobby.subtitle, lang)}</p>
                  <p className="mt-4 leading-relaxed">{tr(hobby.description, lang)}</p>

                  {stats.length > 0 && (
                    <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                      {stats.map((stat) => (
                        <div
                          key={tr(stat.label, "en")}
                          className="rounded-lg border border-border p-3"
                        >
                          <dt className="text-xs uppercase tracking-wide text-muted">
                            {tr(stat.label, lang)}
                          </dt>
                          <dd className="mt-1 text-lg font-semibold tabular-nums">
                            {stat.value}
                          </dd>
                          {stat.note && (
                            <dd className="text-xs text-muted">{stat.note}</dd>
                          )}
                        </div>
                      ))}
                    </dl>
                  )}

                  {links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-4">
                      {links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-accent"
                        >
                          {tr(link.label, lang)} <BsBoxArrowUpRight />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </Card>
          );
        })}
      </div>
    </>
  );
}
