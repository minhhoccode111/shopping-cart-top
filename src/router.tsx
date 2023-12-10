import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorElement from './routes/error-page.tsx';
import Index from './routes/index.tsx';
import Root from './routes/root.tsx';
import Books from './routes/books.tsx';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          element: <Index />,
          errorElement: <ErrorElement />,
        },
        {
          path: 'books',
          element: <Books />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
