import { useEffect, useState } from 'react';
import AddonsSelection, { type Addon } from './components/AddonsSelection';
import MealsSelection, { type Meal } from './components/MealsSelection';
import Navbar, { type PlannerView } from './components/Navbar';
import TotalCost from './components/TotalCost';
import LandingPage from './LandingPage';
import VenueSelection, { type Venue } from './features/venues/VenueSelection';

async function fetchCollection<T>(endpoint: string): Promise<T[]> {
  const response = await fetch(`http://localhost:5000/api/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Could not load ${endpoint} (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error(`The ${endpoint} response was not a list.`);
  }

  return data as T[];
}

function App() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>(
    {},
  );
  const [mealQuantities, setMealQuantities] = useState<Record<string, number>>(
    {},
  );
  const [activeView, setActiveView] = useState<PlannerView>('venues');
  const [hasStarted, setHasStarted] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    Promise.all([
      fetchCollection<Venue>('venues'),
      fetchCollection<Addon>('addons'),
      fetchCollection<Meal>('meals'),
    ])
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

  const selectedVenue =
    venues.find((venue) => venue.id === selectedVenueId) ?? null;

  if (!hasStarted) {
    return (
      <LandingPage
        onGetStarted={() => {
          setHasStarted(true);
          setActiveView('venues');
        }}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        color: '#f7f4ef',
        background: '#111916',
      }}
    >
      <Navbar activeView={activeView} onNavigate={setActiveView} />
      <main
        style={{
          width: 'min(1100px, calc(100% - 40px))',
          margin: '0 auto',
          padding: '40px 0 64px',
        }}
      >
        {loadError && (
          <p role="alert" style={{ color: '#ffb28a' }}>
            {loadError}
          </p>
        )}

        {activeView === 'venues' && (
          <VenueSelection
            venues={venues}
            selectedVenueId={selectedVenueId}
            onSelectVenue={(venue) => setSelectedVenueId(venue.id)}
          />
        )}

        {activeView === 'addons' && (
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
        )}

        {activeView === 'meals' && (
          <MealsSelection
            meals={meals}
            quantities={mealQuantities}
            onQuantityChange={(mealId, quantity) =>
              setMealQuantities((current) => ({
                ...current,
                [mealId]: quantity,
              }))
            }
          />
        )}

        {activeView === 'details' && (
          <TotalCost
            venue={selectedVenue}
            venueQuantity={selectedVenue ? 1 : 0}
            addons={addons}
            addonQuantities={addonQuantities}
            meals={meals}
            mealQuantities={mealQuantities}
          />
        )}
      </main>
    </div>
  );
}

export default App;
