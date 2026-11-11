import type { Metadata } from "next";
import { BsBoxArrowUpRight } from "react-icons/bs";
import hobbies from "@/data/json/hobbies.json";
import { Card, PageHeader, filled } from "../_components/ui";
import { hobbyIcon } from "../_components/hobbyIcons";

export const metadata: Metadata = {
  title: "Hobbies",
  description: "Running, disc golf and competition bowling.",
};

export default function HobbiesPage() {
  return (
    <>
      <PageHeader title="Hobbies">
        When I&apos;m not coding or at work, you&apos;ll find me on the road,
        on the disc golf course or at the bowling alley.
      </PageHeader>

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
                  <h2 className="text-xl font-semibold">{hobby.title}</h2>
                  <p className="text-sm text-muted">{hobby.subtitle}</p>
                  <p className="mt-4 leading-relaxed">{hobby.description}</p>

                  {stats.length > 0 && (
                    <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-lg border border-border p-3"
                        >
                          <dt className="text-xs uppercase tracking-wide text-muted">
                            {stat.label}
                          </dt>
                          <dd className="mt-1 text-lg font-semibold">
                            {stat.value}
                          </dd>
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
                          {link.label} <BsBoxArrowUpRight />
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
