export interface ArticleComment {
  name: string;
  comment: string;
  rating: number;
  tag: 'like' | 'love' | 'agree' | 'disagree' | 'info' | 'review' | string;
}

export interface Article {
  tile?: null | 'headline' | 'article' | 'feature' | string;
  id: string;
  dash?: string;
  heading: string;
  image: string;
  venue?: string;
  tag: string;
  about: string;
  author: string;
  published: Date;
  comments: ArticleComment[];
  markdown: string[] | string;
}

export const ARTICLE: Article = {
  tile: null,
  id: null,
  dash: '',
  heading: '',
  image: '',
  venue: '',
  tag: '',
  about: '',
  author: '',
  published: new Date(),
  comments: [],
  markdown: ''
};
