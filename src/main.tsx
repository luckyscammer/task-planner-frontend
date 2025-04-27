import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ProjectProvider } from '@/hooks/projects/ProjectsProvider.tsx';
import Router from '@/Router.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectProvider>
      <Router />
    </ProjectProvider>
  </StrictMode>,
);
