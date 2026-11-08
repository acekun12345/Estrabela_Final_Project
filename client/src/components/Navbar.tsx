import './Navbar.css';

export type PlannerSection = 'venues' | 'addons' | 'meals';

type NavbarProps = {
  activeSection: PlannerSection;
  showDetails: boolean;
  onNavigate: (section: PlannerSection) => void;
  onToggleDetails: () => void;
};

const navigationLinks: { label: string; section: PlannerSection }[] = [
  { label: 'Venue', section: 'venues' },
  { label: 'Add-ons', section: 'addons' },
  { label: 'Meals', section: 'meals' },
];

function Navbar({
  activeSection,
  showDetails,
  onNavigate,
  onToggleDetails,
}: NavbarProps) {
  return (
    <header className="planner-navbar">
      <a
        className="planner-navbar-brand"
        href="#top"
        aria-label="Conference Expense Planner"
      >
        <span className="planner-navbar-logo" aria-hidden="true">
          C
        </span>
        <span>Conference Expense Planner</span>
      </a>

      <nav className="planner-navbar-links" aria-label="Planner sections">
        {navigationLinks.map((link) => (
          <button
            className={`planner-navbar-link${activeSection === link.section ? ' is-active' : ''}`}
            key={link.section}
            type="button"
            aria-current={activeSection === link.section ? 'location' : undefined}
            onClick={() => onNavigate(link.section)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <button
        className="planner-navbar-details"
        type="button"
        aria-expanded={showDetails}
        aria-controls="details"
        onClick={onToggleDetails}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </header>
  );
}

export default Navbar;
