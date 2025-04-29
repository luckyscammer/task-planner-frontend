import React, { useCallback, useEffect, useState } from 'react';

import {deleteUser, getAllUsers} from '@/api/user';
import { getTasksOfUser } from '@/api/user';
import UsersList from '@/components/layout/UsersList/UsersList';
import LinkButton from '@/components/ui/LinkButton/LinkButton.tsx';
import { User } from '@/lib/types/user';

interface UserWithCount extends User {
  taskCount: number;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const base = await getAllUsers();
      const withCounts = await Promise.all(
        base.map(async (u) => {
          const tasks = await getTasksOfUser(u.id);
          return { ...u, taskCount: tasks.length };
        }),
      );
      setUsers(withCounts);
    } catch {
      setError('Не вдалося завантажити користувачів');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цього користувача?')) {
      return;
    }
    try {
      await deleteUser(userId);
      await fetchUsers();
    } catch {
      alert('Не вдалося видалити користувача');
    }
  };

  if (loading) return <div>Завантаження користувачів…</div>;
  if (error) return <div className='error'>{error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <LinkButton to='/users/new'>+ Додати виконавця</LinkButton>
      </div>
      <UsersList
        users={users}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UsersPage;
