import { v4 as uuid } from 'uuid';
import books from './data.json';

const data = books.map((book) => {
  return {
    ...book,
    id: uuid(),
    image: `/public/thumbnails/${book.image}.jpg`,
  };
});

export default data;
