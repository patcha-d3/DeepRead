import { NavLink } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/home" end className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="nav-label">Home</span>
      </NavLink>
      <NavLink to="/books" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="nav-label">My Books</span>
      </NavLink>
      <NavLink to="/stats" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="nav-label">Reading Stats</span>
      </NavLink>
    </nav>
  );
}
