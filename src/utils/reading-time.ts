/** Rough reading-time estimate from markdown/plain body text. */
export function readingTimeMinutes(body: string): number {
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`\[\]()!-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatPostMeta(date: Date, minutes: number, tags: string[] = []): string {
  const iso = date.toISOString().slice(0, 10);
  const parts = [`${iso}`, `${minutes} min`, ...tags.slice(0, 3).map((t) => t.toLowerCase())];
  return parts.join(' · ');
}
