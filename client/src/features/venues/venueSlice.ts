import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type VenueState = {
  selectedQuantities: Record<string, number>;
};

const initialState: VenueState = {
  selectedQuantities: {},
};

const venueSlice = createSlice({
  name: 'venues',
  initialState,
  reducers: {
    incrementVenueQuantity(state, action: PayloadAction<string>) {
      const venueId = action.payload;
      state.selectedQuantities[venueId] =
        (state.selectedQuantities[venueId] ?? 0) + 1;
    },
    decrementVenueQuantity(state, action: PayloadAction<string>) {
      const venueId = action.payload;
      const quantity = state.selectedQuantities[venueId] ?? 0;

      if (quantity <= 1) {
        delete state.selectedQuantities[venueId];
        return;
      }

      state.selectedQuantities[venueId] = quantity - 1;
    },
  },
});

export const { incrementVenueQuantity, decrementVenueQuantity } =
  venueSlice.actions;

export default venueSlice.reducer;
