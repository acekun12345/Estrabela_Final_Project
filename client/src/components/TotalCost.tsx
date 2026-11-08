import type { Addon } from './AddonsSelection';
import type { Meal } from './MealsSelection';
import type { Venue } from '../features/venues/VenueSelection';

type TotalCostProps = {
  venues: Venue[];
  venueQuantities: Record<string, number>;
  addons: Addon[];
  addonQuantities: Record<string, number>;
  meals: Meal[];
  mealQuantities: Record<string, number>;
  showDetails: boolean;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

function TotalCost({
  venues,
  venueQuantities,
  addons,
  addonQuantities,
  meals,
  mealQuantities,
  showDetails,
}: TotalCostProps) {
  const venueTotal = venues.reduce(
    (total, venue) =>
      total + venue.price * (venueQuantities[String(venue.id)] ?? 0),
    0,
  );
  const addonsTotal = addons.reduce(
    (total, addon) =>
      total + addon.price * (addonQuantities[String(addon.id)] ?? 0),
    0,
  );
  const mealsTotal = meals.reduce(
    (total, meal) =>
      total + meal.price * (mealQuantities[String(meal.id)] ?? 0),
    0,
  );
  const grandTotal = venueTotal + addonsTotal + mealsTotal;

  return (
    <section
      className="planner-summary"
      id="details"
      aria-labelledby="planner-summary-title"
    >
      {showDetails && (
        <div className="planner-summary__breakdown">
          <p className="planner-section__eyebrow">YOUR ESTIMATED BUDGET</p>
          <h2 id="planner-summary-title">Total Cost Breakdown</h2>
          <dl>
            <div>
              <dt>Venue Total</dt>
              <dd>{currencyFormatter.format(venueTotal)}</dd>
            </div>
            <div>
              <dt>Add-ons Total</dt>
              <dd>{currencyFormatter.format(addonsTotal)}</dd>
            </div>
            <div>
              <dt>Meals Total</dt>
              <dd>{currencyFormatter.format(mealsTotal)}</dd>
            </div>
          </dl>
        </div>
      )}
      <p className="planner-summary__grand-total" aria-live="polite">
        <span>Grand Total</span>
        <strong>{currencyFormatter.format(grandTotal)}</strong>
      </p>
    </section>
  );
}

export default TotalCost;
