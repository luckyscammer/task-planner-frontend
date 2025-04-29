import React from 'react';
import { Link } from 'react-router-dom';

import { Task } from '@/lib/types/task';

import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const isOverdue = task.deadline
    ? new Date(task.deadline) < new Date()
    : false;

  return (
    <Link to={`/tasks/${task.id}`} className={styles.card}>
      <h4 className={styles.title}>{task.name}</h4>
      {task.description && <p className={styles.desc}>{task.description}</p>}

      <span className={`${styles.status} ${styles[task.status.toLowerCase()]}`}>
        {task.status.replace('_', ' ')}
      </span>

      <div className={styles.progressBlock}>
        <span className={styles.progressLabel}>Прогрес:</span>
        <div className={styles.progressWrapper}>
          <div
            className={styles.progressFill}
            style={{ width: `${task.progress}%` }}
          />
        </div>
        <span className={styles.progressValue}>{task.progress}%</span>
      </div>

      {task.deadline && (
        <p className={isOverdue ? styles.deadlineOver : styles.deadline}>
          Дедлайн: {new Date(task.deadline).toLocaleDateString()}
        </p>
      )}
    </Link>
  );
};

export default TaskCard;
