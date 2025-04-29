import React from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '@/lib/types/user';

import styles from './UserCard.module.css';

export interface UserWithCount extends User {
  taskCount: number;
}

interface UserCardProps {
  user: UserWithCount;
  taskCount: number;
  onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, taskCount, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{user.fullName}</h3>
      <p className={styles.email}>{user.email}</p>
      <p className={styles.role}>{user.role}</p>
      <p className={styles.workload}>Завдань: {taskCount}</p>

      <div className={styles.actions}>
        <button
          className={styles.edit}
          onClick={() => navigate(`/users/${user.id}`)}
        >
          Редагувати
        </button>
        <button
          className={styles.delete}
          onClick={() => {
            if (
              window.confirm(`Видалити користувача ${user.fullName}?`)
            ) {
              onDelete(user.id);
            }
          }}
        >
          Видалити
        </button>
      </div>
    </div>
  );
};

export default UserCard;
