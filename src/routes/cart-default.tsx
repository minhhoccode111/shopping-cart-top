import { NavLink, Outlet } from 'react-router-dom';

const Cart = () => {
  return (
    <>
      <header className="">
        <nav className="">
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'buy'}>
            Buy
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'borrow'}>
            Borrow
          </NavLink>
        </nav>
      </header>
      <section className="">
        <Outlet />
      </section>
    </>
  );
};

export default Cart;
