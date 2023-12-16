import { useLoaderData, Link, useSubmit, Form, useFetcher } from 'react-router-dom';
import { getCarts, updateCart, sumCarts } from '../methods/carts';

export const loader = async () => {
  const carts = await getCarts();
  const sum = await sumCarts();
  console.log(carts);
  return { carts, sum };
};

export const action = async ({ request }) => {
  const data = await request.formData();
  const obj = Object.fromEntries(data);
  obj.isBuying = obj.isBuying === 'true';
  console.log(obj);
  await updateCart(obj.id, obj);
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
          <i className="text-slate-700 line-through">
            {beforeSale} 000
            <span className="underline">đ</span>
          </i>{' '}
          <span className="inline-block border border-red-500 text-red-500 text-xs ml-2 p-1 rounded">{salePercent}</span>
        </p>
        <p className="text-lg">
          {afterSale} 000<span className="underline">đ</span>
        </p>
      </>
    );
  } else {
    jsxPrice = (
      <p className="">
        1 000<span className="underline">đ</span>/day
      </p>
    );
  }
  return (
    <>
      <div className="">
        <p className="">{cart.title}</p>
        <p className="">{cart.author}</p>
        {jsxPrice}
      </div>
      {/* <div className="flex items-center gap-4 justify-between relative"> */}
      <fetcher.Form method="post" className="absolute z-10 top-0 right-0">
        <input type="text" hidden aria-hidden readOnly placeholder="This input is used for transfer data" name="id" value={cart.id} />
        <button name="isBuying" value={cart.isBuying ? 'false' : 'true'} className={'px-4 py-2 underline'} type="submit">
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
      {/* </div> */}
    </>
  );
};

const Cart = () => {
  const { carts, sum } = useLoaderData();
  return (
    <section className="">
      <h1 className="text-xs">This is in Cart you can choose to either buy or borrow the book with the quantity you want</h1>

      <div className="">
        {carts.map((cart) => (
          <div key={cart.id} className="flex gap-2 m-4 border">
            <Link to={`/shop/book/${cart.id}`} className="">
              <div className="w-32 sm:w-36 md:w-40 lg:w-48">
                <img src={cart.image} alt="Book image" className="object-center" />
              </div>
            </Link>
            <div className="flex-1 p-2 relative">
              <CartForm cart={cart} />
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-right p-4">Subtotal: {sum}</h2>
    </section>
  );
};

export default Cart;
