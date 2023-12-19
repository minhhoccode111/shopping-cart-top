import React from 'react';
import { Link, NavLink, useRouteError, useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();
  return (
    <>
      <main>
        <div className="grid place-content-center h-screen bg-white px-4">
          <div className="text-center">
            <h1 className="text-9xl font-black text-gray-200">404</h1>

            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

            <p className="mt-4 text-gray-500">We can't find that page.</p>
            <p className="">
              <i className="">{error.statusText || error.message}</i>
            </p>

            <Link to={'/'} className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
              Go Back Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
