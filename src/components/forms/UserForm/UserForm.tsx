import React, { FormEvent,useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createUser, getUserById, updateUser } from '@/api/user';
import LinkButton from '@/components/ui/LinkButton/LinkButton';
import { Role,User } from '@/lib/types/user';

import styles from '@/styles/Form.module.css';

interface FormData {
  fullName: string;
  email: string;
  role: Role;
  password: string;
}

const ROLES: Role[] = ['ADMIN', 'MANAGER', 'USER'];

const UserForm: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const isEdit = Boolean(userId);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    role: 'USER',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit || !userId) return;
    getUserById(userId)
      .then((u: User) =>
        setForm({
          fullName: u.fullName,
          email: u.email,
          role: u.role,
          password: '',
        })
      )
      .catch(() => setError('Не вдалося завантажити користувача'));
  }, [isEdit, userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && userId) {
        const dto = {
          fullName: form.fullName,
          email: form.email,
          role: form.role,
          ...(form.password ? { password: form.password } : {}),
        };
        await updateUser(userId, dto);
      } else {
        await createUser({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          role: form.role,
        });
      }
      navigate('/users');
    } catch {
      setError('Помилка при збереженні користувача');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>
        {isEdit ? 'Редагувати виконавця' : 'Додати виконавця'}
      </h2>

      {error && <div className={styles.error}>{error}</div>}

      <label className={styles.field}>
        Повне ім’я
        <input
          className={styles.input}
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
        />
      </label>

      <label className={styles.field}>
        Email
        <input
          className={styles.input}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>

      {!isEdit && (
        <label className={styles.field}>
          Пароль
          <input
            className={styles.input}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
      )}

      <label className={styles.field}>
        Роль
        <select
          className={styles.select}
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          {isEdit ? 'Зберегти' : 'Створити'}
        </button>
        <LinkButton to="/users" variant="secondary" size="small">
          Скасувати
        </LinkButton>
      </div>
    </form>
  );
};

export default UserForm;
