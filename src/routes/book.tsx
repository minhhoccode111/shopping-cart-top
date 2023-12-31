import { useLoaderData, Link, Form, useNavigate, useOutletContext } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import { getBooks, getBook } from '../methods/books';
import { addCart, deleteCart } from '../methods/carts';
import { IoBagCheckOutline } from 'react-icons/io5';

export const loader = async ({ params: { bookId } }) => {
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
  const navigate = useNavigate();
  const { increase, decrease } = useOutletContext();
  return (
    <section className="p-2 sm:p-4">
      {/* background image */}
      <div className="fixed -z-10 top-0 left-0 w-screen h-screen bg-white overflow-hidden">
        <img src="/bg-2.jpg" alt="Background image" className="object-cover border object-center h-full w-full brightness-90" />
      </div>
      <div className="text-4xl">
        <button className="grid place-items-center w-12 h-12 bg-white border-2 border-sky-500 rounded-full hover:bg-sky-500 text-sky-500 hover:text-white transition-all" onClick={() => navigate(-1)}>
          <MdKeyboardBackspace />
        </button>
      </div>

      <div className="grid grid-cols-1 my-8 shadow-lg shadow-gray-600 border-t p-4 mx-auto max-w-2xl gap-4 rounded-lg bg-[#ffffff]">
        <div className="">
          <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-100 text-sm sm:text-base">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="text-slate-900 font-bold">Title</dt>
                <dd className="text-gray-700 sm:col-span-2">{book.title}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="text-slate-900 font-bold">Author(s)</dt>
                <dd className="text-gray-700 sm:col-span-2">{book.author}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="text-slate-900 font-bold">Sale</dt>
                <dd className="text-gray-700 sm:col-span-2">{book.sale}%</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="text-slate-900 font-bold">Price</dt>
                <dd className="text-gray-700 sm:col-span-2">{book.price}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="text-slate-900 font-bold">Description</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {book.description.length > 0
                    ? book.description
                    : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facilis debitis explicabo doloremque impedit nesciunt dolorem facere, dolor quasi veritatis quia fugit aperiam aspernatur neque molestiae labore aliquam soluta architecto?'}
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex my-4 gap-4 items-center">
            <Form
              method="post"
              className={'flex-1 self-stretch'}
              onSubmit={() => {
                if (book.inCart) decrease();
                else increase();
              }}
            >
              <button
                type="submit"
                className={
                  'border-2 font-bold p-4 uppercase w-full flex items-center justify-center transition-all' +
                  ' ' +
                  (book.inCart ? 'border-green-700 text-green-700 bg-white hover:bg-green-700 hover:text-white' : 'border-sky-700 text-sky-700 bg-white hover:bg-sky-700 hover:text-white')
                }
              >
                {book.inCart ? (
                  <>
                    <IoBagCheckOutline className="text-2xl" />
                    <span className="mt-1 ml-2">added</span>
                  </>
                ) : (
                  'Add to cart'
                )}
              </button>
            </Form>
            <div className="flex-1 self-stretch border flex items-stretch justify-stretch">
              <Link to={'/cart'} className="uppercase border-2 border-yellow-700 text-yellow-700 bg-white hover:bg-yellow-700 hover:text-white transition-all p-4 block font-bold text-center w-full">
                view cart
              </Link>
            </div>
          </div>
        </div>

        <div className="">
          <img src={book.image} alt="Book image" className="block w-full" />
        </div>
      </div>
    </section>
  );
};

export default Book;
