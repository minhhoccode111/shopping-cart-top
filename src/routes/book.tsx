import { useLoaderData, Link, Form, redirect } from 'react-router-dom';
import { getBooks, getBook } from '../methods/books';
import { addCart, deleteCart } from '../methods/carts';

export const loader = async ({ params: { bookId } }) => {
  console.log('loader in book has been called');
  const books = await getBooks();
  const book = books.find((book) => book.id === bookId);
  if (!book) {
    throw new Response('', {
      status: 404,
    });
  }
  return { book };
};

export const action = async ({ params }) => {
  console.log('action  in book has been called');
  console.log(params.bookId);
  const id = params.bookId;
  const book = await getBook(id);
  if (book.inCart) {
    await deleteCart(id);
  } else {
    await addCart(book);
  }
  return null;
};

const Book: React.FC = () => {
  const { book } = useLoaderData();
  return (
    <section className="">
      <h2>This is in Book</h2>

      <div className="flex gap-4">
        <div className="flex-1">
          <Link to={'view'} className="max-w-[400px] block mx-auto">
            <img src={book.image} alt="Book image" className="w-full block" />
          </Link>
        </div>
        <div className="w-96 border p-4">
          <p className="">Title: {book.title}</p>
          <p className="">Author: {book.author}</p>
          <p className="">Price: {book.price}</p>
          <p className="">Category: {book.category}</p>
          <div className="border border-green-700 text-center">
            <Form method="post" className="">
              <button type="submit" className="w-full h-full px-4 py-2 ">
                {book.inCart ? 'Added' : 'Add to cart'}
              </button>
            </Form>
          </div>
          <details className="">
            <summary className="">Description:</summary>
            <p className="">
              {book.description ||
                `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius error eum, architecto similique accusamus eligendi, molestias ab mollitia, reprehenderit voluptatibus perferendis culpa ex repellat obcaecati totam consequatur dolorum numquam aspernatur? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci animi consectetur alias mollitia corporis odio nihil tempore, velit repudiandae commodi eligendi explicabo fugit deleniti minima quo iste, dicta repellendus id. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, vitae quia quis porro necessitatibus nostrum, ducimus doloribus culpa labore, omnis illum quasi. Voluptatibus reiciendis laboriosam incidunt quo hic numquam totam!`}
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Book;
