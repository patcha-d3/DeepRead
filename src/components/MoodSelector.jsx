import './MoodSelector.css';

const MOODS = [
  { emoji: '😊', value: 'happy' },
  { emoji: '😐', value: 'neutral' },
  { emoji: '😌', value: 'calm' },
  { emoji: '🤔', value: 'thoughtful' },
  { emoji: '😢', value: 'sad' },
  { emoji: '😤', value: 'frustrated' },
  { emoji: '📚', value: 'engaged' },
];

export default function MoodSelector({ selected, onSelect }) {
  return (
    <div className="mood-selector">
      <label className="mood-label">How did you feel?</label>
      <div className="mood-row">
        {MOODS.map(({ emoji, value }) => (
          <button
            key={value}
            type="button"
            className={`mood-btn ${selected === value ? 'selected' : ''}`}
            onClick={() => onSelect(selected === value ? null : value)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
