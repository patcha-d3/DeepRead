import { useState, useEffect, useRef } from 'react';
import './FilterDropdown.css';

export default function FilterDropdown({ options, value, onChange, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = options.find((o) => o.value === value)?.label ?? '';

  return (
    <div className="filter-dropdown" ref={wrapRef}>
      <button
        type="button"
        className="filter-dropdown__trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
      >
        {currentLabel}
        <span className="filter-dropdown__chevron" aria-hidden>
          ▼
        </span>
      </button>
      {open && (
        <ul className="filter-dropdown__menu" role="listbox">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                role="option"
                aria-selected={value === opt.value}
                className={
                  value === opt.value
                    ? 'filter-dropdown__item filter-dropdown__item--active'
                    : 'filter-dropdown__item'
                }
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
