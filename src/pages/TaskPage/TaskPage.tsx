import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTaskById } from '@/api/task';
import LinkButton from '@/components/ui/LinkButton/LinkButton';
import { Task } from '@/lib/types/task';

import styles from './TaskPage.module.css';

const TaskPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) return;
    setLoading(true);
    getTaskById(taskId)
      .then((data) => setTask(data))
      .catch(() => setError('Не вдалося завантажити таск'))
      .finally(() => setLoading(false));
  }, [taskId]);

  if (loading) return <div className={styles.message}>Завантаження таска…</div>;
  if (error)   return <div className={styles.error}>{error}</div>;
  if (!task)   return <div className={styles.message}>Таск не знайдено</div>;

  const assignments = task.assignments ?? [];
  const isOverdue = task.deadline && new Date(task.deadline) < new Date();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{task.name}</h1>
        <LinkButton
          to={`/tasks/${task.id}/edit`}
          variant="secondary"
          size="small"
        >
          Редагувати таск
        </LinkButton>

      </div>

      {task.description && <p className={styles.description}>{task.description}</p>}

      <div className={styles.details}>
        <div>
          <span className={styles.label}>Статус:</span>
          <span className={styles.value}>{task.status.replace('_', ' ')}</span>
        </div>
        <div>
          <span className={styles.label}>Прогрес:</span>
          <span className={styles.value}>{task.progress}%</span>
        </div>
        {task.deadline && (
          <div>
            <span className={styles.label}>Дедлайн:</span>
            <span className={isOverdue ? styles.overdue : styles.value}>
              {new Date(task.deadline).toLocaleDateString()}
            </span>
          </div>
        )}
        <div>
          <span className={styles.label}>Створено:</span>
          <span className={styles.value}>
            {new Date(task.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <section className={styles.assignmentsSection}>
        <h2 className={styles.sectionTitle}>Виконавці</h2>
        {assignments.length > 0 ? (
          <ul className={styles.assignmentsList}>
            {assignments.map(a => (
              <li key={a.user.id} className={styles.assignmentItem}>
                {a.user.fullName}
                <span className={styles.assignedAt}>
                  ({new Date(a.assignedAt).toLocaleString()})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.message}>Немає призначених користувачів</p>
        )}
      </section>

      <div className={styles.footer}>
        <LinkButton to={`/projects/${task.projectId}`}>← Повернутися до проекту</LinkButton>
      </div>
    </div>
  );
};

export default TaskPage;