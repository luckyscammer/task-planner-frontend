import React from 'react';

import UserCard from '@/components/cards/UserCard/UserCard.tsx';
import { User } from '@/lib/types/user.ts';

import styles from '@/styles/List.module.css';

interface UsersListProps {
  users: User[];
  onDelete: (userId: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, onDelete }) => (
  <div>
    <h1>Користувачі</h1>

    {users.length === 0 ? (
      <p>Жодного виконавця не додано.</p>
    ) : (
      <div className={styles.container}>
        {users.map(u => (
          <UserCard key={u.id} user={u} onDelete={onDelete} />
        ))}
      </div>
    )}
  </div>
);

export default UsersList;