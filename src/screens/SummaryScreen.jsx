import { useNavigate, useParams } from 'react-router-dom';
import { getBook, getLogsByBook } from '../store/db';
import { aggregateLogs } from '../utils/aggregateLogs';

export default function SummaryScreen() {
  const nav = useNavigate();
  const { bookId } = useParams();
  const book = bookId ? getBook(+bookId) : null;
  const logs = bookId ? getLogsByBook(+bookId) : [];
  const agg = aggregateLogs(logs);

  if (!book) return <div className="screen"><main className="main"><p>Book not found</p></main></div>;

  return (
    <div className="screen">
      <header className="header-small">
        <button type="button" onClick={() => nav(-1)}>‹ Back</button>
      </header>
      <main className="main summary-main">
        <h2>{book.title}</h2>
        {book.author && <p className="author">by {book.author}</p>}
        <div className="stats">
          <div className="stat-card"><span className="stat-value">{agg.totalSessions}</span><span className="stat-label">Total sessions</span></div>
          <div className="stat-card"><span className="stat-value">{agg.totalPagesLogged}</span><span className="stat-label">Pages logged</span></div>
          <div className="stat-card"><span className="stat-value">{agg.avgPagesPerSession}</span><span className="stat-label">Avg/session</span></div>
        </div>
        {Object.keys(agg.moodFrequency).length > 0 && (
          <section>
            <h3>Mood breakdown</h3>
            <div className="mood-breakdown">
              {Object.entries(agg.moodFrequency).map(([m, count]) => (
                <span key={m} className="mood-chip">{m} {count}</span>
              ))}
            </div>
          </section>
        )}
        {agg.reflections.length > 0 && (
          <section>
            <h3>Reflection archive</h3>
            {agg.reflections.map((r, i) => (
              <div key={i} className="ref-card">
                <span className="ref-date">{r.date}</span>
                <span className="ref-pages">Pages {r.startPage}–{r.endPage}</span>
                {r.reflection && <p>{r.reflection}</p>}
                {r.quote && <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>}
              </div>
            ))}
          </section>
        )}
        {agg.quotes.length > 0 && (
          <section>
            <h3>Collected quotes</h3>
            {agg.quotes.map((q, i) => (
              <div key={i} className="quote-card">
                <p>&ldquo;{q.quote}&rdquo;</p>
                <span className="quote-date">{q.date}</span>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
