import { getBooks } from './books';

const data = [];

const set = (data) => localStorage.setItem('carts', JSON.stringify(data));

export const getCarts = async () => {
  const carts = localStorage.getItem('carts');
  if (carts === null) {
    const books = await getBooks();
    for (const book of books) {
      if (book.title === 'Sự an ủi của triết học' || book.title === 'Chủ nghĩa khắc kỷ') {
        // init state of cart data
        // buyQuantity is book left in our store that user can buy
        // borrowQuantity is the maximum day user can borrow the book (we will suggest user to buy the book if they try to borrow the book beyond the cost of the book itself)
        data.push({ id: book.id, buyQuantity: 1, inputBuyQuantity: 0, borrowQuantity: book.price, inputBorrowQuantity: 0 });
      }
    }
    return data;
  } else return JSON.parse(carts);
};
