import { searchCache, detailsCache } from './cache';

const API_KEY = process.env.REACT_APP_FOOD_API_KEY;
const numberOfResults = 10;

const searchUrl = (searchTerm, offset) =>
  `https://api.nal.usda.gov/ndb/search/?format=json&q=${searchTerm}&sort=n&max=${numberOfResults}&offset=${offset}&api_key=${API_KEY}`;

export const search = async (searchTerm, offset) => {
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
    throw new Error(error);  }
};

const detailsUrl = ndbno =>
  `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${API_KEY}&nutrients=203&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=${ndbno}`;

export const details = async ndbno => {
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
