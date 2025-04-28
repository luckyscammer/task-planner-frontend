import React, { useEffect, useState } from 'react';

import { getAllProjects } from '@/api/project';
import { ProjectContext } from '@/hooks/projects/useProjectContext'
import { Project } from '@/lib/types/project';

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllProjects()
      .then(setProjects)
      .catch(() => setError('Failed to load projects'))
      .finally(() => setLoading(false));
  }, []);

  if (!Array.isArray(projects)) {
    console.error('projects is not an array:', projects);
    console.log(projects)
    return <div>Invalid projects data</div>;
  }


  return (
    <ProjectContext.Provider value={{ projects, loading, error }}>
      {children}
    </ProjectContext.Provider>
  );
};


