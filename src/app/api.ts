import { Model, Color } from './types';

export async function getModels(): Promise<Model[]> {
  const results = await fetch('./models.json');
  const models = await results.json();
  return models;
}

export async function getColors(): Promise<Color[]> {
  const results = await fetch('./colors.json');
  const colors = await results.json();
  return colors;
}
