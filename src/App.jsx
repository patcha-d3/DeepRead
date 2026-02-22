import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import CalendarScreen from './screens/CalendarScreen';
import LogScreen from './screens/LogScreen';
import DateDetailScreen from './screens/DateDetailScreen';
import BookListScreen from './screens/BookListScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import SummaryScreen from './screens/SummaryScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="app-nav">
          <NavLink to="/" end>Calendar</NavLink>
          <NavLink to="/books">My Books</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<CalendarScreen />} />
          <Route path="/log" element={<LogScreen />} />
          <Route path="/date/:date" element={<DateDetailScreen />} />
          <Route path="/books" element={<BookListScreen />} />
          <Route path="/book/:bookId" element={<BookDetailScreen />} />
          <Route path="/summary/:bookId" element={<SummaryScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
