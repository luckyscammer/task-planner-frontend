import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import { deleteTask,getTaskById } from '@/api/task';
import LinkButton from '@/components/ui/LinkButton/LinkButton';
import { Task } from '@/lib/types/task';

import styles from './TaskPage.module.css';

const TaskPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const [task, setTask]     = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) return;
    setLoading(true);
    getTaskById(taskId)
      .then(setTask)
      .catch(() => setError('Не вдалося завантажити таск'))
      .finally(() => setLoading(false));
  }, [taskId]);

  const handleDelete = async () => {
    if (!task) return;
    if (window.confirm(`Видалити таск “${task.name}”?`)) {
      try {
        await deleteTask(task.id);
        navigate(`/projects/${task.projectId}`);
      } catch {
        alert('Не вдалося видалити таск');
      }
    }
  };

  if (loading) return <div className={styles.message}>Завантаження таска…</div>;
  if (error)   return <div className={styles.error}>{error}</div>;
  if (!task)   return <div className={styles.message}>Таск не знайдено</div>;

  const assignments = task.assignments ?? [];
  const isOverdue = task.deadline ? new Date(task.deadline) < new Date() : false;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{task.name}</h1>
        <div className={styles.actions}>
          <LinkButton
            to={`/tasks/${task.id}/edit`}
            variant="secondary"
            size="small"
          >
            Редагувати
          </LinkButton>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleDelete}
          >
            Видалити
          </button>
        </div>
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
        <LinkButton to={`/projects/${task.projectId}`} size="small">
          ← Повернутися до проекту
        </LinkButton>
      </div>
    </div>
  );
};

export default TaskPage;
