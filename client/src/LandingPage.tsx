import './LandingPage.css';

type LandingPageProps = {
  onGetStarted: () => void;
};

function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <main className="landing-page" id="top">
      <header className="landing-header">
        <a
          className="landing-brand"
          href="#top"
          aria-label="Conference Expense Planner home"
        >
          <span className="landing-brand-mark" aria-hidden="true">
            C
          </span>
          <span>Conference Expense Planner</span>
        </a>
      </header>

      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-copy">
          <p className="landing-eyebrow">PLAN YOUR NEXT EVENT SEAMLESSLY</p>
          <h1 id="landing-title">Conference Expense Planner</h1>
          <p className="landing-tagline">
            Plan your next event seamlessly with automated budget calculation.
          </p>
          <button
            className="landing-cta"
            type="button"
            onClick={onGetStarted}
          >
            Get Started
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <aside className="landing-description-card">
          <p>
            Welcome to <strong>Conference Expense Planner</strong>, your
            all-in-one solution for managing event costs efficiently.
          </p>
          <p>
            Easily select suitable <strong>Venue Rooms</strong>, equipment{' '}
            <strong>Add-ons</strong>, and tailored <strong>Meal Packages</strong>{' '}
            for your attendees with real-time budget tracking.
          </p>
          <p>
            Click <strong>Get Started</strong> to customize your event
            requirements and streamline your planning process today!
          </p>
        </aside>
      </section>
    </main>
  );
}

export default LandingPage;
