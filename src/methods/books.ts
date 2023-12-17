import { v4 as uuid } from 'uuid';
import books from './data.json';
import sortBy from 'sort-by';
import { matchSorter } from 'match-sorter';

export const carts: {
  inCart: boolean;
  inputBuyQuantity: number;
  inputBorrowQuantity: number;
  borrowQuantity: number;
  description: string;
  title: string;
  price: number;
  author: string;
  category: string;
  image: string;
  canDeleted: boolean;
  id: string;
  sale: number;
  isBuying: boolean;
}[] = [];

const data = books.map((book) => {
  const preparedBook = {
    description: ``,
    title: book.title,
    price: book.price,
    author: book.author,
    category: book.category,
    image: `/thumbnails/${book.image}.jpg`,
    canDeleted: false,
    id: uuid().slice(0, 8), // unique id
    inCart: false,
    sale: Math.floor(Math.random() * 25) + 5, // a random sale % between 5% and 30% to make user feel good but don't actually on sale
  };
  // default data
  if (book.title === 'Chủ nghĩa khắc kỷ' || book.title === 'Sự an ủi của triết học') {
    preparedBook.inCart = true;
    carts.push({
      ...preparedBook,
      inCart: true,
      isBuying: true,
      inputBuyQuantity: 0,
      inputBorrowQuantity: 0,
      borrowQuantity: book.price,
    });
  }
  return preparedBook;
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
  const table = {
    truyen: 'Truyện',
    'tam-ly': 'Tâm lý',
    'van-hoc': 'Văn học',
    'lich-su': 'Lịch sử',
    'suc-khoe': 'Sức khỏe',
    'triet-hoc': 'Triết học',
    'thieu-nhi': 'Thiếu nhi',
    'trinh-tham': 'Trinh thám',
    'tieu-thuyet': 'Tiểu thuyết',
    'thuong-thuc': 'Thường thức',
    'ky-nang-song': 'Kỹ năng sống',
    'nuoi-day-con': 'Nuôi dạy con',
    'ky-nang-lam-viec': 'Kỹ năng làm việc',
    'kien-thuc-tong-hop': 'Kiến thức tổng hợp',
    'marketing-ban-hang': 'Marketing - Bán hàng',
    'phat-trien-ban-than': 'Phát triển bản thân',
  };
  category = table[category];
  if (!category) return books;
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

export const sortBooks = async (books, type) => {
  if (!type) return books;
  if (type === 'a-z') return books.sort(sortBy('title', 'price'));
  if (type === 'z-a') return books.sort(sortBy('-title', 'price'));
  if (type === '0-9') return books.sort(sortBy('price', 'title'));
  return books.sort(sortBy('-price', 'title'));
};

export const searchBooks = async (books, query) => {
  if (!query) return books;
  return matchSorter(books, query, { keys: ['title', 'author', 'category'] });
};
