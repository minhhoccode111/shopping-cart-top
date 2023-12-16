import { useState } from 'react';
import { useActionData, Form, Link } from 'react-router-dom';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { sum } = Object.fromEntries(formData);
  return { sum };
};

const Checkout = () => {
  const { sum } = useActionData();
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
            <Form
              onSubmit={(e) => {
                setIsFinished(true);
                e.preventDefault();
              }}
            >
              <button className="border p-4">Confirm order</button>
            </Form>
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
