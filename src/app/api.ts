import { Model, Color } from './types';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return await response.json();
}

export function getModels() {
  return fetchJson<Model[]>('../../models.json');
}

export function getColors() {
  return fetchJson<Color[]>('../../colors.json');
}
