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
  selectedVenueId?: number | null;
  onSelectVenue?: (venue: Venue) => void;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

export function VenueSelection({
  venues,
  selectedVenueId: controlledSelectedVenueId,
  onSelectVenue,
}: VenueSelectionProps) {
  const [internalSelectedVenueId, setInternalSelectedVenueId] =
    useState<number | null>(null);
  const isControlled =
    controlledSelectedVenueId !== undefined && onSelectVenue !== undefined;
  const selectedVenueId = isControlled
    ? controlledSelectedVenueId
    : internalSelectedVenueId;
  const selectedVenue =
    venues.find((venue) => venue.id === selectedVenueId) ?? null;

  return (
    <section className="venue-selection" aria-labelledby="venue-selection-title">
      <div className="venue-selection-heading">
        <p className="venue-selection-eyebrow">FIND YOUR SPACE</p>
        <h2 id="venue-selection-title">Choose a venue</h2>
        <p className="venue-selection-intro">
          Select a space that fits your gathering.
        </p>
      </div>

      {venues.length === 0 ? (
        <p className="venue-selection-empty" role="status">
          No venues are currently available.
        </p>
      ) : (
        <div className="venue-selection-layout">
          <div className="venue-selection-list" aria-label="Available venues">
            {venues.map((venue) => (
              <button
                className={`venue-option${selectedVenueId === venue.id ? ' is-selected' : ''}`}
                key={venue.id}
                type="button"
                aria-pressed={selectedVenueId === venue.id}
                onClick={() => {
                  if (isControlled) {
                    onSelectVenue(venue);
                  } else {
                    setInternalSelectedVenueId(venue.id);
                    onSelectVenue?.(venue);
                  }
                }}
              >
                <span className="venue-option-icon" aria-hidden="true">
                  {venue.name.charAt(0)}
                </span>
                <span className="venue-option-copy">
                  <span className="venue-option-name">{venue.name}</span>
                  <span className="venue-option-capacity">
                    Up to {venue.capacity} guests
                  </span>
                </span>
                <span className="venue-option-price">
                  {currencyFormatter.format(venue.price)}
                </span>
              </button>
            ))}
          </div>

          <aside
            className="venue-details"
            aria-live="polite"
            aria-label="Selected venue details"
          >
            {selectedVenue ? (
              <>
                <p className="venue-details-eyebrow">YOUR SELECTED VENUE</p>
                <h3>{selectedVenue.name}</h3>
                <div className="venue-detail-row">
                  <span>Guest capacity</span>
                  <strong>{selectedVenue.capacity} people</strong>
                </div>
                <div className="venue-detail-row">
                  <span>Venue cost</span>
                  <strong>
                    {currencyFormatter.format(selectedVenue.price)}
                  </strong>
                </div>
              </>
            ) : (
              <p className="venue-details-placeholder">
                Choose a venue to see its capacity and cost.
              </p>
            )}
          </aside>
        </div>
      )}
    </section>
  );
}

export default VenueSelection;
