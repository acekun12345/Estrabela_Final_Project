import { useState } from 'react';

export type Addon = {
  id: number;
  name: string;
  price: number;
};

type AddonsSelectionProps = {
  addons: Addon[];
  selectedQuantities?: Record<string, number>;
  onQuantityChange?: (addonId: number, quantity: number) => void;
};

const addonImages: Record<string, string> = {
  projectors:
    'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=720&q=80',
  speakers:
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=720&q=80',
  microphones:
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=720&q=80',
  whiteboards:
    'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=720&q=80',
  signage:
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=720&q=80',
};

const fallbackImage =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=720&q=80';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

function AddonsSelection({
  addons,
  selectedQuantities: controlledQuantities,
  onQuantityChange,
}: AddonsSelectionProps) {
  const [internalQuantities, setInternalQuantities] = useState<
    Record<string, number>
  >({});
  const quantities = controlledQuantities ?? internalQuantities;

  const updateQuantity = (addonId: number, nextQuantity: number) => {
    const quantity = Math.max(0, nextQuantity);

    if (onQuantityChange) {
      onQuantityChange(addonId, quantity);
    } else {
      setInternalQuantities((current) => ({
        ...current,
        [addonId]: quantity,
      }));
    }
  };

  const selectedTotal = addons.reduce(
    (total, addon) =>
      total + addon.price * (quantities[String(addon.id)] ?? 0),
    0,
  );

  return (
    <section
      className="addons-selection planner-section"
      id="addons"
      aria-labelledby="addons-selection-title"
    >
      <div className="planner-section__heading">
        <div>
          <p className="planner-section__eyebrow">02 / EQUIPMENT</p>
          <h2 id="addons-selection-title">Add-ons Selection</h2>
        </div>
        <p>Choose the extras you need for a seamless event.</p>
      </div>

      {addons.length === 0 ? (
        <p className="planner-empty" role="status">
          No add-ons are currently available.
        </p>
      ) : (
        <div className="planner-item-grid">
          {addons.map((addon) => {
            const quantity = quantities[String(addon.id)] ?? 0;
            const image =
              addonImages[addon.name.toLowerCase()] ?? fallbackImage;

            return (
              <article
                className={`planner-item-card${quantity > 0 ? ' is-selected' : ''}`}
                key={addon.id}
              >
                <img
                  className="planner-item-card__image"
                  src={image}
                  alt=""
                  loading="lazy"
                />
                <div className="planner-item-card__content">
                  <h3>{addon.name}</h3>
                  <p>{currencyFormatter.format(addon.price)} each</p>
                  <div
                    className="planner-quantity"
                    aria-label={`${addon.name} quantity`}
                  >
                    <button
                      type="button"
                      aria-label={`Remove one ${addon.name}`}
                      disabled={quantity === 0}
                      onClick={() => updateQuantity(addon.id, quantity - 1)}
                    >
                      −
                    </button>
                    <output aria-live="polite">{quantity}</output>
                    <button
                      type="button"
                      aria-label={`Add one ${addon.name}`}
                      onClick={() => updateQuantity(addon.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <p className="planner-section-total" aria-live="polite">
        Total Add-ons Cost: {currencyFormatter.format(selectedTotal)}
      </p>
    </section>
  );
}

export default AddonsSelection;
