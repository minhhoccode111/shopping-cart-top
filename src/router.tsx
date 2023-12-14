import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/error-page';
import Root from './routes/root';
import Index from './routes';
import Shop, { loader as shopLoader } from './routes/shop';
import Book, { loader as bookLoader } from './routes/book';

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
