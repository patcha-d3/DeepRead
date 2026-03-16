import './ReadingStatsScreen.css';
import InfoCard from '../components/InfoCard';

/**
 * Reading Stats - 2nd phase (IA)
 * Sections: Reading Trend, Heat map, Reading Total
 */
export default function ReadingStatsScreen() {
  return (
    <div className="screen stats-screen">
      <header className="journey-header">
        <div>
          <h1>Reading<br />Stats</h1>
          <p className="phase-badge">Coming in Phase 2</p>
        </div>
      </header>
      <main className="main">
        <div className="stats-placeholder">
          <InfoCard
            className="stats-placeholder-card"
            title="Reading Trend"
            subtitle="Track your reading habits over time"
          />
          <InfoCard
            className="stats-placeholder-card"
            title="Heat map"
            subtitle="Visualize your reading activity"
          />
          <InfoCard
            className="stats-placeholder-card"
            title="Reading Total"
            subtitle="Total books and pages read"
          />
        </div>
      </main>
    </div>
  );
}
