import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";

import HomePage from '@/pages/HomePage';
import ProjectPage from '@/pages/ProjectPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/projects/:id',
    element: <ProjectPage />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
