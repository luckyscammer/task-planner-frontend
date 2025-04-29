import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import App from '@/App.tsx';
import HomePage from '@/pages/HomePage';
import ProjectPage from '@/pages/ProjectPage';
import TaskPage from '@/pages/TaskPage.tsx';

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
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
