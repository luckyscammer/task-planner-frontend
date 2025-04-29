import React from 'react';
import { Link } from 'react-router-dom';

import { Task } from '@/lib/types/task';

import classes from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Link to={`/tasks/${task.id}`} className={classes.card}>
      <h4 className={classes.title}>{task.name}</h4>
      {task.description && <p className={classes.desc}>{task.description}</p>}
      <div className={classes.meta}>
        <span>Статус: {task.status}</span>
        <span>Прогрес: {task.progress}%</span>
        {task.deadline && (
          <span>Дедлайн: {new Date(task.deadline).toLocaleDateString()}</span>
        )}
      </div>
    </Link>
  );
};

export default TaskCard;
