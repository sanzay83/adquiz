// Shared helpers for American Dream Quiz

/** Fisher–Yates shuffle — returns a new shuffled array (does not mutate). */
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Pick n random questions, with their options shuffled. */
export function pickRandomQuestions(all, n) {
  return shuffle(all)
    .slice(0, n)
    .map((q) => ({ ...q, options: shuffle(q.options) }));
}

/** localStorage JSON helpers with safe fallbacks. */
export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — ignore */
  }
}

/** Record a correctly-answered question id (deduped, resets at 90). */
export function markQuestionCorrect(id) {
  const ids = loadJSON("correctQuestionIds", []);
  if (!ids.includes(id)) ids.push(id);
  const finalIds = ids.length >= 90 ? [] : ids;
  saveJSON("correctQuestionIds", finalIds);
  return finalIds;
}

/** Save an attempt to the last-10 history. */
export function recordAttempt(score, total) {
  const past = loadJSON("pastAttempts", []);
  const updated = [{ score, total, date: new Date().toLocaleString() }, ...past].slice(0, 10);
  saveJSON("pastAttempts", updated);
  return updated;
}
