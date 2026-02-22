/**
 * DeepRead Store - Local storage (no backend)
 * Data: Books, ReadingLogs
 */

const KEY_BOOKS = 'deepread_books';
const KEY_LOGS = 'deepread_logs';

function loadBooks() {
  try {
    return JSON.parse(localStorage.getItem(KEY_BOOKS) || '[]');
  } catch {
    return [];
  }
}

function saveBooks(books) {
  localStorage.setItem(KEY_BOOKS, JSON.stringify(books));
}

function loadLogs() {
  try {
    return JSON.parse(localStorage.getItem(KEY_LOGS) || '[]');
  } catch {
    return [];
  }
}

function saveLogs(logs) {
  localStorage.setItem(KEY_LOGS, JSON.stringify(logs));
}

export function getBooks(status = null) {
  const books = loadBooks();
  if (status) return books.filter((b) => b.status === status);
  return books;
}

export function getBook(bookId) {
  return loadBooks().find((b) => b.id === bookId) || null;
}

export function createBook({ title, author, totalPages, coverUrl, isbn }) {
  const books = loadBooks();
  const id = Math.max(0, ...books.map((b) => b.id)) + 1;
  books.push({
    id,
    title,
    author: author || '',
    totalPages,
    status: 'reading',
    currentPage: 0,
    coverUrl: coverUrl || null,
    isbn: isbn || null,
    createdAt: new Date().toISOString(),
  });
  saveBooks(books);
  return id;
}

export function updateBook(bookId, updates) {
  const books = loadBooks();
  const i = books.findIndex((b) => b.id === bookId);
  if (i < 0) return;
  Object.assign(books[i], updates);
  saveBooks(books);
}

export function markBookFinished(bookId) {
  const book = getBook(bookId);
  if (!book) return;
  const logs = getLogsByBook(bookId);
  const maxPage = logs.length ? Math.max(...logs.map((l) => l.endPage)) : book.currentPage;
  updateBook(bookId, { status: 'finished', currentPage: maxPage });
}

export function deleteBook(bookId) {
  const books = loadBooks().filter((b) => b.id !== bookId);
  const logs = loadLogs().filter((l) => l.bookId !== bookId);
  saveBooks(books);
  saveLogs(logs);
}

export function getLogsByBook(bookId) {
  return loadLogs()
    .filter((l) => l.bookId === bookId)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.startPage - b.startPage));
}

export function getLogsByDate(date) {
  const logs = loadLogs().filter((l) => l.date === date);
  const books = loadBooks();
  return logs.map((l) => {
    const b = books.find((x) => x.id === l.bookId);
    return { ...l, title: b?.title, author: b?.author, coverUrl: b?.coverUrl, status: b?.status };
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getLastLogForBook(bookId) {
  const logs = getLogsByBook(bookId);
  return logs.length ? logs[logs.length - 1] : null;
}

export function createLog({ bookId, date, startPage, endPage, mood, reflection, quote }) {
  const logs = loadLogs();
  const id = Math.max(0, ...logs.map((l) => l.id)) + 1;
  logs.push({
    id,
    bookId,
    date,
    startPage,
    endPage,
    mood: mood || null,
    reflection: reflection || null,
    quote: quote || null,
    createdAt: new Date().toISOString(),
  });
  saveLogs(logs);
  updateBook(bookId, { currentPage: endPage });
  return id;
}

export function getLogsForMonth(year, month) {
  const m = String(month).padStart(2, '0');
  const start = `${year}-${m}-01`;
  const end = `${year}-${m}-31`;
  const logs = loadLogs();
  const books = loadBooks();
  return logs
    .filter((l) => l.date >= start && l.date <= end)
    .map((l) => {
      const b = books.find((x) => x.id === l.bookId);
      return { ...l, coverUrl: b?.coverUrl, title: b?.title };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}
