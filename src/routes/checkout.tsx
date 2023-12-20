import { useState, useEffect } from 'react';
import { Link, useLoaderData, useFetcher, useNavigate } from 'react-router-dom';
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
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);
  const [count, setCount] = useState(4);
  useEffect(() => {
    let tmp;
    if (sum === 0) {
      tmp = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);
    }
    return () => {
      clearInterval(tmp);
    };
  }, [sum]);
  useEffect(() => {
    if (count === 0) {
      navigate('/');
    }
  }, [count, navigate]);
  return (
    <>
      {sum !== 0 ? (
        !isFinished ? (
          <article className="max-w-3xl mx-auto">
            <h2 className="">
              So your bill cost: {sum} 000<span className="underline">đ</span>
            </h2>
            <div className="">
              <fetcher.Form
                method="post"
                onSubmit={() => {
                  setIsFinished(true);
                }}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>

                  <input type="text" id="FirstName" name="first_name" className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>

                  <input type="text" id="LastName" name="last_name" className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
                </div>

                <div className="col-span-6">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                    {' '}
                    Email{' '}
                  </label>

                  <input type="email" id="Email" name="email" className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                    {' '}
                    Password{' '}
                  </label>

                  <input type="password" id="Password" name="password" className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                    Password Confirmation
                  </label>

                  <input type="password" id="PasswordConfirmation" name="password_confirmation" className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
                </div>

                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input type="checkbox" id="MarketingAccept" name="marketing_accept" className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm" />

                    <span className="text-sm text-gray-700">I want to receive emails about events, product updates and company announcements.</span>
                  </label>
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-gray-700 underline">
                      {' '}
                      terms and conditions{' '}
                    </a>
                    and
                    <a href="#" className="text-gray-700 underline">
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Create an account
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <a href="#" className="text-gray-700 underline">
                      Log in
                    </a>
                    .
                  </p>
                </div>
              </fetcher.Form>
            </div>
          </article>
        ) : (
          <article className="text-4xl max-w-3xl mx-auto p-1 my-4 text-slate-900 text-center">
            <h2 className="">Congrats! You've successfully purchased</h2>
            <h2 className="text-sky-500 underline decoration-dotted hover:decoration-solid">
              <Link to={'/shop'}>Continue Shopping?</Link>
            </h2>
          </article>
        )
      ) : (
        <article className="text-4xl max-w-3xl mx-auto p-1 my-4 text-slate-900 text-center">
          <h2 className="text-red-700">Cart is empty!</h2>
          <h2 className="">Back to Homepage after {count}s</h2>
        </article>
      )}
    </>
  );
};

export default Checkout;
