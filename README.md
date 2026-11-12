# Marcus Tangen – Portfolio

My personal website: projects, hobbies and resume. Built with Next.js (App Router) and Tailwind CSS, deployed on Vercel.

## Pages

The site is in English (`/en/...`) and Norwegian (`/no/...`). Visitors are sent to the right language based on their browser, and the language button in the menu remembers their choice.

| Route           | What's on it                                    |
| --------------- | ----------------------------------------------- |
| `/[lang]`          | Intro, current project, hobby highlights        |
| `/[lang]/projects` | Projects I'm working on / have finished         |
| `/[lang]/hobbies`  | Running, disc golf (PDGA), competition bowling  |
| `/[lang]/resume`   | Work experience, education, skills, CV download |

## Updating content

All content lives in `data/json/`, so you don't need to touch any code.

Any text can be written either as a plain string (same in both languages) or translated:

```json
"title": { "en": "Running", "no": "Løping" }
```

- `profile.json`: name, intro text, email, CV link
- `projects.json`: one object per project. Set `completed` to `true` when it's finished (the home page shows the first unfinished one). `tech` is a list of tags, `links` is a list of `{ "label", "url" }`
- `hobbies.json`: description, stats and links per hobby. **Stats and links with an empty `value`/`url` are hidden**, so fill them in when you want them shown. `note` is shown under a stat (e.g. which race a PB is from). Stat values and notes can be translated too (e.g. `{ "en": "188.64", "no": "188,64" }`)
- `experience.json`, `education.json`: dates are `"YYYY-MM"` and are formatted per language. Leave `ended` empty for a current job (shows "Present"/"Nå")
- `skills.json`: skill name and a 0-5 rating

Menu labels, headings and other fixed text are in `dictionaries/en.json` and `dictionaries/no.json`.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
