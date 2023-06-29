export interface IBook {
  name: string;
  authors: string[];
  ISBN: string;
  summary: string;
  genre: 'prose' | 'drama' | 'poetry';
  tags: 'sorrow' | 'regret' | 'pain' | 'comedy' | 'tragedy' | 'tragedy-comedy';
  image: string;
  numberOfRatings: number;
  ratingAverage: number;
}
