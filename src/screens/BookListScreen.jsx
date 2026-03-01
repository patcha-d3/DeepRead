import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLACEHOLDER_MD } from '../constants';
import { getBooks, deleteBook } from '../store/db';

function pct(b) {
  const total = b.totalPages || 1;
  const at = b.currentPage || 0;
  return Math.round((at / total) * 100);
}

export default function BookListScreen() {
  const nav = useNavigate();
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('reading'); // 'reading' | 'all'

  const load = useCallback(() => setBooks(getBooks()), []);
  useEffect(() => { load(); }, [load]);

  const reading = books.filter((b) => b.status === 'reading');
  const finished = books.filter((b) => b.status === 'finished');

  const goTo = (b) => {
    nav(b.status === 'reading' ? `/book/${b.id}` : `/summary/${b.id}`);
  };

  const handleDelete = (e, b) => {
    e.stopPropagation();
    if (window.confirm(`ลบ "${b.title}" ใช่ไหม? จะลบ log ทั้งหมดของหนังสือเล่มนี้ด้วย`)) {
      deleteBook(b.id);
      load();
    }
  };

  return (
    <div className="screen books-screen">
      <header className="journey-header">
        <h1>My Books</h1>
        <button type="button" className="all-books-btn" onClick={() => setFilter(filter === 'all' ? 'reading' : 'all')}>
          All Books
        </button>
      </header>
      <main className="main main-books">
        {reading.length > 0 && (
          <section className="books-section">
            <h3>Currently Reading</h3>
            <div className="book-row book-cards-mockup">
              {reading.map((b) => (
                <div key={b.id} className="book-card-wrap-mockup">
                  <button type="button" className="book-card-mockup" onClick={() => goTo(b)}>
                    <img src={b.coverUrl || PLACEHOLDER_MD} alt="" referrerPolicy="no-referrer" className="book-cover-grayscale" />
                    <div className="book-card-meta-mockup">
                      <span className="book-title-mockup">{b.title}</span>
                      <span className="book-author-mockup">{b.author || 'Author'}</span>
                      <div className="book-progress-mockup">
                        <div className="progress-track-mockup">
                          <div className="progress-fill-mockup" style={{ width: `${pct(b)}%` }} />
                        </div>
                        <span className="progress-pct">{pct(b)}% Read</span>
                      </div>
                    </div>
                  </button>
                  <button type="button" className="book-delete" onClick={(e) => handleDelete(e, b)} aria-label="ลบหนังสือ">×</button>
                </div>
              ))}
            </div>
          </section>
        )}
        {filter === 'all' && finished.length > 0 && (
          <section className="books-section">
            <h3>Finished</h3>
            <div className="book-row book-cards-mockup">
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
                  <button type="button" className="book-delete" onClick={(e) => handleDelete(e, b)} aria-label="ลบหนังสือ">×</button>
                </div>
              ))}
            </div>
          </section>
        )}
        {books.length === 0 && (
          <div className="empty-state">
            <p>No books yet.</p>
            <p className="hint">Add a book when you create your first reflection.</p>
          </div>
        )}
      </main>
      <button
        type="button"
        className="fab-new-book"
        onClick={() => nav('/log', { state: { showAddBook: true, fromBooks: true } })}
        aria-label="Add new book"
      >
        + New Book
      </button>
    </div>
  );
}
