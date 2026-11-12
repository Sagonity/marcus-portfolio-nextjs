import type { Metadata } from "next";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { getDictionary, tr, type Locale } from "@/i18n";
import { projects } from "@/data/content";
import { Card, PageHeader, StatusBadge, Tag, filled } from "../../_components/ui";
import { pageMetadata } from "../../_components/meta";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = (await getDictionary(lang)).projects;
  return pageMetadata(lang, "/projects", t.title, t.description);
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[lang]/projects">) {
  const lang = (await params).lang as Locale;
  const t = (await getDictionary(lang)).projects;

  return (
    <>
      <PageHeader title={t.title}>{t.intro}</PageHeader>

      <div className="grid gap-6">
        {projects.map((project) => {
          const links = filled(project.links);
          return (
            <Card key={tr(project.title, "en")}>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold">{tr(project.title, lang)}</h2>
                <StatusBadge status={tr(project.status, lang)} />
              </div>
              {tr(project.role, lang) && (
                <p className="mt-1 text-sm text-muted">{tr(project.role, lang)}</p>
              )}
              <p className="mt-4 leading-relaxed">{tr(project.description, lang)}</p>

              {project.tech.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
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
            </Card>
          );
        })}

        <div className="rounded-xl border-2 border-dashed border-border p-8 text-center text-muted">
          {t.moreSoon}
        </div>
      </div>
    </>
  );
}
