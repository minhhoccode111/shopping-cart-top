import { Outlet, NavLink, Link } from 'react-router-dom';
const Root: React.FC = () => {
  return (
    <>
      <header className="flex gap-4 items-center bg-red-300">
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
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/login'}>
            Login
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/about'}>
            About
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/cart'}>
            Cart
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/add'}>
            Add
          </NavLink>
        </nav>
      </header>
      <main className="h-4/5">
        <Outlet />
      </main>
      <footer className="text-center bg-slate-500">
        <p>Copyright 2022</p>
      </footer>
    </>
  );
};
export default Root;
