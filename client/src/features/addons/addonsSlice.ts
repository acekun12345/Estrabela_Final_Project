import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AddonsState = {
  selectedQuantities: Record<string, number>;
};

const initialState: AddonsState = {
  selectedQuantities: {},
};

const addonsSlice = createSlice({
  name: 'addons',
  initialState,
  reducers: {
    incrementAddonQuantity(state, action: PayloadAction<string>) {
      const addonId = action.payload;
      state.selectedQuantities[addonId] =
        (state.selectedQuantities[addonId] ?? 0) + 1;
    },
    decrementAddonQuantity(state, action: PayloadAction<string>) {
      const addonId = action.payload;
      const quantity = state.selectedQuantities[addonId] ?? 0;

      if (quantity <= 1) {
        delete state.selectedQuantities[addonId];
        return;
      }

      state.selectedQuantities[addonId] = quantity - 1;
    },
  },
});

export const { incrementAddonQuantity, decrementAddonQuantity } =
  addonsSlice.actions;

export default addonsSlice.reducer;
