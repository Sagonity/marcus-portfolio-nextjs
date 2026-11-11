import type { Metadata } from "next";
import { BsBoxArrowUpRight } from "react-icons/bs";
import projects from "@/data/json/projects.json";
import { Card, PageHeader, StatusBadge, Tag, filled } from "../_components/ui";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Marcus Tangen is building.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects">
        Things I&apos;m building. My first big project is a game I&apos;m
        making with a friend, so check back for updates as it grows.
      </PageHeader>

      <div className="grid gap-6">
        {projects.map((project) => {
          const links = filled(project.links as { label: string; url: string }[]);
          return (
            <Card key={project.title}>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <StatusBadge status={project.status} />
              </div>
              {project.role && (
                <p className="mt-1 text-sm text-muted">{project.role}</p>
              )}
              <p className="mt-4 leading-relaxed">{project.description}</p>

              {project.tech.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {(project.tech as string[]).map((t) => (
                    <Tag key={t}>{t}</Tag>
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
                      {link.label} <BsBoxArrowUpRight />
                    </a>
                  ))}
                </div>
              )}
            </Card>
          );
        })}

        <div className="rounded-xl border-2 border-dashed border-border p-8 text-center text-muted">
          More projects coming soon.
        </div>
      </div>
    </>
  );
}
