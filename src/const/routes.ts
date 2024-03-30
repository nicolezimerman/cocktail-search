const URL_BASE = "https://www.thecocktaildb.com/api/json/v1/1";

export const ROUTES = {
  LIST: `${URL_BASE}/filter.php?c=Cocktail`,
  SEARCH_BY_NAME: `${URL_BASE}/search.php?s=`,
  GET_BY_ID: `${URL_BASE}/lookup.php?i=`,
};
