export async function getModels() {
    const results = await fetch('./models.json');
    const models = results.json();
    return models;
}