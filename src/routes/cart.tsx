import { useLoaderData, Link, useSubmit, Form, useFetcher } from 'react-router-dom';
import { getCarts } from '../methods/carts';

export const loader = async () => {
  const carts = await getCarts();
  console.log(carts);
  return { carts };
};

export const action = async ({ request }) => {
  const data = await request.formData();
  console.log(data);
  return null;
};

const CartForm = ({ cart }) => {
  const fetcher = useFetcher();
  const submit = useSubmit();
  const salePercent = `-${cart.sale}%`;
  const beforeSale = Math.round(cart.price * (1 + cart.sale / 100));
  const afterSale = cart.price;
  let jsxPrice;
  if (cart.isBuying) {
    jsxPrice = (
      <>
        <p className="">
          <i className="text-slate-700 line-through">{beforeSale}</i> <strong className="">{salePercent}</strong>
        </p>
        <p className="text-lg">{afterSale}</p>
      </>
    );
  } else {
    jsxPrice = <p className="">1 000đ/day</p>;
  }
  return (
    <>
      <div className="">
        <p className="">{cart.title}</p>
        <p className="">{cart.author}</p>
        {jsxPrice}
      </div>
      <div className="flex items-center gap-4 justify-between">
        <fetcher.Form method="post" className="">
          <input type="text" hidden aria-hidden readOnly placeholder="This input is used for transfer data" name="id" value={cart.id} />
          <button name="isBuying" value={cart.isBuying ? 'false' : 'true'} className={'border rounded px-4 py-2'} type="submit">
            {cart.isBuying ? 'Buy' : 'Borrow'}
          </button>
        </fetcher.Form>
        <fetcher.Form method="post" className="">
          <input type="text" hidden aria-hidden readOnly placeholder="This input is used for transfer data" name="id" value={cart.id} />
          <button name="decrease" value={'true'} className="px-4 py-2 rounded-lg border-2 font-bold text-red-400 border-red-400">
            -
          </button>
          <button className="px-4 py-2 rounded-lg border-2 font-bold text-green-400 border-green-400">+</button>
          <input
            type="number"
            className="p-2 w-12 rounded-md"
            min={0}
            max={cart.isBuying ? cart.buyQuantity : cart.borrowQuantity}
            readOnly={cart.isBuying ? true : false}
            defaultValue={cart.isBuying ? cart.inputBuyQuantity : cart.inputBorrowQuantity}
          />
          <span className="text-xs text-gray-50">{cart.isBuying ? 'book(s)' : 'day(s)'}*</span>
        </fetcher.Form>
      </div>
    </>
  );
};

const Cart = () => {
  const { carts } = useLoaderData();
  return (
    <section className="">
      <h1 className="text-xs">This is in Cart you can choose to either buy or borrow the book with the quantity you want</h1>

      <div className="">
        {carts.map((cart) => (
          <div key={cart.id} className="flex gap-2 m-4 border">
            <Link to={`/shop/book/${cart.id}`} className="">
              <div className="w-32">
                <img src={cart.image} alt="Book image" className="object-center" />
              </div>
            </Link>
            <div className="flex-1 p-2">
              <CartForm cart={cart} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cart;
