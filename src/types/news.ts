export type Article = {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export type TopHeadlinesResponse = {
  status: 'ok' | 'error';
  totalResults?: number;
  articles?: Article[];
  code?: string;
  message?: string;
};


