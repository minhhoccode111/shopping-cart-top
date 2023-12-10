import { v4 as uuid } from 'uuid';
import books from './data.json';

const data = books.map((book) => {
  return {
    description: '',
    canDeleted: false,
    title: book.title,
    price: book.price,
    author: book.author,
    id: uuid().slice(0, 8),
    category: book.category,
    image: `/public/thumbnails/${book.image}.jpg`,
  };
});

export default data;
