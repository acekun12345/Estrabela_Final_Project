import { useState } from 'react';

type SelectionState = {
  selectedVenueId: number | null;
  addonQuantities: Record<string, number>;
  mealQuantities: Record<string, number>;
};

const initialState: SelectionState = {
  selectedVenueId: null,
  addonQuantities: {},
  mealQuantities: {},
};

function updateQuantity(
  quantities: Record<string, number>,
  itemId: number,
  change: 1 | -1,
): Record<string, number> {
  const key = String(itemId);
  const nextQuantity = (quantities[key] ?? 0) + change;
  const nextQuantities = { ...quantities };

  if (nextQuantity <= 0) {
    delete nextQuantities[key];
  } else {
    nextQuantities[key] = nextQuantity;
  }

  return nextQuantities;
}

function useSelection() {
  const [selection, setSelection] = useState<SelectionState>(initialState);

  const selectVenue = (venueId: number | null) => {
    setSelection((current) => ({ ...current, selectedVenueId: venueId }));
  };

  const incrementAddon = (addonId: number) => {
    setSelection((current) => ({
      ...current,
      addonQuantities: updateQuantity(current.addonQuantities, addonId, 1),
    }));
  };

  const decrementAddon = (addonId: number) => {
    setSelection((current) => ({
      ...current,
      addonQuantities: updateQuantity(current.addonQuantities, addonId, -1),
    }));
  };

  const incrementMeal = (mealId: number) => {
    setSelection((current) => ({
      ...current,
      mealQuantities: updateQuantity(current.mealQuantities, mealId, 1),
    }));
  };

  const decrementMeal = (mealId: number) => {
    setSelection((current) => ({
      ...current,
      mealQuantities: updateQuantity(current.mealQuantities, mealId, -1),
    }));
  };

  const resetSelection = () => setSelection(initialState);

  return {
    ...selection,
    selectVenue,
    incrementAddon,
    decrementAddon,
    incrementMeal,
    decrementMeal,
    resetSelection,
  };
}

export default useSelection;
