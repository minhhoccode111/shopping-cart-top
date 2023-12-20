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
            <div className="border">
              <fetcher.Form
                method="post"
                onSubmit={() => {
                  setIsFinished(true);
                }}
                className=""
              >
                <div className="div">
                  <label className="">
                    <span className="">Name: </span>
                    <input type="text" required className="" placeholder="Enter your name" minLength={2} />
                  </label>
                </div>
                <div className="div">
                  <label className="">
                    <span className="">Address: </span>
                    <input type="text" required className="" placeholder="Enter your address" minLength={5} />
                  </label>
                </div>
                <div className="div">
                  <label className="">
                    <span className="">Phone: </span>
                    <input type="tel" required className="" placeholder="Enter your phone number" minLength={9} />
                  </label>
                </div>
                <div className="div">
                  <label className="">
                    <span className="">Email: </span>
                    <input type="email" required className="" placeholder="Enter your email" />
                  </label>
                </div>

                <div className="">
                  <Link className="" to={'/cart'}>
                    Cancel
                  </Link>
                  <button className="border p-4" type="submit">
                    Confirm order
                  </button>
                </div>
              </fetcher.Form>
            </div>
          </article>
        ) : (
          <div className="">
            <p className="">Congrats! You've successfully purchased</p>
            <p className="underline">
              <Link to={'/shop'}>Continue Shopping?</Link>
            </p>
          </div>
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
