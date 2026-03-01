/**
 * Calculate reading streak: consecutive days with logs, counting backwards from today.
 */
import { getLogsForMonth } from '../store/db';

function getUniqueDatesWithLogs(year, month) {
  const rows = getLogsForMonth(year, month);
  const set = new Set();
  rows.forEach((r) => set.add(r.date));
  return set;
}

export function getReadingStreak() {
  const now = new Date();
  let streak = 0;
  let check = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  while (true) {
    const date = `${check.getFullYear()}-${String(check.getMonth() + 1).padStart(2, '0')}-${String(check.getDate()).padStart(2, '0')}`;
    const dates = getUniqueDatesWithLogs(check.getFullYear(), check.getMonth() + 1);
    if (!dates.has(date)) break;
    streak++;
    check.setDate(check.getDate() - 1);
  }

  return streak;
}
