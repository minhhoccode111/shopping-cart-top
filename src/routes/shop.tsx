import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { getBooks } from '../methods/books';

// add loader to prepare data
export const loader = async () => {
  const books = await getBooks();
  return { books };
};

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const { books } = useLoaderData();
  console.log(books);
  return (
    <>
      <h1>This is in Shop</h1>
      <div className="">
        <button className="underline" type="button" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
      <div className="grid grid-cols-autoFit200 gap-4 p-4">
        {books.map((book) => (
          <Link className="border p-4 block hover:sepia" key={book.id} to={`book/${book.id}`}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.price}</p>
            <p>{book.category}</p>
            <p>{book.id}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Shop;
