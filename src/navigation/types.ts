import type { Article } from '../types/news';

export type RootStackParamList = {
  Feed: undefined;
  Details: { article: Article };
};


