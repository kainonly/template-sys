import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './index.tsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Example1 } from './example1/example1.tsx';
import { Example2 } from './example2/example2.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: 'example1',
        element: <Example1 />
      },
      {
        path: 'example2',
        element: <Example2 />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
