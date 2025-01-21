export interface Run {
  id: number;
  user_id: number;
  book_id: number;
  goal: number;
  pages_count: number;
  read_time: number;
  finish_date: string;
  page_list: string;
  book: {
    name: string;
    author: string;
    thumb_url: string;
  };
}
