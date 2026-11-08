import './Navbar.css';

const navigationLinks = [
  { label: 'Venues', href: '#venues' },
  { label: 'Add-ons', href: '#addons' },
  { label: 'Meals', href: '#meals' },
  { label: 'Details', href: '#details' },
];

function Navbar() {
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
          <a className="planner-navbar-link" href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
