import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-6 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href={`mailto:${profile.email}`} className="hover:text-accent">
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
