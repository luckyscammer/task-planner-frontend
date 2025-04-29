import React from 'react';

import TaskCard from '@/components/cards/TaskCard/TaskCard.tsx';
import { Task } from '@/lib/types/task.ts';

import styles from '@/styles/List.module.css';

interface ProjectTasksListProps {
  tasks: Task[];
}

const ProjectTasksList: React.FC<ProjectTasksListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>Тасків поки немає.</p>
      ) : (
        <div className={styles.container}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectTasksList;
