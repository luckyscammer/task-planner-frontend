import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getFilteredTasks } from '@/api/task';
import ProjectTasksList from '@/components/cards/ProjectTasksList/ProjectTasksList';
import { Task } from '@/lib/types/task';

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    setLoading(true);
    getFilteredTasks({ projectId })
      .then(setTasks)
      .catch(() => setError('Не вдалося завантажити таски'))
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <div>Завантаження тасків…</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Таски проекту</h1>
      <ProjectTasksList tasks={tasks} />
    </div>
  );
};

export default ProjectPage;
