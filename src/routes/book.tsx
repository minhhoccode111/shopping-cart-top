import { useLoaderData, useNavigate } from 'react-router-dom';
import { getBooks } from '../methods/books';

export const loader = async ({ params: { bookId } }) => {
  console.log(bookId);
  const books = await getBooks();
  const book = books.find((book) => book.id === bookId);
  if (!book) {
    throw new Response('', {
      status: 404,
    });
  }
  return { book };
};

export const action = async () => {
  console.log('action in book has been called');
  return {};
};

const Book: React.FC = () => {
  const { book } = useLoaderData();
  const navigate = useNavigate();
  return (
    <article className="">
      <h1>This is in Book</h1>
      <div className="">
        <div className="">
          <p className="">Title: {book.title}</p>
          <p className="">Author: {book.author}</p>
          <p className="">Price: {book.price}</p>
          <p className="">Category: {book.category}</p>
        </div>
        <div className="">
          <img src={book.image} alt="Book image" />
        </div>
        <div className="">
          <button className="underline" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    </article>
  );
};

export default Book;
