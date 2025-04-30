import React from 'react';

import UserCard from '@/components/cards/UserCard/UserCard.tsx';
import { User } from '@/lib/types/user.ts';

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