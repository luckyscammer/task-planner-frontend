import React, { FormEvent,useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createUser, getUserById, updateUser } from '@/api/user.ts';
import { CreateUserDto, UpdateUserDto, User } from '@/lib/types/user.ts';

import styles from '@/components/layout/UserForm/UserForm.module.css';

const UserForm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const isEdit = Boolean(userId);
  const navigate = useNavigate();

  const [data, setData] = useState<CreateUserDto | UpdateUserDto>({
    fullName: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      getUserById(userId!)
        .then((user: User) => {
          setData({
            fullName: user.fullName,
            email: user.email,
            role: user.role,
          });
        })
        .catch(() => setError('Не вдалося завантажити дані користувача'));
    }
  }, [isEdit, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateUser(userId!, data as UpdateUserDto);
      } else {
        await createUser(data as CreateUserDto);
      }
      navigate('/users');
    } catch {
      setError('Помилка при збереженні');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Редагувати користувача' : 'Додати користувача'}</h2>

      {error && <p className={styles.error}>{error}</p>}

      <label>
        Full Name
        <input
          type="text"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>

      {!isEdit && (
        <label>
          Password
          <input
            type="password"
            name="password"
            value={(data as CreateUserDto).password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </label>
      )}

      <label>
        Role
        <select name="role" value={data.role} onChange={handleChange}>
          <option value="USER">USER</option>
          <option value="MANAGER">MANAGER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </label>

      <div>
        <button type="submit">{isEdit ? 'Зберегти' : 'Створити'}</button>
        <button type="button" onClick={() => navigate(-1)}>Скасувати</button>
      </div>
    </form>
  );
};

export default UserForm;
