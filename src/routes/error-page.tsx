import React from 'react';
import { Link, NavLink, useRouteError, useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();
  return (
    <>
      <header className="flex gap-4 items-center bg-red-300 fixed top-0 left-0 right-0">
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
        </nav>
      </header>
      <main>
        <div id="error-page" className="flex flex-col gap-4 p-4 text-4xl h-screen items-center justify-center">
          <h1 className="">Oops!</h1>
          <p className="">Sorry, an unexpected error has occurred.</p>
          <p className="">
            <i>{error.statusText || error.message}</i>
          </p>
          <p>
            <button className="underline" type="button" onClick={() => navigate(-1)}>
              Go back
            </button>
          </p>
        </div>
      </main>
      <footer className="text-center bg-slate-500 fixed bottom-0 left-0 right-0">
        <p>Copyright 2022</p>
      </footer>
    </>
  );
};

export default ErrorPage;
