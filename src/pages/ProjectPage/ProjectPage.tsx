import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getFilteredTasks } from '@/api/task.ts';
import ProjectTasksList from '@/components/layout/ProjectTasksList/ProjectTasksList.tsx';
import { Task } from '@/lib/types/task.ts';

import styles from './ProjectPage.module.css';

const ALL = 'all' as const;
type Filter = typeof ALL | Task['status'];

const STATUSES: Filter[] = [
  ALL,
  'UNASSIGNED',
  'ASSIGNED',
  'IN_PROGRESS',
  'PENDING_REVIEW',
  'COMPLETED',
];

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>(ALL);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    getFilteredTasks({ projectId })
      .then(setTasks)
      .catch(() => setError('Не вдалося завантажити таски'))
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <div className={styles.loading}>Loading tasks…</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'COMPLETED').length;
  const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const active = tasks.filter((t) => t.status !== 'COMPLETED').length;

  const filtered =
    filter === ALL ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Таски проекту</h1>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <strong>{total}</strong>
          <span>Усього</span>
        </div>
        <div className={styles.stat}>
          <strong>{completed}</strong>
          <span>Завершено</span>
        </div>
        <div className={styles.stat}>
          <strong>{inProgress}</strong>
          <span>В роботі</span>
        </div>
        <div className={styles.stat}>
          <strong>{active}</strong>
          <span>Активні</span>
        </div>
      </div>

      <div className={styles.filters}>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`${styles.filterBtn} ${
              filter === s ? styles.active : ''
            }`}
            onClick={() => setFilter(s)}
          >
            {s === ALL ? 'Усі' : s.replace('_', ' ')}
          </button>
        ))}
      </div>

      <ProjectTasksList tasks={filtered} />
    </div>
  );
};

export default ProjectPage;
