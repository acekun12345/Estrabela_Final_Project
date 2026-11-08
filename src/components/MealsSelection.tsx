import { useState } from 'react';

export type Meal = {
  id: number;
  name: string;
  price: number;
};

type MealsSelectionProps = {
  meals: Meal[];
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

function MealsSelection({ meals }: MealsSelectionProps) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const updateQuantity = (mealId: number, value: number) => {
    const quantity = Number.isFinite(value)
      ? Math.max(0, Math.floor(value))
      : 0;

    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [mealId]: quantity,
    }));
  };

  const selectedCount = meals.reduce(
    (count, meal) => count + (quantities[meal.id] ?? 0),
    0,
  );
  const selectedTotal = meals.reduce(
    (total, meal) => total + meal.price * (quantities[meal.id] ?? 0),
    0,
  );

  return (
    <section aria-labelledby="meals-selection-title">
      <h2 id="meals-selection-title">Choose meals</h2>
      <p>Set the quantity needed for each meal option.</p>

      {meals.length === 0 ? (
        <p role="status">No meal options are currently available.</p>
      ) : (
        <fieldset>
          <legend>Available meals</legend>
          {meals.map((meal) => (
            <label
              key={meal.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 0',
                borderBottom: '1px solid currentColor',
              }}
            >
              <span style={{ flex: 1 }}>{meal.name}</span>
              <span>{currencyFormatter.format(meal.price)} each</span>
              <input
                type="number"
                min={0}
                step={1}
                inputMode="numeric"
                aria-label={`Quantity of ${meal.name}`}
                value={quantities[meal.id] ?? 0}
                onChange={(event) =>
                  updateQuantity(meal.id, event.currentTarget.valueAsNumber)
                }
                style={{ width: '72px' }}
              />
            </label>
          ))}
        </fieldset>
      )}

      <p aria-live="polite">
        {selectedCount} meals selected · Total:{' '}
        {currencyFormatter.format(selectedTotal)}
      </p>
    </section>
  );
}

export default MealsSelection;
