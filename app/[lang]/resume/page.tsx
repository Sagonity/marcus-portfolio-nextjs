import type { Metadata } from "next";
import {
  BsBook,
  BsEnvelopeAtFill,
  BsFileEarmarkPdfFill,
  BsGeoAltFill,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import { formatMonth, getDictionary, tr, type Locale } from "@/i18n";
import { education, experience, profile, skills } from "@/data/content";
import { Card, PageHeader } from "../../_components/ui";
import { pageMetadata } from "../../_components/meta";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/resume">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = (await getDictionary(lang)).resume;
  return pageMetadata(lang, "/resume", t.title, t.description);
}

export default async function ResumePage({
  params,
}: PageProps<"/[lang]/resume">) {
  const lang = (await params).lang as Locale;
  const t = (await getDictionary(lang)).resume;

  const period = (began: string, ended: string) =>
    `${formatMonth(began, lang)} – ${ended ? formatMonth(ended, lang) : t.present}`;

  return (
    <>
      <PageHeader title={t.title}>{t.intro}</PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Experience */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold">{t.experience}</h2>
          <ol className="mt-6 border-l-2 border-border">
            {experience.map((job) => (
              <li key={`${tr(job.company, "en")}-${job.began}`} className="relative mb-8 pl-6 last:mb-0">
                <span
                  className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full ${
                    job.ended ? "bg-border" : "bg-accent"
                  }`}
                />
                <h3 className="font-semibold">{tr(job.title, lang)}</h3>
                <p className="text-sm">
                  {tr(job.company, lang)}{" "}
                  <span className="italic text-muted">· {tr(job.employment, lang)}</span>
                </p>
                <p className="text-sm text-muted">
                  {tr(job.location, lang)} · {period(job.began, job.ended)}
                </p>
              </li>
            ))}
          </ol>
        </Card>

        <div className="space-y-6">
          {/* Contact */}
          <Card>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <BsGeoAltFill className="text-accent" /> {tr(profile.location, lang)}
              </li>
              <li className="flex items-center gap-3">
                <BsEnvelopeAtFill className="text-accent" />
                <a href={`mailto:${profile.email}`} className="hover:text-accent">
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <BsFileEarmarkPdfFill className="text-accent" />
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  {t.downloadCv}
                </a>
              </li>
            </ul>
          </Card>

          {/* Education */}
          <Card>
            <h2 className="text-xl font-semibold">{t.education}</h2>
            <ul className="mt-4 space-y-4">
              {education.map((edu) => (
                <li key={edu.began}>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <BsBook className="text-accent" /> {tr(edu.title, lang)}
                  </h3>
                  <p className="text-sm text-muted">
                    {tr(edu.location, lang)} · {period(edu.began, edu.ended)}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Skills */}
          <Card>
            <h2 className="text-xl font-semibold">{t.skills}</h2>
            <ul className="mt-4 space-y-3">
              {skills.map((skill) => {
                const score = Math.min(Math.max(skill.quality, 0), 5);
                return (
                  <li key={skill.skill} className="flex items-center justify-between">
                    <span className="font-medium">{skill.skill}</span>
                    <span
                      className="flex gap-1 text-accent"
                      aria-label={`${score} ${t.outOf} 5`}
                    >
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < score ? <BsStarFill key={i} /> : <BsStar key={i} />,
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
