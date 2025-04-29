import React from 'react';

import ProjectCard from '@/components/cards/ProjectCard/ProjectCard';
import { Project } from '@/lib/types/project';

import styles from '@/styles/List.module.css';

interface ProjectsListProps {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  return (
    <div style={{ padding: 16 }}>
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