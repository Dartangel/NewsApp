import axios from 'axios';
import { NEWS_API_BASE_URL, NEWS_API_KEY, DEFAULT_PAGE_SIZE, NewsCategory } from '../config';
import type { TopHeadlinesResponse } from '../types/news';

const client = axios.create({
  baseURL: NEWS_API_BASE_URL,
  timeout: 15000,
  headers: { 'X-Api-Key': NEWS_API_KEY },
});

export async function fetchTopHeadlines(params: {
  page: number;
  pageSize?: number;
  q?: string;
  category?: NewsCategory;
  country?: string;
}): Promise<TopHeadlinesResponse> {
  const { page, pageSize = DEFAULT_PAGE_SIZE, q, category, country = 'us' } = params;
  const res = await client.get<TopHeadlinesResponse>('/top-headlines', {
    params: { page, pageSize, q, category: category || undefined, country },
  });
  return res.data;
}


