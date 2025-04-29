import React from 'react';

import TaskCard from '@/components/cards/TaskCard/TaskCard';
import { Task } from '@/lib/types/task';

import classes from './ProjectTasksList.module.css';

interface ProjectTasksListProps {
  tasks: Task[];
}

const ProjectTasksList: React.FC<ProjectTasksListProps> = ({ tasks }) => {
  return (
    <div>
      <h2>Таски</h2>

      {tasks.length === 0 ? (
        <p>Тасків поки немає.</p>
      ) : (
        <div className={classes.container}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectTasksList;
