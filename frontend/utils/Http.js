
export default async function Http(url, config) {
  try {
    const response = await fetch(url, config);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
