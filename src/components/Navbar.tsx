import './Navbar.css';

export type PlannerView = 'venues' | 'addons' | 'meals' | 'details';

type NavbarProps = {
  activeView?: PlannerView;
  onNavigate?: (view: PlannerView) => void;
};

const navigationLinks: { label: string; href: string; view: PlannerView }[] = [
  { label: 'Venues', href: '#venues', view: 'venues' },
  { label: 'Add-ons', href: '#addons', view: 'addons' },
  { label: 'Meals', href: '#meals', view: 'meals' },
  { label: 'Details', href: '#details', view: 'details' },
];

function Navbar({ activeView, onNavigate }: NavbarProps) {
  return (
    <header className="planner-navbar">
      <a className="planner-navbar-brand" href="/" aria-label="Conference Expense Planner home">
        <span className="planner-navbar-logo" aria-hidden="true">
          C
        </span>
        <span>Conference Planner</span>
      </a>

      <nav className="planner-navbar-links" aria-label="Main navigation">
        {navigationLinks.map((link) => (
          <a
            className={`planner-navbar-link${activeView === link.view ? ' is-active' : ''}`}
            href={link.href}
            key={link.href}
            aria-current={activeView === link.view ? 'page' : undefined}
            onClick={
              onNavigate
                ? (event) => {
                    event.preventDefault();
                    onNavigate(link.view);
                  }
                : undefined
            }
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
