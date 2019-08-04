import { searchCache, detailsCache } from './cache';
import { SearchResponse } from "./types";

const API_KEY = process.env.REACT_APP_FOOD_API_KEY || '';
const numberOfResults = 10;

const searchUrl = (searchTerm: string, offset: number): string =>
  `https://api.nal.usda.gov/ndb/search/?format=json&q=${searchTerm}&sort=n&max=${numberOfResults}&offset=${offset}&api_key=${API_KEY}`;

export const search = async (searchTerm: string, offset: number): Promise<SearchResponse> => {
  try {
    const cacheName = `${searchTerm}-${offset}`;

    // Check to see if we searched for this already
    if (searchCache.has(cacheName)) {
      return searchCache.get(cacheName);
    }

    const response = await fetch(searchUrl(searchTerm, offset));
    const results = await response.json();

    // Add the results to the cache
    searchCache.set(cacheName, results);

    return results;
  } catch (error) {
    throw new Error(error);
  }
};

const detailsUrl = (ndbno: string): string =>
  `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${API_KEY}&nutrients=203&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=${ndbno}`;

export const details = async (ndbno: string): Promise<any> => {
  try {
    // Check to see if we searched for this already
    if (detailsCache.has(ndbno)) {
      return detailsCache.get(ndbno);
    }

    const response = await fetch(detailsUrl(ndbno));
    const results = await response.json();

    // Add the results to the cache
    detailsCache.set(ndbno, results);

    return results;
  } catch (error) {
    throw new Error(error);
  }
};
