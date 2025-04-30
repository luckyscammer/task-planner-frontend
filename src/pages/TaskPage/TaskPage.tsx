import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteTask, getTaskById } from '@/api/task';
import { assignUser, unassignUser } from '@/api/taskAssignment';
import { getAllUsers } from '@/api/user';
import LinkButton from '@/components/ui/LinkButton/LinkButton';
import StatusMessage from '@/components/ui/StatusMessage/StatusMessage';
import { Task } from '@/lib/types/task';
import { User } from '@/lib/types/user';

import styles from './TaskPage.module.css';

const TaskPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate   = useNavigate();

  const [task, setTask]                   = useState<Task | null>(null);
  const [users, setUsers]                 = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!taskId) return;
    setLoading(true);
    try {
      const [t, allUsers] = await Promise.all([
        getTaskById(taskId),
        getAllUsers(),
      ]);
      setTask(t);
      setUsers(allUsers);
      setSelectedUserId('');
    } catch {
      setError('Не вдалося завантажити дані');
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleAssign = async () => {
    if (!task || !selectedUserId) return;
    try {
      await assignUser({ taskId: task.id, userId: selectedUserId });
      await fetchData();
    } catch {
      alert('Не вдалося призначити користувача');
    }
  };

  const handleUnassign = async (userId: string) => {
    if (!task) return;
    try {
      await unassignUser(userId, task.id);
      await fetchData();
    } catch {
      alert('Не вдалося зняти призначення');
    }
  };

  if (loading) return <StatusMessage variant="loading">Завантаження…</StatusMessage>;
  if (error)   return <StatusMessage variant="error">{error}</StatusMessage>;
  if (!task)   return <StatusMessage variant="empty">Таск не знайдено</StatusMessage>;

  const assignedIds = new Set(task.assignments.map(a => a.user.id));
  const isOverdue   = task.deadline ? new Date(task.deadline) < new Date() : false;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{task.name}</h1>
        <div className={styles.actions}>
          <LinkButton to={`/tasks/${task.id}/edit`} variant="secondary" size="small">
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
          <span className={styles.label}>Статус:</span>{' '}
          <span className={styles.value}>{task.status.replace('_', ' ')}</span>
        </div>
        <div>
          <span className={styles.label}>Прогрес:</span>{' '}
          <span className={styles.value}>{task.progress}%</span>
        </div>
        {task.deadline && (
          <div>
            <span className={styles.label}>Дедлайн:</span>{' '}
            <span className={isOverdue ? styles.overdue : styles.value}>
              {new Date(task.deadline).toLocaleDateString()}
            </span>
          </div>
        )}
        <div>
          <span className={styles.label}>Створено:</span>{' '}
          <span className={styles.value}>
            {new Date(task.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <section className={styles.assignmentsSection}>
        <h2 className={styles.sectionTitle}>Виконавці</h2>
        {task.assignments.length > 0 ? (
          <ul className={styles.assignmentsList}>
            {task.assignments.map(a => (
              <li key={a.user.id} className={styles.assignmentItem}>
                {a.user.fullName}
                <button
                  type="button"
                  className={styles.unassignBtn}
                  onClick={() => handleUnassign(a.user.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <StatusMessage variant="empty">Немає призначених користувачів</StatusMessage>
        )}
      </section>

      <div className={styles.assignForm}>
        <select
          value={selectedUserId}
          onChange={e => setSelectedUserId(e.target.value)}
          className={styles.select}
        >
          <option value="">Виберіть користувача…</option>
          {users
            .filter(u => !assignedIds.has(u.id))
            .map(u => (
              <option key={u.id} value={u.id}>
                {u.fullName}
              </option>
            ))}
        </select>
        <button
          type="button"
          className={styles.assignBtn}
          onClick={handleAssign}
          disabled={!selectedUserId}
        >
          Призначити
        </button>
      </div>

      <div className={styles.footer}>
        <LinkButton to={`/projects/${task.projectId}`} size="small">
          ← Повернутися до проекту
        </LinkButton>
      </div>
    </div>
  );
};

export default TaskPage;
