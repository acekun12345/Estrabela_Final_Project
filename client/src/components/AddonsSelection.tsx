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
  const [internalSelectedIds, setInternalSelectedIds] = useState<Set<number>>(
    () => new Set(),
  );
  const isControlled =
    controlledQuantities !== undefined && onQuantityChange !== undefined;
  const selectedQuantities = controlledQuantities ?? {};

  const isSelected = (addonId: number) =>
    isControlled
      ? (selectedQuantities[String(addonId)] ?? 0) > 0
      : internalSelectedIds.has(addonId);

  const toggleAddon = (addonId: number) => {
    if (isControlled) {
      onQuantityChange(addonId, isSelected(addonId) ? 0 : 1);
      return;
    }

    setInternalSelectedIds((currentSelection) => {
      const nextSelection = new Set(currentSelection);
      if (nextSelection.has(addonId)) nextSelection.delete(addonId);
      else nextSelection.add(addonId);
      return nextSelection;
    });
  };

  const selectedTotal = addons.reduce(
    (total, addon) =>
      isSelected(addon.id) ? total + addon.price : total,
    0,
  );
  const selectedCount = addons.filter((addon) => isSelected(addon.id)).length;

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
                checked={isSelected(addon.id)}
                onChange={() => toggleAddon(addon.id)}
              />
              <span style={{ flex: 1 }}>{addon.name}</span>
              <span>{currencyFormatter.format(addon.price)}</span>
            </label>
          ))}
        </fieldset>
      )}

      <p aria-live="polite">
        {selectedCount} selected · Total:{' '}
        {currencyFormatter.format(selectedTotal)}
      </p>
    </section>
  );
}

export default AddonsSelection;
