import { useEffect, useState } from 'react';
import './App.css';
import AddonsSelection from './components/AddonsSelection';
import './components/ConferenceEvent.css';
import MealsSelection from './components/MealsSelection';
import Navbar, { type PlannerSection } from './components/Navbar';
import TotalCost from './components/TotalCost';
import LandingPage from './LandingPage';
import VenueSelection from './features/venues/VenueSelection';
import {
  getAddons,
  getMeals,
  getVenues,
  type Addon,
  type Meal,
  type Venue,
} from './services/api';
 
// Presentation lang: mga elements na lalabas habang nag-i-scroll
const REVEAL_SELECTOR = [
  '.conference-event__main > :not(.planner-intro):not(.planner-error)',
  '.conference-event__main [class*="card"]',
  '.conference-event__main [class*="item"]',
].join(', ');
 
function App() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [venueQuantities, setVenueQuantities] = useState<
    Record<string, number>
  >({});
  const [addonQuantities, setAddonQuantities] = useState<
    Record<string, number>
  >({});
  const [mealQuantities, setMealQuantities] = useState<Record<string, number>>(
    {},
  );
  const [guestCount, setGuestCount] = useState(1);
  const [activeSection, setActiveSection] = useState<PlannerSection>('venues');
  const [showDetails, setShowDetails] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
 
  useEffect(() => {
    let isCurrent = true;
 
    Promise.all([getVenues(), getAddons(), getMeals()])
      .then(([venueData, addonData, mealData]) => {
        if (!isCurrent) return;
        setVenues(venueData);
        setAddons(addonData);
        setMeals(mealData);
      })
      .catch((error: unknown) => {
        if (!isCurrent) return;
        setLoadError(
          error instanceof Error
            ? error.message
            : 'Could not load the event options.',
        );
      });
 
    return () => {
      isCurrent = false;
    };
  }, []);
 
  // Scroll-reveal animation (walang kinalaman sa data o back end)
  const loadedCount = venues.length + addons.length + meals.length;
  useEffect(() => {
    if (!hasStarted) return;
 
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
 
    const fresh = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    ).filter((el) => !el.hasAttribute('data-reveal'));
 
    if (reduceMotion) {
      fresh.forEach((el) => el.setAttribute('data-reveal', 'in'));
      return;
    }
 
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-reveal', 'in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
 
    fresh.forEach((el) => {
      const index = Array.from(el.parentElement?.children ?? []).indexOf(el);
      el.style.setProperty('--reveal-delay', `${Math.min(index, 6) * 70}ms`);
      el.setAttribute('data-reveal', '');
      observer.observe(el);
    });
 
    return () => observer.disconnect();
  }, [hasStarted, loadedCount]);
 
  const navigateTo = (section: PlannerSection) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
 
  const updateGuestCount = (nextCount: number) => {
    const safeCount = Number.isFinite(nextCount)
      ? Math.min(10000, Math.max(1, Math.floor(nextCount)))
      : 1;
    setGuestCount(safeCount);
    setMealQuantities((current) =>
      Object.fromEntries(
        Object.entries(current)
          .filter(([, quantity]) => quantity > 0)
          .map(([mealId]) => [mealId, safeCount]),
      ),
    );
  };
 
  if (!hasStarted) {
    return <LandingPage onGetStarted={() => setHasStarted(true)} />;
  }
 
  return (
    <div className="conference-event" id="top">
      <Navbar
        activeSection={activeSection}
        showDetails={showDetails}
        onNavigate={navigateTo}
        onToggleDetails={() => {
          setShowDetails((current) => !current);
          if (!showDetails) {
            window.setTimeout(
              () =>
                document
                  .getElementById('details')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
              0,
            );
          }
        }}
      />
      <main className="conference-event__main">
        <section className="planner-intro" aria-labelledby="planner-title">
          <p className="planner-intro__eyebrow">PLAN YOUR NEXT GATHERING</p>
          <h1 id="planner-title">Conference Expense Planner</h1>
          <p>Select your venue, add-ons, and meals below.</p>
        </section>
 
        {loadError && (
          <p className="planner-error" role="alert">
            {loadError}
          </p>
        )}
 
        <VenueSelection
          venues={venues}
          quantities={venueQuantities}
          onQuantityChange={(venueId, quantity) =>
            setVenueQuantities((current) => ({
              ...current,
              [venueId]: quantity,
            }))
          }
        />
 
        <AddonsSelection
          addons={addons}
          selectedQuantities={addonQuantities}
          onQuantityChange={(addonId, quantity) =>
            setAddonQuantities((current) => ({
              ...current,
              [addonId]: quantity,
            }))
          }
        />
 
        <MealsSelection
          meals={meals}
          quantities={mealQuantities}
          guestCount={guestCount}
          onGuestCountChange={updateGuestCount}
          onQuantityChange={(mealId, quantity) =>
            setMealQuantities((current) => ({
              ...current,
              [mealId]: quantity > 0 ? guestCount : 0,
            }))
          }
        />
 
        <TotalCost
          venues={venues}
          venueQuantities={venueQuantities}
          addons={addons}
          addonQuantities={addonQuantities}
          meals={meals}
          mealQuantities={mealQuantities}
          showDetails={showDetails}
        />
      </main>
    </div>
  );
}
 
export default App;