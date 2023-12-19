import { useEffect, useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useLoaderData, Link, Navigate, useFetcher, useNavigate } from 'react-router-dom';
import { getCarts, deleteCart, getCart, updateCart, sumCarts } from '../methods/carts';

export const loader = async () => {
  const carts = await getCarts();
  const sum = await sumCarts();
  return { carts, sum };
};

export const action = async ({ request }) => {
  // this action handle 3 form submission
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const id = data.id;

  if (data.action === 'toggle') {
    await updateCart(id, { isBuying: data.isBuying === 'true' });
    return null;
  }

  if (data.action === 'delete') {
    await deleteCart(id);
    return null;
  }
  // else data.action === 'change' below this
  const cart = await getCart(id);
  const value = Number(data.value);

  if (data.isBuying === 'true') {
    const buyQuantity = cart.inputBuyQuantity + value;
    if (buyQuantity < 0) alert('Please use positive quantity!');
    else await updateCart(id, { inputBuyQuantity: buyQuantity });
    return null;
  }
  // else data.isBuying === false
  const borrowQuantity = cart.inputBorrowQuantity + value;
  if (borrowQuantity < 0) alert('Please use positive quantity!');
  else await updateCart(id, { inputBorrowQuantity: borrowQuantity });
  return null;
};

const CartForm = ({ cart }) => {
  const fetcher = useFetcher();
  const percent = `-${cart.sale}%`;
  const before = Math.round(cart.price * (1 + cart.sale / 100));
  const after = cart.price;
  let jsxPrice;
  if (cart.isBuying) {
    jsxPrice = (
      <>
        <p className="">
          <i className="text-slate-700 line-through">
            {before} 000
            <span className="underline">đ</span>
          </i>{' '}
          <span className="inline-block border border-red-500 text-red-500 text-xs ml-2 p-1 rounded">{percent}</span>
        </p>
        <p className="text-lg">
          {after} 000<span className="underline">đ</span>
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
      <div className="absolute z-10 right-0 bottom-full flex items-center justify-between gap-2">
        <fetcher.Form method="post" className="rounded-t-xl hover:shadow-inner transition-shadow shadow-gray-700 bg-gray-200 shadow-md">
          <input type="text" hidden aria-hidden readOnly placeholder="read cart id" name="id" value={cart.id} />
          <input type="text" hidden aria-hidden readOnly placeholder="read cart action" name="action" value={'toggle'} />
          <button name="isBuying" value={cart.isBuying ? 'false' : 'true'} className={'px-4 py-2 underline'} type="submit">
            {cart.isBuying ? 'Buy' : 'Borrow'}
          </button>
        </fetcher.Form>
        <fetcher.Form method="post" className="rounded-t-xl hover:shadow-inner transition-shadow shadow-gray-700 bg-gray-200 shadow-md">
          <input type="text" hidden aria-hidden readOnly placeholder="read cart id" name="id" value={cart.id} />
          <button name="action" value={'delete'} className={'px-4 py-2'} type="submit">
            Delete
          </button>
        </fetcher.Form>
      </div>
      <fetcher.Form method="post" className="">
        <input type="text" hidden aria-hidden readOnly placeholder="read card id" name="id" value={cart.id} />
        <input type="text" hidden aria-hidden readOnly placeholder="read card action" name="action" value="change" />
        <input type="text" hidden aria-hidden readOnly placeholder="read card isBuying" name="isBuying" value={cart.isBuying ? 'true' : 'false'} />
        <button name={'value'} value={-1} className="rounded-lg h-4 w-8 flex items-center justify-center border-2 font-bold text-red-800 border-red-800" type="submit">
          -
        </button>
      </fetcher.Form>
      <fetcher.Form method="post" className="">
        <input type="text" hidden aria-hidden readOnly placeholder="read card id" name="id" value={cart.id} />
        <input type="text" hidden aria-hidden readOnly placeholder="read card action" name="action" value="change" />
        <input type="text" hidden aria-hidden readOnly placeholder="read card isBuying" name="isBuying" value={cart.isBuying ? 'true' : 'false'} />
        <button name={'value'} value={1} className="rounded-lg h-4 w-8 flex items-center justify-center border-2 font-bold text-green-800 border-green-800" type="submit">
          +
        </button>
      </fetcher.Form>
      <p className="">
        {cart.isBuying
          ? `You buy this book. Quantity: ${cart.inputBuyQuantity}. Total: ${cart.inputBuyQuantity * cart.price} 000`
          : `You borrow this book. Quantity: ${cart.inputBorrowQuantity} day(s). Total: ${cart.inputBorrowQuantity} 000`}
        <span className="underline">đ</span>
      </p>
    </>
  );
};

const Cart = () => {
  const { carts, sum } = useLoaderData();
  const [warnEmptyCart, setWarnEmptyCart] = useState(false);
  const [willNavigate, setWillNavigate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setWarnEmptyCart(false);
    }, 5000);
  }, [warnEmptyCart]);
  return (
    <section className="">
      <div className="text-4xl p-4">
        <button className="grid place-items-center w-12 h-12 bg-white border-2 border-sky-500 rounded-full hover:bg-sky-500 text-sky-500 hover:text-white transition-all" onClick={() => navigate(-1)}>
          <MdKeyboardBackspace />
        </button>
      </div>
      <div className="">
        {carts.length ? (
          carts.map((cart) => (
            <div key={cart.id} className="flex gap-2 m-4 border mt-8 mb-16 bg-white">
              <Link to={`/shop/book/${cart.id}`} className="">
                <div className="w-32 sm:w-36 md:w-40 lg:w-48">
                  <img src={cart.image} alt="Book image" className="object-center" />
                </div>
              </Link>
              <div className="flex-1 p-2 relative">
                <CartForm cart={cart} />
              </div>
            </div>
          ))
        ) : (
          <div className="uppercase h-full flex flex-col items-center justify-center">
            <p className="">Oops! Your cart is empty</p>
            <p className="underline hover:no-underline transition-all">
              <Link to={'/shop'}>Shop now!</Link>
            </p>
          </div>
        )}
      </div>

      {carts.length !== 0 && (
        <div className="">
          <h2 className="text-right p-4">
            Subtotal: {sum} 000<span className="underline">đ</span>
          </h2>
          <div className="">
            <p className="text-red-500 font-bold">{warnEmptyCart && 'Nothing to checkout'}</p>
            <button
              name="sum"
              value={sum}
              className="uppercase py-4 px-8 border-2"
              onClick={() => {
                if (sum === 0) setWarnEmptyCart(true);
                else setWillNavigate(true);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      {willNavigate && <Navigate to={'checkout'} />}
    </section>
  );
};

export default Cart;
