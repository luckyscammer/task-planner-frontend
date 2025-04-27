import React from "react";

import ProjectCard from '@/components/cards/ProjectCard/ProjectCard';
import { Project } from '@/lib/types/project';

interface ProjectsListProps {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  return (
    <div>
      <h1>Projects</h1>

      {projects.length === 0 ? (
        <p>Проектів поки немає. Створіть перший проект!</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
