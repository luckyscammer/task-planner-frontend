import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';

import { getTaskById } from '@/api/task';
import { Task } from '@/lib/types/task';

const TaskPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) return;

    setLoading(true);
    getTaskById(taskId)
      .then((data) => {
        setTask(data);
      })
      .catch((e) => {
        console.error(e);
        setError('Не вдалося завантажити таск');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [taskId]);

  if (loading) return <div>Завантаження таска…</div>;
  if (error)   return <div className="error">{error}</div>;
  if (!task)   return <div>Таск не знайдено</div>;

  const assignments = task.assignments ?? [];

  return (
    <div style={{ padding: 16 }}>
      <h1>{task.name}</h1>
      {task.description && <p>{task.description}</p>}

      <div style={{ marginTop: 16 }}>
        <p><strong>Статус:</strong> {task.status}</p>
        <p><strong>Прогрес:</strong> {task.progress}%</p>
        {task.deadline && (
          <p><strong>Дедлайн:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
        )}
        <p><strong>Створено:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      </div>

      <div style={{ marginTop: 24 }}>
        <h2>Виконавці</h2>
        {assignments.length > 0 ? (
          <ul>
            {assignments.map((a) => (
              <li key={a.user.id}>
                {a.user.fullName} (призначено: {new Date(a.assignedAt).toLocaleString()})
              </li>
            ))}
          </ul>
        ) : (
          <p>Немає призначених користувачів</p>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <Link to={`/projects/${task.projectId}`}>← Повернутися до проекту</Link>
      </div>
    </div>
  );
};

export default TaskPage;
