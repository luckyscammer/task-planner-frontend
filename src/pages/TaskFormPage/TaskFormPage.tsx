import React from 'react';
import { Navigate,useParams } from 'react-router-dom';

import TaskForm from '@/components/forms/TaskForm/TaskForm';

import styles from './TaskFormPage.module.css';

const TaskFormPage: React.FC = () => {
  const { projectId, taskId } = useParams<{ projectId?: string; taskId?: string }>();

  if (!taskId && !projectId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.page}>
      <TaskForm />
    </div>
  );
};

export default TaskFormPage;
