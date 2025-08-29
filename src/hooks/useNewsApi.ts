import { useCallback, useMemo, useRef, useState } from 'react';
import type { Article } from '../types/news';
import { DEFAULT_PAGE_SIZE, NewsCategory } from '../config';
import { fetchTopHeadlines } from '../api/newsApi';

export function useNewsApi() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReachedLoading, setIsEndReachedLoading] = useState(false);
  const lastRequest = useRef<{ q: string; category: NewsCategory }>({ q: '', category: '' });

  const canLoadMore = useMemo(() => {
    if (total == null) return true;
    return articles.length < total;
  }, [articles.length, total]);

  const loadPage = useCallback(async (nextPage: number, mode: 'initial' | 'more' | 'refresh') => {
    try {
      if (mode === 'initial') setIsLoading(true);
      if (mode === 'more') setIsEndReachedLoading(true);
      if (mode === 'refresh') setIsRefreshing(true);

      const { q, category: cat } = lastRequest.current;
      const data = await fetchTopHeadlines({
        page: nextPage,
        pageSize: DEFAULT_PAGE_SIZE,
        q: q || undefined,
        category: cat
      });

      if (data.status === 'ok') {
        setTotal(data.totalResults ?? null);
        const newItems = data.articles ?? [];
        if (nextPage === 1) setArticles(newItems);
        else setArticles(prev => [...prev, ...newItems]);
        setPage(nextPage);
      } else {
        throw new Error(data.message || 'Request failed');
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setIsEndReachedLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const search = useCallback((query: string, category: NewsCategory) => {
    lastRequest.current = { q: query.trim(), category };
    loadPage(1, 'initial');
  }, [loadPage]);

  const changeCategory = useCallback((category: NewsCategory, query: string) => {
    lastRequest.current = { q: query.trim(), category };
    loadPage(1, 'initial');
  }, [loadPage]);

  const refresh = useCallback(() => {
    loadPage(1, 'refresh');
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (!canLoadMore || isLoading || isEndReachedLoading) return;
    loadPage(page + 1, 'more');
  }, [canLoadMore, isLoading, isEndReachedLoading, loadPage, page]);

  const reset = useCallback(() => {
    lastRequest.current = { q: '', category: '' };
    loadPage(1, 'initial');
  }, [loadPage]);

  return {
    articles,
    page,
    total,
    isLoading,
    isRefreshing,
    isEndReachedLoading,
    search,
    changeCategory,
    refresh,
    loadMore,
    reset,
  };
}
