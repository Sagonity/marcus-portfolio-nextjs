import type { Metadata } from "next";
import {
  BsBook,
  BsEnvelopeAtFill,
  BsFileEarmarkPdfFill,
  BsGeoAltFill,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import profile from "@/data/json/profile.json";
import experience from "@/data/json/experience.json";
import education from "@/data/json/education.json";
import skills from "@/data/json/skills.json";
import { Card, PageHeader } from "../_components/ui";

export const metadata: Metadata = {
  title: "Resume",
  description: "Work experience, education and skills of Marcus Tangen.",
};

function Period({ began, ended }: { began: string; ended: string }) {
  return (
    <span className="capitalize">
      {began} – {ended || "Present"}
    </span>
  );
}

export default function ResumePage() {
  return (
    <>
      <PageHeader title="Resume">
        My work experience, education and skills.
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Experience */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <ol className="mt-6 border-l-2 border-border">
            {experience.map((exp) => (
              <li
                key={`${exp.company}-${exp.began}`}
                className="relative mb-8 pl-6 last:mb-0"
              >
                <span
                  className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full ${
                    exp.ended ? "bg-border" : "bg-accent"
                  }`}
                />
                <h3 className="font-semibold">{exp.title}</h3>
                <p className="text-sm">
                  {exp.company}{" "}
                  <span className="italic text-muted">· {exp.employment}</span>
                </p>
                <p className="text-sm text-muted">
                  {exp.location} · <Period began={exp.began} ended={exp.ended} />
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
                <BsGeoAltFill className="text-accent" /> {profile.location}
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
                  Download CV
                </a>
              </li>
            </ul>
          </Card>

          {/* Education */}
          <Card>
            <h2 className="text-xl font-semibold">Education</h2>
            <ul className="mt-4 space-y-4">
              {education.map((edu) => (
                <li key={edu.title}>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <BsBook className="text-accent" /> {edu.title}
                  </h3>
                  <p className="text-sm text-muted">
                    {edu.location} · <Period began={edu.began} ended={edu.ended} />
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Skills */}
          <Card>
            <h2 className="text-xl font-semibold">Skills</h2>
            <ul className="mt-4 space-y-3">
              {skills.map((skill) => {
                const score = Math.min(Math.max(skill.quality, 0), 5);
                return (
                  <li
                    key={skill.skill}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{skill.skill}</span>
                    <span
                      className="flex gap-1 text-accent"
                      aria-label={`${score} out of 5`}
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
