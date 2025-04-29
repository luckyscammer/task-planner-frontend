import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import App from '@/App.tsx';
import HomePage from '@/pages/HomePage/HomePage.tsx';
import ProjectPage from '@/pages/ProjectPage/ProjectPage.tsx';
import TaskFormPage from "@/pages/TaskFormPage/TaskFormPage.tsx";
import TaskPage from '@/pages/TaskPage/TaskPage.tsx';
import UserFormPage from "@/pages/UserFormPage/UserFormPage.tsx";
import UsersPage from "@/pages/UsersPage/UsersPage.tsx";

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
        path: '/projects/:projectId/tasks/new',
        element: <TaskFormPage />,
      },
      {
        path: '/tasks/:taskId/edit',
        element: <TaskFormPage />,
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
