import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <>
      <header className="flex gap-4 items-center bg-red-300">
        <h1 className="text-3xl">
          <Link to={'/'}>VQS</Link>
        </h1>
        <div className="uppercase">
          <button type="button">vi</button>
        </div>
        <nav className="">
          <ul className="flex gap-4 items-center">
            <li>
              <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/'}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/shop'}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/about'}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/cart'}>
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/blog'}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive, isPending }) => (isActive ? 'underline' : isPending ? 'pending' : '')} to={'/add'}>
                Add
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Oops! Something went wrong</h1>
        <i>404 Page Not Found</i>
        <p>Please navigate back </p>
      </main>
      <footer className="text-center bg-slate-500">
        <p>Copyright 2022</p>
      </footer>
    </>
  );
};

export default ErrorPage;
