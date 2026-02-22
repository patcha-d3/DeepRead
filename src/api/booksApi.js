/**
 * Book API - Open Library (free, no key)
 * Search: title, author
 * Cover: cover ID or ISBN
 */

// ใน dev ใช้ proxy เพื่อหลีกเลี่ยง CORS
const SEARCH_URL = import.meta.env.DEV
  ? '/ol-api/search.json'
  : 'https://openlibrary.org/search.json';
const COVER_BASE = 'https://covers.openlibrary.org/b';
const COVER_PROXY = '/ol-covers/b';

/**
 * Get cover URL from Open Library
 * ใช้ proxy ในโหมด dev เพื่อให้รูปโหลดได้
 */
export function getCoverUrl(coverId, isbn, size = 'M') {
  const base = import.meta.env.DEV ? COVER_PROXY : COVER_BASE;
  if (coverId) {
    return `${base}/id/${coverId}-${size}.jpg`;
  }
  if (isbn) {
    return `${base}/isbn/${isbn}-${size}.jpg`;
  }
  return null;
}

/**
 * Search books by query (title, author, or both)
 * @param {string} query
 * @param {number} limit
 * @returns {Promise<Array>} [{ title, author, totalPages, coverUrl, isbn }]
 */
export async function searchBooks(query, limit = 8) {
  const q = query.trim();
  if (!q) return [];

  const params = new URLSearchParams({
    q,
    limit: String(limit),
  });

  const res = await fetch(`${SEARCH_URL}?${params}`, {
    headers: { 'User-Agent': 'DeepRead/1.0 (reading-reflection-app)' },
  });

  if (!res.ok) throw new Error('Search failed');

  const data = await res.json();
  const docs = data.docs || [];

  return docs.map((d) => ({
    title: d.title || 'Unknown',
    author: Array.isArray(d.author_name) ? d.author_name.join(', ') : d.author_name || '',
    totalPages: d.number_of_pages_median || 0,
    coverUrl: getCoverUrl(d.cover_i, d.isbn?.[0]),
    isbn: Array.isArray(d.isbn) ? d.isbn[0] : d.isbn || null,
  }));
}
