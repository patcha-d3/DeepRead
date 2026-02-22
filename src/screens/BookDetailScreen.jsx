import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import LogCard from '../components/LogCard';
import { PLACEHOLDER_MD } from '../constants';
import { getBook, getLogsByBook, markBookFinished } from '../store/db';

export default function BookDetailScreen() {
  const nav = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (bookId) {
      setBook(getBook(+bookId));
      setLogs(getLogsByBook(+bookId));
    }
  }, [bookId]);

  const today = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;

  const handleFinish = () => {
    if (!confirm('Mark this book as finished? Your reading journal will be compiled.')) return;
    markBookFinished(+bookId);
    nav(`/summary/${bookId}`, { replace: true });
  };

  if (!book) return <div className="screen"><main className="main"><p>Book not found</p></main></div>;

  return (
    <div className="screen">
      <header className="header-small">
        <button type="button" onClick={() => nav(-1)}>‹ Back</button>
      </header>
      <main className="main">
        <img src={book.coverUrl || PLACEHOLDER_MD} alt="" className="book-cover" referrerPolicy="no-referrer" />
        <h2>{book.title}</h2>
        {book.author && <p className="author">by {book.author}</p>}
        <ProgressBar currentPage={book.currentPage} totalPages={book.totalPages} />
        <button className="btn-primary" onClick={() => nav('/log', { state: { bookId: book.id, date: today } })}>
          Add reflection
        </button>
        <button className="btn-outline" onClick={handleFinish}>Mark as Finished</button>
        {logs.length > 0 && (
          <section>
            <h3>Reading logs</h3>
            {logs.slice(-5).reverse().map((log) => (
              <LogCard key={log.id} log={log} book={book} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
