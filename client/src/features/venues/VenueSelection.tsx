import { useState } from 'react';
import './VenueSelection.css';

export type Venue = {
  id: number;
  name: string;
  capacity: number;
  price: number;
};

type VenueSelectionProps = {
  venues: Venue[];
  quantities?: Record<string, number>;
  onQuantityChange?: (venueId: number, quantity: number) => void;
};

const venueImages = [
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=720&q=80',
];

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

function VenueSelection({
  venues,
  quantities: controlledQuantities,
  onQuantityChange,
}: VenueSelectionProps) {
  const [internalQuantities, setInternalQuantities] = useState<
    Record<string, number>
  >({});
  const quantities = controlledQuantities ?? internalQuantities;

  const updateQuantity = (venueId: number, nextQuantity: number) => {
    const quantity = Math.max(0, nextQuantity);

    if (onQuantityChange) {
      onQuantityChange(venueId, quantity);
    } else {
      setInternalQuantities((current) => ({
        ...current,
        [venueId]: quantity,
      }));
    }
  };

  return (
    <section
      className="venue-selection planner-section"
      id="venues"
      aria-labelledby="venue-selection-title"
    >
      <div className="venue-selection-heading">
        <div>
          <p className="planner-section__eyebrow">01 / SPACE</p>
          <h2 id="venue-selection-title">Venue Room Selection</h2>
        </div>
        <p className="venue-selection-intro">
          Find the right space for your event and guests.
        </p>
      </div>

      {venues.length === 0 ? (
        <p className="venue-selection-empty" role="status">
          No venues are currently available.
        </p>
      ) : (
        <div className="venue-selection-list">
          {venues.map((venue, index) => {
            const quantity = quantities[String(venue.id)] ?? 0;

            return (
              <article
                className={`venue-option planner-item-card${quantity > 0 ? ' is-selected' : ''}`}
                key={venue.id}
              >
                <img
                  className="planner-item-card__image"
                  src={venueImages[index % venueImages.length]}
                  alt=""
                  loading="lazy"
                />
                <div className="planner-item-card__content">
                  <h3 className="venue-option-name">{venue.name}</h3>
                  <p className="venue-option-capacity">
                    Capacity: {venue.capacity}
                  </p>
                  <p className="venue-option-price">
                    {currencyFormatter.format(venue.price)}
                  </p>
                  <div
                    className="planner-quantity"
                    aria-label={`${venue.name} quantity`}
                  >
                    <button
                      type="button"
                      aria-label={`Remove one ${venue.name}`}
                      disabled={quantity === 0}
                      onClick={() => updateQuantity(venue.id, quantity - 1)}
                    >
                      −
                    </button>
                    <output aria-live="polite">{quantity}</output>
                    <button
                      type="button"
                      aria-label={`Add one ${venue.name}`}
                      onClick={() => updateQuantity(venue.id, quantity + 1)}
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
    </section>
  );
}

export default VenueSelection;
