import { useEffect, useState } from 'react';
import { CiSquareRemove } from 'react-icons/ci';
import { FaCaretSquareDown, FaCaretSquareUp } from 'react-icons/fa';
import { IoSyncCircleOutline } from 'react-icons/io5';
import { useLoaderData, Link, Navigate, useFetcher, useNavigate, useOutletContext } from 'react-router-dom';
import { getCarts, deleteCart, getCart, updateCart, sumCarts } from '../methods/carts';
import PropTypes from 'prop-types';

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
  const { decrease } = useOutletContext();
  const percent = `-${cart.sale}%`;
  const before = Math.round(cart.price * (1 + cart.sale / 100));
  const after = cart.price;
  const isBuying = cart.isBuying;
  return (
    <>
      <div className="">
        <header className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base md:text-lg font-bold">{cart.title}</h2>
          <fetcher.Form method="post" className="" onSubmit={() => decrease()}>
            <input type="text" hidden aria-hidden readOnly placeholder="read cart id" name="id" value={cart.id} />
            <button name="action" value={'delete'} className={'text-2xl sm:text-3xl md:text-4xl text-red-700 bg-white hover:scale-110'} type="submit">
              <CiSquareRemove className="" />
            </button>
          </fetcher.Form>
        </header>
        <p className="text-xs sm:text-sm md:text-base">{cart.author}</p>
      </div>
      <div className={'grid gap-1' + ' ' + (isBuying ? 'grid-cols-7' : 'grid-cols-6')}>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm sm:text-base md:text-lg font-bold">Type</h3>
          <p className="text-xs sm:text-sm md:text-base">{isBuying ? 'Buy' : 'Borrow'}</p>
          {/* toggle to switch between buy and borrow mode */}
          <fetcher.Form method="post" className="">
            <input type="text" hidden aria-hidden readOnly placeholder="read cart id" name="id" value={cart.id} />
            <input type="text" hidden aria-hidden readOnly placeholder="read cart action" name="action" value={'toggle'} />
            <button name="isBuying" value={cart.isBuying ? 'false' : 'true'} className={'text-2xl sm:text-3xl md:text-4xl bg-white hover:scale-110'} type="submit">
              <IoSyncCircleOutline className="" />
            </button>
          </fetcher.Form>
        </div>
        <div className="flex flex-col items-center gap-1 col-span-2">
          <h3 className="text-sm sm:text-base md:text-lg font-bold">Price</h3>
          <p className="text-xs sm:text-sm md:text-base">
            {isBuying ? (
              <>
                <span className="">{before}</span> <span className="">000</span> <span className="underline">đ</span>
              </>
            ) : (
              <>
                <span className="">1000</span>
                <span className="underline">đ</span>
                <span className="">/day</span>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-sm sm:text-base md:text-lg font-bold">Count</h3>
          <p className="text-xs sm:text-sm md:text-base">{isBuying ? cart.inputBuyQuantity : cart.inputBorrowQuantity}</p>
          <div className="flex items-center justify-between gap-1">
            <fetcher.Form method="post" className="">
              <input type="text" hidden aria-hidden readOnly placeholder="read card id" name="id" value={cart.id} />
              <input type="text" hidden aria-hidden readOnly placeholder="read card action" name="action" value="change" />
              <input type="text" hidden aria-hidden readOnly placeholder="read card isBuying" name="isBuying" value={cart.isBuying ? 'true' : 'false'} />
              <button name={'value'} value={-1} className="text-xl sm:text-2xl bg-black text-white rounded hover:scale-110" type="submit">
                <FaCaretSquareDown className="" />
              </button>
            </fetcher.Form>
            <fetcher.Form method="post" className="">
              <input type="text" hidden aria-hidden readOnly placeholder="read card id" name="id" value={cart.id} />
              <input type="text" hidden aria-hidden readOnly placeholder="read card action" name="action" value="change" />
              <input type="text" hidden aria-hidden readOnly placeholder="read card isBuying" name="isBuying" value={cart.isBuying ? 'true' : 'false'} />
              <button name={'value'} value={1} className="text-xl sm:text-2xl bg-black text-white rounded hover:scale-110" type="submit">
                <FaCaretSquareUp className="" />
              </button>
            </fetcher.Form>
          </div>
        </div>
        <div className={'flex flex-col items-center gap-1' + ' ' + (cart.isBuying ? 'block' : 'hidden')}>
          <h3 className="text-sm sm:text-base md:text-lg font-bold">Sale</h3>
          <p className="text-xs sm:text-sm md:text-base">{percent}</p>
        </div>
        <div className="flex flex-col gap-1 items-end col-span-2 ">
          <h3 className="text-sm sm:text-base md:text-lg font-bold">Total</h3>
          <p className="text-xs sm:text-sm md:text-base font-extrabold text-green-700">
            {isBuying ? cart.inputBuyQuantity * after : cart.inputBorrowQuantity} <span className="">{(isBuying ? cart.inputBuyQuantity * after : cart.inputBorrowQuantity) !== 0 ? '000' : ''}</span>
            <span className="underline">đ</span>
          </p>
        </div>
      </div>
    </>
  );
};

const Cart = () => {
  const { carts, sum } = useLoaderData();
  const [warnEmptyCart, setWarnEmptyCart] = useState(false);
  const [willNavigate, setWillNavigate] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setWarnEmptyCart(false);
    }, 5000);
  }, [warnEmptyCart]);
  return (
    <>
      <div className="fixed -z-10 top-0 left-0 w-screen h-screen bg-white overflow-hidden">
        <img src="/public/bg-2.jpg" alt="Background image" className="object-cover border object-center h-full w-full brightness-90" />
      </div>
      <section className="">
        <div className="p-1 sm:p-2 md:p-3 max-w-3xl mx-auto">
          {carts.length ? (
            carts.map((cart) => (
              <article key={cart.id} className="flex gap-2 sm:gap-3 p-2 sm:p-3 my-2 sm:my-3 md:my-4 bg-white shadow shadow-gray-400 rounded text-slate-700">
                <Link to={`/shop/book/${cart.id}`} className="block">
                  <div className="w-32 sm:w-36 md:w-40 lg:w-48">
                    <img src={cart.image} alt="Book image" className="object-center" />
                  </div>
                </Link>
                <div className="flex-1 p-2 flex flex-col gap-2 justify-between">
                  <CartForm cart={cart} />
                </div>
              </article>
            ))
          ) : (
            <article className="max-w-3xl mx-auto uppercase font-bold text-center p-1">
              <header className="">
                <h2 className="text-xl sm:text-2xl md:text-4xl text-slate-900">Oops! Your cart is empty</h2>
              </header>
              <br className="my-4" />
              <div className="">
                <p className="underline decoration-dotted hover:decoration-solid text-sky-500">
                  <Link to={'/shop'}>Shop now!</Link>
                </p>
              </div>
            </article>
          )}

          {carts.length !== 0 && (
            <article className="max-w-3xl mx-auto my-8 p-1 flex flex-col items-end gap-2 sm:gap-4 md:gap-6">
              <header className="self-stretch text-right p-4 rounded bg-white">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-slate-900">
                  Subtotal: {sum} {sum !== 0 ? '000' : ''}
                  <span className="underline">đ</span>
                </h2>
              </header>
              <div className="">
                <p className="text-xl sm:text-2xl md:text-4xl text-red-500 font-bold">{warnEmptyCart && 'Nothing to checkout'}</p>
              </div>
              <div className="">
                <button
                  name="sum"
                  value={sum}
                  className="text-xl sm:text-2xl md:text-4xl uppercase border-2 border-yellow-700 text-yellow-700 font-bold p-2 sm:p-4 md:p-6 transition-all bg-white hover:bg-yellow-700 hover:text-white hover:shadow-lg hover:shadow-gray-400 hover:scale-110"
                  onClick={() => {
                    if (sum === 0) setWarnEmptyCart(true);
                    else setWillNavigate(true);
                  }}
                >
                  Checkout
                </button>
              </div>
            </article>
          )}
        </div>
      </section>
      {willNavigate && <Navigate to={'checkout'} />}
    </>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
};

export default Cart;
