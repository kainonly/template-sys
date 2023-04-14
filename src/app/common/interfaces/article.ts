/**
 * 文章
 */
export interface Article {
  key: string;
  value: ArticleValue;
}

export interface ArticleValue {
  blocks: any[];
  time: string;
  version: boolean;
}
