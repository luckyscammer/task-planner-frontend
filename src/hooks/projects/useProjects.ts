import { useProjectContext } from '@/hooks/projects/useProjectContext';

export const useProjects = () => {
  const context = useProjectContext();
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
