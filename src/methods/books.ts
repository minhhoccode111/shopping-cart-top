import { v4 as uuid } from 'uuid';
// import localforage from 'localforage';
import books from './data.json';

const data = books.map((book) => {
  return {
    description: ``,
    title: book.title,
    price: book.price,
    author: book.author,
    category: book.category,
    image: `/public/thumbnails/${book.image}.jpg`,
    canDeleted: false,
    id: uuid().slice(0, 8), // unique id
    inCart: book.title === 'Sự an ủi của triết học' || book.title === 'Chủ nghĩa khắc kỷ' ? true : false,
    sale: Math.floor(Math.random() * 25) + 5, // a random sale % between 5% and 30% to make user feel good but don't actually on sale
  };
});

const set = (data) => localStorage.setItem('vaiquyensach-books', JSON.stringify(data));

export const getBooks = async () => {
  const books = localStorage.getItem('vaiquyensach-books');
  if (books === null) {
    set(data);
    return data;
  }
  return JSON.parse(books);
};

export const getBook = async (id) => {
  const books = await getBooks();
  const book = books.find((book) => book.id === id);
  return book;
};

export const getCategory = async (category) => {
  const books = await getBooks();
  const categories = books.reduce((total, current) => {
    const category = current.category;
    const count = total[category] || [];
    return { ...total, [category]: [...count, current] };
  }, {});
  return categories[category];
};

export const updateBook = async (id, updates) => {
  const books = await getBooks();
  const book = books.find((book) => book.id === id);
  if (!book) throw new Error('Book does not exist');
  Object.assign(book, updates);
  set(books);
  return book;
};
