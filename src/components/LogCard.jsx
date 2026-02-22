import { PLACEHOLDER_SM } from '../constants';

export default function LogCard({ log, book }) {
  const { startPage, endPage, mood, reflection, quote } = log;
  const coverUrl = book?.coverUrl || PLACEHOLDER_SM;
  return (
    <div className="log-card">
      <div className="log-card-header">
        <img src={coverUrl} alt="" className="log-card-cover" referrerPolicy="no-referrer" />
        <div className="log-card-meta">
          <h4>{book?.title || 'Unknown'}</h4>
          <span className="log-pages">Pages {startPage}–{endPage}</span>
          {mood && <span className="log-mood">{mood}</span>}
        </div>
      </div>
      {reflection && <p className="log-reflection">{reflection}</p>}
      {quote && <blockquote className="log-quote">&ldquo;{quote}&rdquo;</blockquote>}
    </div>
  );
}
