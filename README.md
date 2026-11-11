# Marcus Tangen – Portfolio

My personal website: projects, hobbies and resume. Built with Next.js (App Router) and Tailwind CSS, deployed on Vercel.

## Pages

| Route       | What's on it                                    |
| ----------- | ----------------------------------------------- |
| `/`         | Intro, current project, hobby highlights        |
| `/projects` | Projects I'm working on / have finished         |
| `/hobbies`  | Running, disc golf (PDGA), competition bowling  |
| `/resume`   | Work experience, education, skills, CV download |

## Updating content

All content lives in `data/json/`, so you don't need to touch any code:

- `profile.json` – name, intro text, email, CV link
- `projects.json` – add a new object per project. `status` is shown as a badge (e.g. `"In progress"`, `"Completed"`), `tech` is a list of tags, `links` is a list of `{ "label", "url" }`
- `hobbies.json` – description, stats and links per hobby. **Stats and links with an empty `value`/`url` are hidden**, so just fill in your PBs, PDGA number, club, etc. when you want them shown
- `experience.json`, `education.json`, `skills.json` – resume data (leave `ended` empty for a current job → shows "Present")

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
