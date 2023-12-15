import { useLoaderData, useSubmit, Form } from 'react-router-dom';
import { getCarts } from '../methods/carts';

export const loader = async () => {
  const carts = await getCarts();
  console.log(carts);
  return { carts };
};

const Cart = () => {
  const { carts } = useLoaderData();
  const submit = useSubmit();
  return (
    <section className="">
      <h1 className="text-4xl">This is in Cart</h1>

      <div className="">
        {carts.map((cart) => (
          <div key={cart.id} className="flex items-center gap-4 p-4">
            <div className="w-32">
              <img src={cart.image} alt="Book image" className="object-center" />
            </div>
            <div className="">
              <Form method="post">
                <input type="hidden" name="id" value={cart.id} />
                <button type="submit">Add to cart</button>
              </Form>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cart;
