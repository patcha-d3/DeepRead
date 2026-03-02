import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import './LogScreen.css';
import MoodSelector from '../components/MoodSelector';
import { searchBooks } from '../api/booksApi';
import { PLACEHOLDER_MD } from '../constants';
import {
  getBooks,
  getBook,
  createBook,
  getLastLogForBook,
  getCurrentPageForBook,
  createLog,
} from '../store/db';

function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function LogScreen() {
  const nav = useNavigate();
  const loc = useLocation();
  const stateDate = loc.state?.date;
  const bookIdParam = loc.state?.bookId;
  const initialDate = stateDate || getToday();

  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(bookIdParam || null);
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [mood, setMood] = useState(null);
  const [reflection, setReflection] = useState('');
  const [quote, setQuote] = useState('');
  const [showAddBook, setShowAddBook] = useState(loc.state?.showAddBook ?? false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newTotalPages, setNewTotalPages] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [selectedFromSearch, setSelectedFromSearch] = useState(null);
  const [date] = useState(initialDate);

  const doSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    setSearchError(null);
    try {
      const results = await searchBooks(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setSearchResults([]);
      setSearchError(err?.message || 'Search failed. Try again.');
    } finally {
      setSearching(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }
    const t = setTimeout(doSearch, 400);
    return () => clearTimeout(t);
  }, [searchQuery, doSearch]);

  useEffect(() => {
    setBooks(getBooks('reading'));
  }, []);

  useEffect(() => {
    if (bookIdParam) setSelectedBookId(bookIdParam);
  }, [bookIdParam]);

  useEffect(() => {
    if (loc.state?.showAddBook) setShowAddBook(true);
  }, [loc.state?.showAddBook]);

  useEffect(() => {
    if (selectedBookId) {
      const last = getLastLogForBook(selectedBookId);
      setStartPage(last ? String(last.endPage + 1) : '1');
    } else setStartPage('');
  }, [selectedBookId]);

  const book = selectedBookId ? getBook(selectedBookId) : null;
  const totalPages = book?.totalPages || 1;
  const endNum = parseInt(endPage, 10) || 0;
  const startNum = parseInt(startPage, 10) || 0;
  const currentPage = Math.max(getCurrentPageForBook(selectedBookId || 0) || 0, endNum);
  const isValid = endNum >= startNum && startNum > 0 && selectedBookId;

  const handleSave = () => {
    if (!isValid) return;
    createLog({
      bookId: selectedBookId,
      date,
      startPage: startNum,
      endPage: endNum,
      mood,
      reflection: reflection.trim() || null,
      quote: quote.trim() || null,
    });
    nav(-1);
  };

  const handleAddBook = () => {
    const title = newTitle.trim();
    const raw = String(newTotalPages || '').replace(/\D/g, '');
    const total = raw ? parseInt(raw, 10) : 0;
    if (!title) {
      alert('Please enter book title.');
      return;
    }
    if (!total || total < 1) {
      alert('Please enter total pages (at least 1).');
      return;
    }
    const id = createBook({
      title,
      author: newAuthor.trim() || null,
      totalPages: total,
      coverUrl: selectedFromSearch?.coverUrl || null,
      isbn: selectedFromSearch?.isbn || null,
    });
    if (loc.state?.fromBooks) {
      nav('/books');
      return;
    }
    setBooks(getBooks('reading'));
    setSelectedBookId(id);
    setShowAddBook(false);
    setNewTitle('');
    setNewAuthor('');
    setNewTotalPages('');
    setSearchQuery('');
    setSearchResults([]);
    setSelectedFromSearch(null);
  };

  const handlePickFromSearch = (hit) => {
    setSelectedFromSearch(hit);
    setNewTitle(hit.title);
    setNewAuthor(hit.author || '');
    setNewTotalPages(hit.totalPages > 0 ? String(hit.totalPages) : '');
  };

  if (showAddBook) {
    return (
      <div className="screen log-screen">
        <main className="main">
          <h2>Add New Book</h2>
          <label>Search by title or author</label>
          <input
            type="text"
            placeholder="e.g. Babel R.F. Kuang"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searching && <p className="search-status">Searching...</p>}
          {searchError && <p className="search-error">{searchError}</p>}
          {!searching && searchQuery.trim() && searchResults.length === 0 && !searchError && (
            <p className="search-status">No books found. Try another search.</p>
          )}
          {searchResults.length > 0 && !selectedFromSearch && (
            <div className="search-results">
              {searchResults.map((hit, i) => (
                <button
                  key={i}
                  type="button"
                  className="search-result-card"
                  onClick={() => handlePickFromSearch(hit)}
                >
                  <img src={hit.coverUrl || PLACEHOLDER_MD} alt="" referrerPolicy="no-referrer" />
                  <div>
                    <strong>{hit.title}</strong>
                    {hit.author && <span>{hit.author}</span>}
                    {hit.totalPages > 0 && <span>{hit.totalPages} pages</span>}
                  </div>
                </button>
              ))}
            </div>
          )}
          {selectedFromSearch && (
            <div className="selected-book-preview">
              <div className="selected-book-header">
                <img src={selectedFromSearch.coverUrl || PLACEHOLDER_MD} alt="" referrerPolicy="no-referrer" />
                <div>
                  <strong>{selectedFromSearch.title}</strong>
                  {selectedFromSearch.author && <span>{selectedFromSearch.author}</span>}
                </div>
                <button type="button" className="change-book-btn" onClick={() => setSelectedFromSearch(null)}>Change</button>
              </div>
              <label>Total pages *</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 273"
                value={newTotalPages}
                onChange={(e) => setNewTotalPages(e.target.value)}
              />
              <button className="btn-primary" onClick={handleAddBook}>Add Book</button>
            </div>
          )}
          {!selectedFromSearch && (
            <>
              <hr className="add-book-divider" />
              <label>Or add manually</label>
              <input
                type="text"
                placeholder="Book title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Author (optional)"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Total pages (e.g. 273)"
                value={newTotalPages}
                onChange={(e) => setNewTotalPages(e.target.value)}
              />
              <button className="btn-primary" onClick={handleAddBook}>Add Book</button>
            </>
          )}
          <button className="btn-ghost" onClick={() => loc.state?.fromBooks ? nav('/books') : setShowAddBook(false)}>Cancel</button>
        </main>
      </div>
    );
  }

  return (
    <div className="screen log-screen">
      <main className="main">
        {book && (
          <div className="log-book-header">
            <img src={book.coverUrl || PLACEHOLDER_MD} alt="" referrerPolicy="no-referrer" />
            <div>
              <h2>{book.title}</h2>
              <span>{book.totalPages} pages</span>
            </div>
          </div>
        )}

        <div className="card">
          {!book ? (
            <div className="book-select">
              <label>Select a book</label>
              <div className="book-chips">
                {books.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`chip ${selectedBookId === b.id ? 'active' : ''}`}
                    onClick={() => setSelectedBookId(b.id)}
                  >
                    {b.title}
                  </button>
                ))}
                <button type="button" className="chip-add" onClick={() => setShowAddBook(true)}>
                  + Add book
                </button>
              </div>
            </div>
          ) : (
            <>
              <label>Start page (from last log)</label>
              <input type="text" value={startPage} readOnly />
              <label>End page</label>
              <input
                type="number"
                value={endPage}
                onChange={(e) => setEndPage(e.target.value)}
                placeholder="e.g. 116"
              />
              <ProgressBar currentPage={currentPage} totalPages={totalPages} />
            </>
          )}
        </div>

        {book && (
          <>
            <MoodSelector selected={mood} onSelect={setMood} />
            <label>Reflection</label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What did you think? How did it make you feel?"
              rows={4}
            />
            <label>Quote (optional)</label>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="A memorable quote from your reading..."
              rows={2}
            />
            <button
              className="btn-primary"
              onClick={handleSave}
              disabled={!isValid}
            >
              Save Reflection
            </button>
          </>
        )}
      </main>
    </div>
  );
}
