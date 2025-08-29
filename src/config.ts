import { Localization } from './constants/localization';

export const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
export const NEWS_API_KEY = 'e204df0042234624ae9f4d04cd34d666';
export const DEFAULT_PAGE_SIZE = 10;
export type NewsCategory = 'technology' | 'sports' | 'politics' | '';
export const CATEGORIES: { label: string; value: NewsCategory }[] = [
  { label: Localization.allCategories, value: '' },
  { label: Localization.technology, value: 'technology' },
  { label: Localization.sports, value: 'sports' },
  { label: Localization.politics, value: 'politics' },
];


