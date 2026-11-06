const fmt = new Intl.DateTimeFormat('cs-CZ', {
  timeZone: 'Europe/Prague',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

/** "6. 11. 2026 11:30" v pražském čase. */
export function formatPrague(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : fmt.format(d);
}

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
