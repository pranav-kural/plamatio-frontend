/**
 * Plamatio Backend API URL
 */
export const getPlamatioBackendAPIURL = () => {
  const url = process.env.NEXT_PUBLIC_PLAMATIO_BACKEND_API_URL;
  if (!url) {
    throw new Error('Plamatio Backend API URL not found');
  }
  return url;
};

/**
 * Plamatio Backend API Key
 */
export const getPlamatioBackendAPIKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_PLAMATIO_BACKEND_API_KEY;
  if (!apiKey) {
    throw new Error('Plamatio Backend API Key not found');
  }
  return apiKey;
};
