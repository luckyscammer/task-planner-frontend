import { useContext } from 'react';

import { ProjectContext } from '@/hooks/projects/useProjectContext';

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
