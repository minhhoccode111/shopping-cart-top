import { Link, useLoaderData } from 'react-router-dom';
import { getBooks } from '../methods/books';

export const loader = async () => {
  const books = await getBooks();
  return { books };
};

const Shop: React.FC = () => {
  const { books } = useLoaderData();
  return (
    <>
      <h1>This is in Shop</h1>

      <div className="grid grid-cols-autoFit200 gap-4 p-4">
        {books.map((book) => (
          <Link className="border p-4 block hover:sepia" key={book.id} to={`book/${book.id}`}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.price}</p>
            <p>{book.category}</p>
            <p>{book.id}</p>
            <p className="text-green-700">{book.inCart ? 'Added' : ''}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Shop;
