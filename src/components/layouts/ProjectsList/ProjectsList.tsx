import React from 'react';

import ProjectCard from '@/components/cards/ProjectCard/ProjectCard.tsx';
import { Project } from '@/lib/types/project.ts';

import styles from '@/styles/List.module.css';

interface ProjectsListProps {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  return (
    <div className={styles.page}>
      <h1>Проекти</h1>

      {projects.length === 0 ? (
        <p>Проектів поки немає. Створіть перший проект!</p>
      ) : (
        <div className={styles.container}>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;