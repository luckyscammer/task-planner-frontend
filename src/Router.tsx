import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";

import App from "@/App.tsx";
import HomePage from '@/pages/HomePage';
import ProjectPage from '@/pages/ProjectPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/projects/:id',
        element: <ProjectPage />,
      },
    ]
  }
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
