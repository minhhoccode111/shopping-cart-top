import { Link } from 'react-router-dom';
import data from '../methods/data';

const Shop: React.FC = () => {
  return (
    <>
      <h1>This is in Shop</h1>
      <div className="grid grid-cols-autoFit100">
        {data.map((book) => (
          <Link className="border p-4 block" key={book.id} to={`/shop/${book.id}`}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.price}</p>
            <p>{book.category}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Shop;
