import { v4 as uuid } from 'uuid';
// import localforage from 'localforage';
import books from './data.json';

const data = books.map((book) => {
  return {
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius error eum, architecto similique accusamus eligendi, molestias ab mollitia, reprehenderit voluptatibus perferendis culpa ex repellat obcaecati totam consequatur dolorum numquam aspernatur? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci animi consectetur alias mollitia corporis odio nihil tempore, velit repudiandae commodi eligendi explicabo fugit deleniti minima quo iste, dicta repellendus id. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, vitae quia quis porro necessitatibus nostrum, ducimus doloribus culpa labore, omnis illum quasi. Voluptatibus reiciendis laboriosam incidunt quo hic numquam totam!`,
    canDeleted: false,
    title: book.title,
    price: book.price,
    author: book.author,
    category: book.category,
    image: `/public/thumbnails/${book.image}.jpg`,
    id: uuid().slice(0, 8), // unique id
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
