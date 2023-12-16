import { updateBook } from './books';
import { carts as defaultCarts } from './books';

const set = async (data) => localStorage.setItem('vaiquyensach-carts', JSON.stringify(data));

export const getCarts = async () => {
  const carts = localStorage.getItem('vaiquyensach-carts');
  if (carts === null) {
    set(defaultCarts);
    return defaultCarts;
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
    inputBuyQuantity: 0,
    borrowQuantity: book.price,
    inputBorrowQuantity: 0,
    isBuying: true,
  };
  await updateBook(cart.id, { inCart: true });
  carts.push(cart);
  await set(carts);
  return cart;
};

export const increaseQuantity = (id, isBuying) => {};

export const deleteCart = async (id) => {
  const carts = await getCarts();
  const index = carts.findIndex((cart) => cart.id === id);
  if (index < 0) {
    throw new Error('That cart does not exist to be deleted');
  }
  const [cart] = carts.splice(index, 1);
  await updateBook(cart.id, { inCart: false });
  await set(carts);
  return carts;
};

export async function updateCart(id, updates) {
  const carts = await getCarts();
  const cart = carts.find((cart) => cart.id === id);
  if (!cart) {
    throw new Error('That cart does not exist to be updated');
  }
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

export const sumCarts = async () => {
  const carts = await getCarts();
  const total = carts.reduce((total, current) => {
    if (current.isBuying) {
      return total + current.price * Number(current.inputBuyQuantity);
    } else {
      return total + 1 * Number(current.inputBorrowQuantity);
    }
  }, 0);
  return total;
};
