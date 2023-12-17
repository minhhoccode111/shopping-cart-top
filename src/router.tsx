import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/error-page';
import Root from './routes/root';
import Index from './routes';
import Shop, { loader as shopLoader, action as shopAction } from './routes/shop';
import Book, { loader as bookLoader, action as bookAction } from './routes/book';
import Cart, { loader as cartLoader, action as cartAction } from './routes/cart';
import Login from './routes/login';
import View, { loader as viewLoader } from './routes/view-image';
import Checkout, { loader as checkoutLoader, action as checkoutAction } from './routes/checkout';
import About from './routes/about';

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
            { index: true, element: <Shop />, loader: shopLoader, action: shopAction },
            {
              path: 'book/:bookId',
              element: <Book />,
              loader: bookLoader,
              action: bookAction,
            },
            {
              path: 'book/:bookId/view',
              element: <View />,
              loader: viewLoader,
            },
          ],
        },
        {
          path: 'cart',
          element: <Cart />,
          errorElement: <ErrorPage />,
          loader: cartLoader,
          action: cartAction,
        },
        {
          path: 'cart/checkout',
          element: <Checkout />,
          loader: checkoutLoader,
          action: checkoutAction,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
