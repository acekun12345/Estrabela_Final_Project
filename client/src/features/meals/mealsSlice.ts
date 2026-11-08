import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type MealsState = {
  selectedQuantities: Record<string, number>;
};

const initialState: MealsState = {
  selectedQuantities: {},
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    incrementMealQuantity(state, action: PayloadAction<string>) {
      const mealId = action.payload;
      state.selectedQuantities[mealId] =
        (state.selectedQuantities[mealId] ?? 0) + 1;
    },
    decrementMealQuantity(state, action: PayloadAction<string>) {
      const mealId = action.payload;
      const quantity = state.selectedQuantities[mealId] ?? 0;

      if (quantity <= 1) {
        delete state.selectedQuantities[mealId];
        return;
      }

      state.selectedQuantities[mealId] = quantity - 1;
    },
  },
});

export const { incrementMealQuantity, decrementMealQuantity } =
  mealsSlice.actions;

export default mealsSlice.reducer;
