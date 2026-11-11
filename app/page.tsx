import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsEnvelopeAtFill, BsGeoAltFill } from "react-icons/bs";
import { FaGamepad } from "react-icons/fa6";
import profile from "@/data/json/profile.json";
import projects from "@/data/json/projects.json";
import hobbies from "@/data/json/hobbies.json";
import { Card, StatusBadge } from "./_components/ui";
import { hobbyIcon } from "./_components/hobbyIcons";

export default function Home() {
  const current = projects.find((p) => p.status !== "Completed");

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Hi, I&apos;m
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-muted">{profile.role}</p>
          <p className="mt-6 leading-relaxed">{profile.intro}</p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <BsGeoAltFill /> {profile.location}
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
              href="/resume"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:opacity-90"
            >
              View resume
            </Link>
            <Link
              href="/projects"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent"
            >
              See projects
            </Link>
          </div>
        </div>

        <Image
          src="/images/Profilbilde.jpg"
          width={200}
          height={200}
          alt={`${profile.name} profile picture`}
          priority
          className="h-36 w-36 rounded-full border-4 border-surface object-cover shadow-lg ring-2 ring-accent sm:h-52 sm:w-52"
        />
      </section>

      {/* Currently working on */}
      {current && (
        <section>
          <h2 className="mb-4 text-xl font-semibold">Currently working on</h2>
          <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <FaGamepad className="mt-1 shrink-0 text-3xl text-accent" />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold">{current.title}</h3>
                  <StatusBadge status={current.status} />
                </div>
                <p className="mt-2 text-muted">{current.description}</p>
              </div>
            </div>
            <Link
              href="/projects"
              className="flex shrink-0 items-center gap-2 text-sm font-semibold text-accent"
            >
              Projects <BsArrowRight />
            </Link>
          </Card>
        </section>
      )}

      {/* Hobbies preview */}
      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Away from the screen</h2>
          <Link
            href="/hobbies"
            className="flex items-center gap-2 text-sm font-semibold text-accent"
          >
            All hobbies <BsArrowRight />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {hobbies.map((hobby) => {
            const Icon = hobbyIcon(hobby.id);
            return (
              <Link key={hobby.id} href={`/hobbies#${hobby.id}`} className="group">
                <Card className="h-full transition-colors group-hover:border-accent">
                  <Icon className="text-3xl text-accent" />
                  <h3 className="mt-4 font-semibold">{hobby.title}</h3>
                  <p className="text-sm text-muted">{hobby.subtitle}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
