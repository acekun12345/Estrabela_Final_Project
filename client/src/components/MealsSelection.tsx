import { useState } from 'react';

export type Meal = {
  id: number;
  name: string;
  price: number;
};

type MealsSelectionProps = {
  meals: Meal[];
  quantities?: Record<string, number>;
  guestCount?: number;
  onGuestCountChange?: (guestCount: number) => void;
  onQuantityChange?: (mealId: number, quantity: number) => void;
};

const mealImages: Record<string, string> = {
  breakfast:
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=720&q=80',
  'high tea':
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=720&q=80',
  lunch:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=720&q=80',
  dinner:
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=720&q=80',
};

const fallbackImage = mealImages.lunch;

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

function MealsSelection({
  meals,
  quantities: controlledQuantities,
  guestCount: controlledGuestCount,
  onGuestCountChange,
  onQuantityChange,
}: MealsSelectionProps) {
  const [internalQuantities, setInternalQuantities] = useState<
    Record<string, number>
  >({});
  const [internalGuestCount, setInternalGuestCount] = useState(1);
  const quantities = controlledQuantities ?? internalQuantities;
  const guestCount = controlledGuestCount ?? internalGuestCount;

  const changeGuestCount = (value: number) => {
    const count = Number.isFinite(value)
      ? Math.min(10000, Math.max(1, Math.floor(value)))
      : 1;

    if (onGuestCountChange) {
      onGuestCountChange(count);
    } else {
      setInternalGuestCount(count);
      setInternalQuantities((current) =>
        Object.fromEntries(
          Object.entries(current)
            .filter(([, quantity]) => quantity > 0)
            .map(([mealId]) => [mealId, count]),
        ),
      );
    }
  };

  const toggleMeal = (mealId: number) => {
    const selected = (quantities[String(mealId)] ?? 0) > 0;
    const quantity = selected ? 0 : guestCount;

    if (onQuantityChange) {
      onQuantityChange(mealId, quantity);
    } else {
      setInternalQuantities((current) => ({
        ...current,
        [mealId]: quantity,
      }));
    }
  };

  const selectedTotal = meals.reduce(
    (total, meal) =>
      total + meal.price * (quantities[String(meal.id)] ?? 0),
    0,
  );

  return (
    <section
      className="meals-selection planner-section"
      id="meals"
      aria-labelledby="meals-selection-title"
    >
      <div className="planner-section__heading">
        <div>
          <p className="planner-section__eyebrow">03 / HOSPITALITY</p>
          <h2 id="meals-selection-title">Meal Selection</h2>
        </div>
        <label className="meal-guest-count">
          <span>Number of People</span>
          <input
            type="number"
            min={1}
            max={10000}
            step={1}
            inputMode="numeric"
            value={guestCount}
            onChange={(event) =>
              changeGuestCount(event.currentTarget.valueAsNumber)
            }
          />
        </label>
      </div>

      {meals.length === 0 ? (
        <p className="planner-empty" role="status">
          No meal options are currently available.
        </p>
      ) : (
        <div className="planner-item-grid">
          {meals.map((meal) => {
            const quantity = quantities[String(meal.id)] ?? 0;
            const image = mealImages[meal.name.toLowerCase()] ?? fallbackImage;

            return (
              <label
                className={`planner-item-card meal-card${quantity > 0 ? ' is-selected' : ''}`}
                key={meal.id}
              >
                <img
                  className="planner-item-card__image"
                  src={image}
                  alt=""
                  loading="lazy"
                />
                <span className="planner-item-card__content">
                  <span className="meal-card__name">{meal.name}</span>
                  <span className="meal-card__price">
                    {currencyFormatter.format(meal.price)} / person
                  </span>
                  <span className="meal-card__select">
                    <input
                      type="checkbox"
                      checked={quantity > 0}
                      onChange={() => toggleMeal(meal.id)}
                    />
                    <span>Select meal</span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      )}

      <p className="planner-section-total" aria-live="polite">
        Total Meals Cost: {currencyFormatter.format(selectedTotal)}
      </p>
    </section>
  );
}

export default MealsSelection;
