import { useState, useEffect } from 'react';
import { Link, useLoaderData, useFetcher, useNavigate, useOutletContext } from 'react-router-dom';
import { clearCarts, sumCarts } from '../methods/carts';

export const loader = async () => {
  const sum = await sumCarts();
  return { sum };
};

export const action = async () => {
  await clearCarts();
  console.log('Clear Carts');
  return null;
};

const Checkout = () => {
  const { sum } = useLoaderData();
  const { reset } = useOutletContext();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);
  const [count, setCount] = useState(5);
  // count down to navigate back to homepage if sum===0
  useEffect(() => {
    let tmp;
    if (sum === 0 && !isFinished) {
      tmp = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);
    }
    return () => {
      clearInterval(tmp);
    };
  }, [sum, isFinished]);
  useEffect(() => {
    if (count === 0) {
      navigate('/');
    }
  }, [count, navigate]);
  return (
    <>
      {sum !== 0 && !isFinished && (
        <section className="mx-auto max-w-screen-xl px-4 pb-10 my-10 sm:px-6 lg:px-8 shadow-lg shadow-gray-400 rounded-xl">
          <div className="">
            <fetcher.Form
              method="post"
              onSubmit={() => {
                setIsFinished(true);
                reset();
              }}
              className="mt-8 rounded-xl p-4 bg-white"
            >
              <header className="">
                <h2 className="text-center text-3xl p-4 my-2">Order information</h2>
              </header>
              <div className="flex flex-col gap-6">
                <label className="relative text-lg block rounded-md sm:rounded-lg border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                  <input
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 sm:text-lg"
                    placeholder="Enter your name"
                    required
                    type="text"
                  />

                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-sm text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-1 peer-focus:text-sm peer-focus:sm:text-base">
                    Name
                  </span>
                </label>
                <label className="relative text-lg block rounded-md sm:rounded-lg border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                  <input
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 sm:text-lg"
                    placeholder="Enter your address"
                    required
                    type="text"
                  />

                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-sm text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-1 peer-focus:text-sm peer-focus:sm:text-base">
                    Address
                  </span>
                </label>
                <label className="relative text-lg block rounded-md sm:rounded-lg border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                  <input
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 sm:text-lg"
                    placeholder="Enter your email"
                    required
                    type="email"
                  />

                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-sm text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-1 peer-focus:text-sm peer-focus:sm:text-base">
                    Email
                  </span>
                </label>
                <label className="relative text-lg block rounded-md sm:rounded-lg border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                  <input
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 sm:text-lg"
                    placeholder="Enter your phone number"
                    required
                    type="text"
                  />

                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-sm text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-1 peer-focus:text-sm peer-focus:sm:text-base">
                    Phone
                  </span>
                </label>
                <label className="relative text-lg block rounded-md sm:rounded-lg border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                  <textarea
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 sm:text-lg"
                    placeholder="Enter your notes"
                    required
                  />

                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-sm text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-1 peer-focus:text-sm peer-focus:sm:text-base">
                    Notes
                  </span>
                </label>
              </div>
              <div className="text-xl text-right py-4">
                <h2 className="">
                  Total:{' '}
                  <strong className="">
                    {sum} 000<span className="underline">đ</span>
                  </strong>
                </h2>
              </div>
              <div className="">
                <button className="block w-full border rounded-lg p-4 font-bold uppercase border-sky-500 text-sky-500 bg-white hover:bg-sky-500 hover:text-white transition-all" type="submit">
                  Confirm
                </button>
              </div>
            </fetcher.Form>
          </div>
        </section>
      )}

      {sum === 0 && isFinished && (
        <article className="text-4xl max-w-3xl mx-auto p-1 my-4 text-slate-900 text-center">
          <h2 className="">Congrats! You've successfully purchased</h2>
          <h2 className="">Your order is on its way</h2>
          <h2 className="text-sky-500 underline decoration-dotted hover:decoration-solid">
            <Link to={'/shop'}>Continue Shopping?</Link>
          </h2>
        </article>
      )}

      {sum === 0 && !isFinished && (
        <article className="text-4xl max-w-3xl mx-auto p-1 my-4 text-slate-900 text-center">
          <h2 className="text-red-700">Cannot checkout!</h2>
          <h2 className="text-red-700">Cart is empty!</h2>
          <h2 className="">Back to Homepage after {count}s</h2>
        </article>
      )}
    </>
  );
};

export default Checkout;
