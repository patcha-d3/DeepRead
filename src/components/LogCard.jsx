import { PLACEHOLDER_SM } from '../constants';
import './LogCard.css';

const MOOD_EMOJI = {
  happy: '😊',
  neutral: '😐',
  calm: '😌',
  thoughtful: '🤔',
  sad: '😢',
  frustrated: '😤',
  engaged: '📚',
  surprised: '🤯',
  disgusted: '🤮',
  nauseated: '🤢',
  sick: '🤒',
  injured: '🤕',
  robot: '🤖',
  hug: '🤗',
  clown: '🤡',
  love: '❤️',
  heartbroken: '💔',
  romantic: '💕',
  dizzy: '😵‍💫',
};

export default function LogCard({ log, book }) {
  const { startPage, endPage, mood, reflection, quote } = log;
  const coverUrl = book?.coverUrl || PLACEHOLDER_SM;

  const moodValues = Array.isArray(mood) ? mood : mood ? [mood] : [];
  const moodEmojis = moodValues
    .map((m) => MOOD_EMOJI[m] || null)
    .filter(Boolean)
    .join(' ');

  return (
    <div className="log-card">
      <div className="log-card-header">
        <img src={coverUrl} alt="" className="log-card-cover" referrerPolicy="no-referrer" />
        <div className="log-card-meta">
          <h4>{book?.title || 'Unknown'}</h4>
          <span className="log-pages">Pages {startPage}–{endPage}</span>
          {moodEmojis && <span className="log-mood">{moodEmojis}</span>}
        </div>
      </div>
      {reflection && (
        <p className="log-reflection">
          {moodEmojis && <span className="log-mood-emojis">{moodEmojis} </span>}
          {reflection}
        </p>
      )}
      {quote && <blockquote className="log-quote">&ldquo;{quote}&rdquo;</blockquote>}
    </div>
  );
}
