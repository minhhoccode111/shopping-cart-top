import { Outlet, NavLink, Link } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <>
      <header className="flex gap-4 items-center bg-red-300 fixed top-0 left-0 right-0 z-10">
        <h1 className="text-3xl">
          <Link to={'/'}>VQS</Link>
        </h1>
        <div className="uppercase">
          <button type="button">vi</button>
        </div>
        <nav className="flex items-center gap-4">
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/'}>
            Home
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/shop'}>
            Shop
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/cart/buy'}>
            Cart
          </NavLink>
        </nav>
      </header>
      <main className="h-screen my-10">
        <Outlet />
      </main>
      <footer className="text-center bg-slate-500 fixed bottom-0 left-0 right-0 z-10">
        <p>Copyright 2022</p>
      </footer>
    </>
  );
};
export default Root;
