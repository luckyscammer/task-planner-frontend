import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import App from '@/App.tsx';
import HomePage from '@/pages/HomePage';
import ProjectPage from '@/pages/ProjectPage';
import TaskPage from '@/pages/TaskPage.tsx';
import UserFormPage from "@/pages/UserFormPage.tsx";
import UsersPage from "@/pages/UsersPage.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/projects/:projectId',
        element: <ProjectPage />,
      },
      {
        path: '/tasks/:taskId',
        element: <TaskPage />,
      },
      {
        path: '/users',
        element: <UsersPage />
      },
      {
        path: '/users/new',
        element: <UserFormPage />
      },
      {
        path: '/users/:userId',
        element: <UserFormPage />
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
