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
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

async function getCollection<T>(resource: string): Promise<T[]> {
  const response = await fetch(`${API_BASE_URL}/${resource}`);

  if (!response.ok) {
    throw new Error(
      `Could not load ${resource} (HTTP ${response.status}).`,
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error(`The ${resource} response was not a list.`);
  }

  return data as T[];
}

export const getVenues = () => getCollection<Venue>('venues');
export const getAddons = () => getCollection<Addon>('addons');
export const getMeals = () => getCollection<Meal>('meals');
