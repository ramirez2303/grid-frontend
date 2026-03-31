export interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  source: string;
  sourceUrl: string;
  imageUrl: string | null;
  publishedAt: string;
  topics: string[];
}

export interface NewsResponse {
  items: NewsItem[];
  total: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string | null;
}
