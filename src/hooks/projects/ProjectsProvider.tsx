import React, { useEffect, useState } from 'react';

import { getAllProjects, getProjectStatus } from '@/api/project';
import { ProjectContext } from '@/hooks/projects/useProjectContext';
import { Project as BaseProject } from '@/lib/types/project';

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<
    (BaseProject & { progress?: number })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const base = await getAllProjects(); // BaseProject[]
        const withProgress = await Promise.all(
          base.map(async (p: { id: string }) => {
            const status = await getProjectStatus(p.id);
            return { ...p, progress: status.progress };
          }),
        );
        setProjects(withProgress);
      } catch (e) {
        console.error(e);
        setError('Failed to load projects with status');
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, loading, error }}>
      {children}
    </ProjectContext.Provider>
  );
};
