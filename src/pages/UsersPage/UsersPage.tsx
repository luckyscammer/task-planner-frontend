import React, { useEffect, useState } from 'react';

import { deleteUser, getAllUsers } from '@/api/user';
import UsersList from '@/components/layout/UsersList/UsersList';
import LinkButton from '@/components/ui/LinkButton/LinkButton';
import { User } from '@/lib/types/user';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = () => {
    setLoading(true);
    getAllUsers()
      .then(setUsers)
      .catch(() => setError('Не вдалося завантажити користувачів'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchUsers, []);

  const handleDelete = (userId: string) => {
    deleteUser(userId)
      .then(fetchUsers)
      .catch(() => alert('Не вдалося видалити користувача'));
  };

  if (loading) return <div>Завантаження користувачів…</div>;
  if (error) return <div className='error'>{error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <LinkButton to='/users/new'>+ Додати виконавця</LinkButton>
      </div>
      <UsersList users={users} onDelete={handleDelete} />
    </div>
  );
};

export default UsersPage;
