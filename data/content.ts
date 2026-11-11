import type { Localized } from "@/i18n";
import profileJson from "./json/profile.json";
import projectsJson from "./json/projects.json";
import hobbiesJson from "./json/hobbies.json";
import experienceJson from "./json/experience.json";
import educationJson from "./json/education.json";
import skillsJson from "./json/skills.json";

export type Link = { label: Localized; url: string };
export type Stat = { label: Localized; value: string; note?: string };

export type Profile = {
  name: string;
  role: Localized;
  location: Localized;
  email: string;
  cvUrl: string;
  intro: Localized;
  links: Link[];
};

export type Project = {
  title: Localized;
  completed: boolean;
  status: Localized;
  description: Localized;
  role: Localized;
  tech: string[];
  links: Link[];
};

export type Hobby = {
  id: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  stats: Stat[];
  links: Link[];
};

export type Job = {
  title: Localized;
  company: Localized;
  employment: Localized;
  location: Localized;
  /** "YYYY-MM" */
  began: string;
  /** "YYYY-MM", or empty for a current job */
  ended: string;
};

export type Education = {
  title: Localized;
  location: Localized;
  began: string;
  ended: string;
};

export type Skill = { skill: string; quality: number };

export const profile: Profile = profileJson;
export const projects: Project[] = projectsJson;
export const hobbies: Hobby[] = hobbiesJson;
export const experience: Job[] = experienceJson;
export const education: Education[] = educationJson;
export const skills: Skill[] = skillsJson;
