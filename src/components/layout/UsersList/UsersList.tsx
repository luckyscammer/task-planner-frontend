import React from 'react';

import UserCard from '@/components/cards/UserCard/UserCard';
import { User } from '@/lib/types/user';

import styles from '@/styles/List.module.css';

export interface UserWithCount extends User {
  taskCount: number;
}

interface UsersListProps {
  users: UserWithCount[];
  onDelete: (userId: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, onDelete }) => (
  <div>
    <h1>Користувачі</h1>

    {users.length === 0 ? (
      <p>Жодного виконавця не додано.</p>
    ) : (
      <div className={styles.container}>
        {users.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            taskCount={u.taskCount}
            onDelete={onDelete}
          />
        ))}
      </div>
    )}
  </div>
);

export default UsersList;