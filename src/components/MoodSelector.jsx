import './MoodSelector.css';

const MOODS = [
  { emoji: '😊', value: 'happy' },
  { emoji: '😐', value: 'neutral' },
  { emoji: '😌', value: 'calm' },
  { emoji: '🤔', value: 'thoughtful' },
  { emoji: '😢', value: 'sad' },
  { emoji: '😤', value: 'frustrated' },
  { emoji: '📚', value: 'engaged' },
  { emoji: '🤯', value: 'surprised' },
  { emoji: '🤮', value: 'disgusted' },
  { emoji: '🤢', value: 'nauseated' },
  { emoji: '🤧', value: 'sick' },
  { emoji: '🤒', value: 'sick' },
  { emoji: '🤕', value: 'injured' },
  { emoji: '🤖', value: 'robot' },
  { emoji: '🤗', value: 'hug' },
  { emoji: '🤡', value: 'clown' },
  { emoji: '❤️', value: 'love' },
  { emoji: '💔', value: 'heartbroken' },
  { emoji: '💕', value: 'romantic' },
  { emoji: '😵‍💫', value: 'dizzy' },
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
            className={`mood-btn ${
              Array.isArray(selected)
                ? selected.includes(value)
                  ? 'selected'
                  : ''
                : selected === value
                ? 'selected'
                : ''
            }`}
            onClick={() => {
              if (Array.isArray(selected)) {
                const isActive = selected.includes(value);
                const next = isActive
                  ? selected.filter((v) => v !== value)
                  : [...selected, value];
                onSelect(next);
              } else {
                onSelect(selected === value ? null : value);
              }
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
