export async function getModels() {
  const results = await fetch('./models.json');
  const models = results.json();
  return models;
}

export async function getColors() {
  const results = await fetch('./colors.json');
  const colors = results.json();
  return colors;
}
