export function aggregateLogs(logs) {
  if (!logs || logs.length === 0) {
    return {
      totalSessions: 0,
      totalPagesLogged: 0,
      avgPagesPerSession: 0,
      moodFrequency: {},
      reflections: [],
      quotes: [],
    };
  }
  const sorted = [...logs].sort((a, b) => {
    const c = a.date.localeCompare(b.date);
    return c !== 0 ? c : (a.startPage || 0) - (b.startPage || 0);
  });
  let totalPagesLogged = 0;
  const moodFrequency = {};
  const quotes = [];
  for (const log of sorted) {
    totalPagesLogged += Math.max(0, (log.endPage || 0) - (log.startPage || 0) + 1);
    if (log.mood) moodFrequency[log.mood] = (moodFrequency[log.mood] || 0) + 1;
    if (log.quote?.trim()) quotes.push({ date: log.date, quote: log.quote.trim() });
  }
  return {
    totalSessions: logs.length,
    totalPagesLogged,
    avgPagesPerSession: logs.length ? Math.round((totalPagesLogged / logs.length) * 10) / 10 : 0,
    moodFrequency,
    reflections: sorted.map((l) => ({ date: l.date, startPage: l.startPage, endPage: l.endPage, mood: l.mood, reflection: l.reflection, quote: l.quote })),
    quotes,
  };
}
