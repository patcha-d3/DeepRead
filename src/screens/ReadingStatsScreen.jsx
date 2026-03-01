/**
 * Reading Stats - 2nd phase (IA)
 * Sections: Reading Trend, Heat map, Reading Total
 */
export default function ReadingStatsScreen() {
  return (
    <div className="screen stats-screen">
      <header className="journey-header">
        <div>
          <h1>Reading Stats</h1>
          <p className="phase-badge">Coming in Phase 2</p>
        </div>
      </header>
      <main className="main">
        <div className="stats-placeholder">
          <div className="stats-placeholder-card">
            <h3>Reading Trend</h3>
            <p>Track your reading habits over time</p>
          </div>
          <div className="stats-placeholder-card">
            <h3>Heat map</h3>
            <p>Visualize your reading activity</p>
          </div>
          <div className="stats-placeholder-card">
            <h3>Reading Total</h3>
            <p>Total books and pages read</p>
          </div>
        </div>
      </main>
    </div>
  );
}
