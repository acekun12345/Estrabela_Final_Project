export type Venue = {
  id: number;
  name: string;
  capacity: number;
  price: number;
};

export type Addon = {
  id: number;
  name: string;
  price: number;
};

export type Meal = {
  id: number;
  name: string;
  price: number;
};

const API_BASE_URL = 'https://estrabela-final-project-7wf4.vercel.app/api';

export type CollectionResult<T> = {
  items: T[];
  usedFallback: boolean;
};

const fallbackVenues: Venue[] = [
  { id: 1, name: 'Auditorium Hall', capacity: 200, price: 5500 },
  { id: 2, name: 'Conference Room', capacity: 15, price: 3500 },
  { id: 3, name: 'Presentation Room', capacity: 50, price: 700 },
  { id: 4, name: 'Large Meeting Room', capacity: 10, price: 900 },
  { id: 5, name: 'Small Meeting Room', capacity: 5, price: 500 },
];

const fallbackAddons: Addon[] = [
  { id: 1, name: 'Projectors', price: 200 },
  { id: 2, name: 'Speakers', price: 35 },
  { id: 3, name: 'Microphones', price: 45 },
  { id: 4, name: 'Whiteboards', price: 80 },
  { id: 5, name: 'Signage', price: 80 },
];

const fallbackMeals: Meal[] = [
  { id: 1, name: 'Breakfast', price: 50 },
  { id: 2, name: 'High Tea', price: 25 },
  { id: 3, name: 'Lunch', price: 65 },
  { id: 4, name: 'Dinner', price: 70 },
];

async function getCollection<T>(
  resource: string,
  fallbackItems: T[],
): Promise<CollectionResult<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${resource}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('The response was not a list.');
    }

    return { items: data as T[], usedFallback: false };
  } catch (error) {
    console.error(`Could not load ${resource} from the event API.`, error);
    return { items: fallbackItems, usedFallback: true };
  }
}

export const getVenues = () => getCollection('venues', fallbackVenues);
export const getAddons = () => getCollection('addons', fallbackAddons);
export const getMeals = () => getCollection('meals', fallbackMeals);
