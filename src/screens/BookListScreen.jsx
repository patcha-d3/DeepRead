import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { PLACEHOLDER_MD } from '../constants';
import './BookListScreen.css';
import { getBooks, deleteBook, getCurrentPageForBook } from '../store/db';

const FILTER_OPTIONS = [
  { value: 'all', label: 'All books' },
  { value: 'reading', label: 'Currently reading' },
  { value: 'finished', label: 'Finished' },
];

function getProgress(b) {
  const total = Math.max(1, Number(b.totalPages) || 1);
  const current = getCurrentPageForBook(b.id);
  const effectiveTotal = Math.max(total, current);
  const pct = effectiveTotal > 0 ? Math.min(100, (current / effectiveTotal) * 100) : 0;
  return { current, total: effectiveTotal, pct: Math.round(pct) };
}

export default function BookListScreen() {
  const nav = useNavigate();
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'reading' | 'finished'
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const load = useCallback(() => setBooks(getBooks()), []);
  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const reading = books.filter((b) => b.status === 'reading');
  const finished = books.filter((b) => b.status === 'finished');

  const goTo = (b) => {
    nav(b.status === 'reading' ? `/book/${b.id}` : `/summary/${b.id}`);
  };

  const handleDelete = (e, b) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${b.title}"? This will also remove all reading logs for this book.`)) {
      deleteBook(b.id);
      load();
    }
  };

  const currentFilterLabel = FILTER_OPTIONS.find((o) => o.value === filter)?.label || 'All books';

  return (
    <div className="screen books-screen">
      <header className="journey-header">
        <h1>My<br />Books</h1>
        <div className="filter-dropdown-wrap" ref={dropdownRef}>
          <Button
            type="button"
            as="button"
            variant="outline"
            className="filter-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
          >
            {currentFilterLabel}
            <span className="filter-dropdown-chevron">▼</span>
          </Button>
          {dropdownOpen && (
            <ul className="filter-dropdown-menu" role="listbox">
              {FILTER_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={filter === opt.value}
                    className={`filter-dropdown-item ${filter === opt.value ? 'active' : ''}`}
                    onClick={() => {
                      setFilter(opt.value);
                      setDropdownOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
      <main className="main main-books">
        {(filter === 'all' || filter === 'reading') && reading.length > 0 && (
          <section className="books-section">
            <h3>Currently Reading</h3>
            <div className="book-cards-mockup">
              {reading.map((b) => {
                const p = getProgress(b);
                return (
                <div key={b.id} className="book-card-wrap-mockup">
                  <button type="button" className="book-card-mockup" onClick={() => goTo(b)}>
                    <img src={b.coverUrl || PLACEHOLDER_MD} alt="" referrerPolicy="no-referrer" className="book-cover-grayscale" />
                    <div className="book-card-meta-mockup">
                      <span className="book-title-mockup">{b.title}</span>
                      <span className="book-author-mockup">{b.author || 'Author'}</span>
                      <div className="book-progress-mockup">
                        <div className="progress-track-mockup">
                          <div className="progress-fill-mockup" style={{ width: `${p.pct}%` }} />
                        </div>
                        <span className="progress-pct">{p.pct}% Read</span>
                      </div>
                    </div>
                  </button>
                  <button type="button" className="book-delete" onClick={(e) => handleDelete(e, b)} aria-label="Delete book">×</button>
                </div>
              );
              })}
            </div>
          </section>
        )}
        {(filter === 'all' || filter === 'finished') && finished.length > 0 && (
          <section className="books-section">
            <h3>Finished</h3>
            <div className="book-cards-mockup">
              {finished.map((b) => (
                <div key={b.id} className="book-card-wrap-mockup">
                  <button type="button" className="book-card-mockup" onClick={() => goTo(b)}>
                    <img src={b.coverUrl || PLACEHOLDER_MD} alt="" referrerPolicy="no-referrer" className="book-cover-grayscale" />
                    <div className="book-card-meta-mockup">
                      <span className="book-title-mockup">{b.title}</span>
                      <span className="book-author-mockup">{b.author || 'Author'}</span>
                      <span className="book-badge-finished">Finished</span>
                    </div>
                  </button>
                  <button type="button" className="book-delete" onClick={(e) => handleDelete(e, b)} aria-label="Delete book">×</button>
                </div>
              ))}
            </div>
          </section>
        )}
        {books.length === 0 && (
          <EmptyState
            title="No books yet."
            body="Add a book when you create your first reflection."
          />
        )}
        {books.length > 0 && filter === 'reading' && reading.length === 0 && (
          <EmptyState title="No books currently reading." />
        )}
        {books.length > 0 && filter === 'finished' && finished.length === 0 && (
          <EmptyState title="No finished books yet." />
        )}
      </main>
      <Button
        type="button"
        as="button"
        variant="primary"
        className="fab-new-book"
        onClick={() => nav('/log', { state: { showAddBook: true, fromBooks: true } })}
        aria-label="Add new book"
      >
        + New Book
      </Button>
    </div>
  );
}
