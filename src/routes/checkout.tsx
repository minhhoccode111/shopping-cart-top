import { useState } from 'react';
import { Link, useLoaderData, useFetcher } from 'react-router-dom';
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
  const [isFinished, setIsFinished] = useState(false);
  return (
    <>
      {!isFinished ? (
        <div>
          <h1 className="">This is in Checkout</h1>
          <h2 className="">
            So your bill cost: {sum} 000<span className="underline">đ</span>
          </h2>
          <div className="">
            <fetcher.Form
              method="post"
              onSubmit={() => {
                setIsFinished(true);
              }}
            >
              <Link className="" to={'/cart'}>
                Cancel
              </Link>
              <button className="border p-4" type="submit">
                Confirm order
              </button>
            </fetcher.Form>
          </div>
        </div>
      ) : (
        <div className="">
          <p className="">Congrats! You've successfully purchased</p>
          <p className="underline">
            <Link to={'/shop'}>Continue Shopping?</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Checkout;
