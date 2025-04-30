import React from 'react';

import ProjectsList from '@/components/layouts/ProjectsList/ProjectsList';
import StatusMessage from '@/components/ui/StatusMessage/StatusMessage';
import { useProjects } from '@/hooks/projects/useProjects';

const HomePage: React.FC = () => {
  const { projects, loading, error } = useProjects();

  if (loading) return <StatusMessage variant="loading">Завантаження проєктів…</StatusMessage>;
  if (error)   return <StatusMessage variant="error">{error}</StatusMessage>;

  return <ProjectsList projects={projects} />;
};

export default HomePage;