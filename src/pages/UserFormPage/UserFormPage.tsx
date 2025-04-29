import React from 'react';

import UserForm from '@/components/forms/UserForm/UserForm';

import styles from './UserFormPage.module.css';

const UserFormPage: React.FC = () => (
  <div className={styles.page}>
    <UserForm />
  </div>
);

export default UserFormPage;
