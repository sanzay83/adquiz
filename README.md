# American Dream Quiz

Practice app for the **U.S. citizenship (naturalization) civics test** — built with React.

## Features

- **Practice Quiz** — 10 random questions per round (skips ones you've already mastered), pass mark 6/10
- **Quiz Marathon** — all 124 questions back-to-back with instant feedback, live score & streak tracking
- **Flashcards** — 3D flip cards for all 128 civics Q&As; mark cards as known, shuffle, keyboard support
- **Study Material** — tabbed browser for Civics Q&A, Reading vocabulary and Writing vocabulary, with search
- **Progress** — attempt history, best/average scores, question-mastery bar (all saved in `localStorage`)

## Run it

```bash
npm install
npm start
```

Build for production:

```bash
npm run build
```

## Data

Question banks live in `src/assets/`:

| File | Contents |
|---|---|
| `data.json` | 124 multiple-choice civics questions (2025 USCIS bank of 128 minus 4 state-specific) |
| `studyData.json` | 128 civics Q&As (full 2025 USCIS bank) |
| `reading.json` / `writing.json` | Reading & writing vocabulary |

<!-- auto-deploy wired 2026-10-05 -->
