import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import LogInScreen from './screens/LogInScreen';
import CalendarScreen from './screens/CalendarScreen';
import LogScreen from './screens/LogScreen';
import DateDetailScreen from './screens/DateDetailScreen';
import BookListScreen from './screens/BookListScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import SummaryScreen from './screens/SummaryScreen';
import ReadingStatsScreen from './screens/ReadingStatsScreen';
import BottomNav from './components/BottomNav';
import './App.css';

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <div className="app-content">{children}</div>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/home" element={<AppLayout><CalendarScreen /></AppLayout>} />
        <Route path="/books" element={<AppLayout><BookListScreen /></AppLayout>} />
        <Route path="/stats" element={<AppLayout><ReadingStatsScreen /></AppLayout>} />
        <Route path="/log" element={<LogScreen />} />
        <Route path="/date/:date" element={<DateDetailScreen />} />
        <Route path="/book/:bookId" element={<BookDetailScreen />} />
        <Route path="/summary/:bookId" element={<SummaryScreen />} />
        <Route path="/calendar" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
