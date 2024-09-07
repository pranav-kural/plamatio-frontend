import { getPlamatioBackendAPIKey, getPlamatioBackendAPIURL, PLAMATIO_BACKEND_ENDPOINTS as ENDPOINTS } from "./plamatio-api";


export const getRequestOptions = () => ({
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application',
      Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
    },
  })

export async function fetchHeroProducts() {
    return await fetch(
    getPlamatioBackendAPIURL() + ENDPOINTS.PRODUCTS.GET_HERO(),
    getRequestOptions()
  )
}

export async function fetchCategories() {
    return await fetch(
    getPlamatioBackendAPIURL() + ENDPOINTS.CATEGORIES.GET_ALL(),
    getRequestOptions()
  )
}

export async function fetchSubCategories() {
    return await fetch(
    getPlamatioBackendAPIURL() + ENDPOINTS.CATEGORIES.GET_ALL_SUBCATEGORIES(),
    getRequestOptions()
  )
}