import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLACEHOLDER_MD } from '../constants';
import { getBooks, deleteBook } from '../store/db';

export default function BookListScreen() {
  const nav = useNavigate();
  const [books, setBooks] = useState([]);

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
    <div className="screen">
      <header className="header">
        <h1>My Books</h1>
        <p>Tap to view details or summary</p>
      </header>
      <main className="main">
        <button className="cta cta-add-book" onClick={() => nav('/log', { state: { showAddBook: true, fromBooks: true } })}>
          + Add Book
        </button>
        {reading.length > 0 && (
          <section>
            <h3>Currently Reading</h3>
            <div className="book-row">
              {reading.map((b) => (
                <div key={b.id} className="book-card-wrap">
                  <button type="button" className="book-card" onClick={() => goTo(b)}>
                    <img src={b.coverUrl || PLACEHOLDER_MD} alt="" referrerPolicy="no-referrer" />
                    <div className="book-card-meta">
                      <span>{b.title}</span>
                      <span className="badge">Reading</span>
                    </div>
                  </button>
                  <button type="button" className="book-delete" onClick={(e) => handleDelete(e, b)} aria-label="ลบหนังสือ">×</button>
                </div>
              ))}
            </div>
          </section>
        )}
        {finished.length > 0 && (
          <section>
            <h3>Finished</h3>
            <div className="book-row">
              {finished.map((b) => (
                <div key={b.id} className="book-card-wrap">
                  <button type="button" className="book-card" onClick={() => goTo(b)}>
                    <img src={b.coverUrl || PLACEHOLDER_MD} alt="" referrerPolicy="no-referrer" />
                    <div className="book-card-meta">
                      <span>{b.title}</span>
                      <span className="badge done">Finished</span>
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
    </div>
  );
}
