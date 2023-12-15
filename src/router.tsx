import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/error-page';
import Root from './routes/root';
import Index from './routes';
import Shop, { loader as shopLoader } from './routes/shop';
import Book, { loader as bookLoader } from './routes/book';
import CartBorrow from './routes/cart-borrow';
import CartBuy from './routes/cart-buy';
import Cart from './routes/cart-default';

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
            { index: true, element: <Shop />, loader: shopLoader },
            {
              path: 'book/:bookId',
              element: <Book />,
              loader: bookLoader,
            },
          ],
        },
        {
          path: 'cart',
          element: <Cart />,
          children: [
            {
              path: 'buy',
              element: <CartBuy />,
            },
            {
              path: 'borrow',
              element: <CartBorrow />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
