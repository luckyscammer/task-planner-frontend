import React, { useCallback, useEffect, useState } from 'react';

import { getTasksOfUser } from '@/api/taskAssignment';
import { getAllUsers, searchUsers } from '@/api/user';
import UsersList, { UserWithCount } from '@/components/layouts/UsersList/UsersList';
import LinkButton from '@/components/ui/LinkButton/LinkButton';
import StatusMessage from '@/components/ui/StatusMessage/StatusMessage';

import styles from './UsersPage.module.css';

const UsersPage: React.FC = () => {
  const [users, setUsers]     = useState<UserWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [search, setSearch]   = useState('');

  const fetchUsers = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const base = q.trim() ? await searchUsers(q.trim()) : await getAllUsers();
      const withCount = await Promise.all(
        base.map(async (u) => {
          const tasks = await getTasksOfUser(u.id);
          return { ...u, taskCount: tasks.length };
        })
      );
      setUsers(withCount);
      setError(null);
    } catch {
      setError('Не вдалося завантажити користувачів');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(search), 300);
    return () => clearTimeout(timer);
  }, [search, fetchUsers]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Користувачі</h1>
        <LinkButton to="/users/new" variant="primary" size="medium">
          + Додати виконавця
        </LinkButton>
      </div>

      <input
        type="text"
        placeholder="Пошук за іменем або email…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {loading && <StatusMessage variant="loading">Завантаження…</StatusMessage>}
      {error   && <StatusMessage variant="error">{error}</StatusMessage>}

      {!loading && !error && (
        <UsersList users={users} onDelete={() => fetchUsers(search)} />
      )}
    </div>
  );
};

export default UsersPage;
