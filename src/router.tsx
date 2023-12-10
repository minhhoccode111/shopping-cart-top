import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/error-page';
import Index from './routes/index';
import Root from './routes/root';
import Shop from './routes/shop';
import About from './routes/about';
import Add from './routes/add';
import Cart from './routes/cart';
import Login from './routes/login';
import Book from './routes/book';
import ViewImage from './routes/view-image';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: 'shop',
          children: [
            {
              index: true,
              element: <Shop />,
            },
            {
              path: 'shop/:bookId',
              element: <Book />,
            },
            {
              path: 'shop/:bookId/view',
              element: <ViewImage />,
            },
          ],
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'cart',
          element: <Cart />,
        },
        {
          path: 'add',
          element: <Add />,
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
