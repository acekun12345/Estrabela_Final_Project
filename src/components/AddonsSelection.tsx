import { useState } from 'react';

export type Addon = {
  id: number;
  name: string;
  price: number;
};

type AddonsSelectionProps = {
  addons: Addon[];
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

function AddonsSelection({ addons }: AddonsSelectionProps) {
  const [selectedAddonIds, setSelectedAddonIds] = useState<Set<number>>(
    () => new Set(),
  );

  const toggleAddon = (addonId: number) => {
    setSelectedAddonIds((currentSelection) => {
      const nextSelection = new Set(currentSelection);

      if (nextSelection.has(addonId)) {
        nextSelection.delete(addonId);
      } else {
        nextSelection.add(addonId);
      }

      return nextSelection;
    });
  };

  const selectedTotal = addons.reduce(
    (total, addon) =>
      selectedAddonIds.has(addon.id) ? total + addon.price : total,
    0,
  );

  return (
    <section aria-labelledby="addons-selection-title">
      <h2 id="addons-selection-title">Choose add-ons</h2>
      <p>Select any equipment or extras you need for your event.</p>

      {addons.length === 0 ? (
        <p role="status">No add-ons are currently available.</p>
      ) : (
        <fieldset>
          <legend>Available add-ons</legend>
          {addons.map((addon) => (
            <label
              key={addon.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 0',
                borderBottom: '1px solid currentColor',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={selectedAddonIds.has(addon.id)}
                onChange={() => toggleAddon(addon.id)}
              />
              <span style={{ flex: 1 }}>{addon.name}</span>
              <span>{currencyFormatter.format(addon.price)}</span>
            </label>
          ))}
        </fieldset>
      )}

      <p aria-live="polite">
        {selectedAddonIds.size} selected · Total:{' '}
        {currencyFormatter.format(selectedTotal)}
      </p>
    </section>
  );
}

export default AddonsSelection;
