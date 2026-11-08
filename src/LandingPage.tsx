import './LandingPage.css';

type LandingPageProps = {
  onGetStarted: () => void;
};

function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <a className="landing-brand" href="/" aria-label="Conference Expense Planner home">
          <span className="landing-brand-mark" aria-hidden="true">
            C
          </span>
          <span>Gather &amp; Grow</span>
        </a>
        <span className="landing-header-note">Plan smarter. Meet better.</span>
      </header>

      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-copy">
          <p className="landing-eyebrow">YOUR EVENT, ON BUDGET</p>
          <h1 id="landing-title">Conference Expense Planner</h1>
          <div className="landing-description">
            <p>
              Make every event budget easier to manage. Compare venue, meal, and
              add-on costs in one place, keep spending on track, and focus on
              bringing people together.
            </p>
          </div>
          <button
            className="landing-cta"
            type="button"
            onClick={onGetStarted}
          >
            Get Started
            <span aria-hidden="true">→</span>
          </button>
          <p className="landing-reassurance">
            A clearer plan for your next great conference.
          </p>
        </div>

        <div className="landing-preview" aria-hidden="true">
          <div className="landing-preview-top">
            <span>EVENT BUDGET</span>
            <span className="landing-status">ON TRACK</span>
          </div>
          <p className="landing-preview-event">Annual Summit 2026</p>
          <p className="landing-budget-total">$12,450</p>
          <p className="landing-budget-caption">planned event expenses</p>
          <div className="landing-budget-bar">
            <span />
          </div>
          <div className="landing-budget-labels">
            <span>Planned</span>
            <span>75% of budget</span>
          </div>
          <div className="landing-expenses">
            <div className="landing-expense">
              <span className="landing-expense-icon landing-expense-venue">V</span>
              <span>Venue</span>
              <strong>$6,200</strong>
            </div>
            <div className="landing-expense">
              <span className="landing-expense-icon landing-expense-meals">M</span>
              <span>Meals</span>
              <strong>$4,150</strong>
            </div>
            <div className="landing-expense">
              <span className="landing-expense-icon landing-expense-extras">+</span>
              <span>Add-ons</span>
              <strong>$2,100</strong>
            </div>
          </div>
        </div>
        <span className="landing-decoration landing-decoration-one" aria-hidden="true" />
        <span className="landing-decoration landing-decoration-two" aria-hidden="true" />
      </section>

      <footer className="landing-footer">
        Thoughtful planning starts with a clear picture of your costs.
      </footer>
    </main>
  );
}

export default LandingPage;
