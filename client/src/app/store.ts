import { configureStore } from '@reduxjs/toolkit';
import addonsReducer from '../features/addons/addonsSlice';
import mealsReducer from '../features/meals/mealsSlice';
import venueReducer from '../features/venues/venueSlice';

export const store = configureStore({
  reducer: {
    venues: venueReducer,
    addons: addonsReducer,
    meals: mealsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
