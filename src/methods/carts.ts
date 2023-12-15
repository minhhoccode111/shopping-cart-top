import { getBooks, getBook, updateBook } from './books';

const data = [];

const set = async (data) => localStorage.setItem('vaiquyensach-carts', JSON.stringify(data));

export const getCarts = async () => {
  const carts = localStorage.getItem('vaiquyensach-carts');
  if (carts === null) {
    const books = await getBooks();
    for (const book of books) {
      if (book.title === 'Sự an ủi của triết học' || book.title === 'Chủ nghĩa khắc kỷ') {
        // init state of cart data
        // buyQuantity is book left in our store that user can buy
        // borrowQuantity is the maximum day user can borrow the book (we will suggest user to buy the book if they try to borrow the book beyond the cost of the book itself)
        data.push({ ...book, buyQuantity: 1, inputBuyQuantity: 0, borrowQuantity: book.price, inputBorrowQuantity: 0 });
      }
    }
    set(data);
    return data;
  } else {
    return JSON.parse(carts);
  }
};

export const getCart = async (id) => {
  if (!id) throw new Error('Cart does not exist');
  const carts = await getCarts();
  const cart = carts.find((cart) => cart.id === id);
  return cart;
};

export const addCart = async (book) => {
  if (!book) throw new Error('Book does not exist');
  const carts = await getCarts();
  const cart = {
    ...book,
    inCart: true,
    buyQuantity: 1,
    inputBuyQuantity: 0,
    borrowQuantity: book.price,
    inputBorrowQuantity: 0,
  };
  await updateBook(cart.id, { inCart: true });
  carts.push(cart);
  await set(carts);
  return cart;
};

export const deleteCart = async (id) => {
  const carts = await getCarts();
  const index = carts.findIndex((cart) => cart.id === id);
  console.log('before throw');
  if (!index) throw new Error('That cart does not exist');
  const [cart] = carts.splice(index, 1);
  await updateBook(cart.id, { inCart: false });
  await set(carts);
  return carts;
};

export async function updateCart(id, updates) {
  const carts = await getCarts();
  const cart = carts.find((cart) => cart.id === id);
  if (!cart) throw new Error('Cart does not exist');
  Object.assign(cart, updates);
  await set(carts);
  return cart;
}

export const clearCarts = async () => {
  const carts = await getCarts();
  for (const cart of carts) {
    updateBook(cart.id, { inCart: false });
  }
  await set([]);
  return null;
};
