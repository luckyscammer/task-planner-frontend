import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createTask, getTaskById, updateTask } from '@/api/task';
import LinkButton from '@/components/ui/LinkButton/LinkButton';
import { Task } from '@/lib/types/task';

import styles from '@/styles/Form.module.css';

const STATUSES: Task['status'][] = [
  'UNASSIGNED',
  'ASSIGNED',
  'IN_PROGRESS',
  'PENDING_REVIEW',
  'COMPLETED',
];

interface FormData {
  name: string;
  description: string;
  status: Task['status'];
}

const TaskForm: React.FC = () => {
  const { projectId, taskId } = useParams<{
    projectId?: string;
    taskId?: string;
  }>();
  const isEdit = Boolean(taskId);
  const navigate = useNavigate();

  const [parentProjectId, setParentProjectId] = useState<string | undefined>(
    projectId,
  );

  const [form, setForm] = useState<FormData>({
    name: '',
    description: '',
    status: 'UNASSIGNED',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit || !taskId) return;
    getTaskById(taskId)
      .then((t) => {
        setForm({
          name: t.name,
          description: t.description || '',
          status: t.status,
        })
        setParentProjectId(t.projectId);
      })
      .catch(() => setError('Не вдалося завантажити таск'));
  }, [isEdit, taskId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && taskId) {
        await updateTask(taskId, form);
        navigate(`/projects/${parentProjectId}`);
      } else if (projectId) {
        await createTask({ ...form, projectId });
        navigate(`/projects/${projectId}`);
      }
    } catch {
      setError('Помилка при збереженні таска');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>
        {isEdit ? 'Редагувати таск' : 'Додати новий таск'}
      </h2>

      {error && <div className={styles.error}>{error}</div>}

      <label className={styles.field}>
        Назва
        <input
          type='text'
          name='name'
          value={form.name}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        Опис
        <input
          type='text'
          name='description'
          value={form.description}
          onChange={handleChange}
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        Статус
        <select
          name='status'
          value={form.status}
          onChange={handleChange}
          className={styles.select}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace('_', ' ')}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.actions}>
        <button type='submit' className={styles.submit}>
          {isEdit ? 'Зберегти' : 'Створити'}
        </button>
        <LinkButton
          to={isEdit ? `/tasks/${taskId}` : `/projects/${projectId}`}
          variant='secondary'
          size='small'
        >
          Скасувати
        </LinkButton>
      </div>
    </form>
  );
};

export default TaskForm;
