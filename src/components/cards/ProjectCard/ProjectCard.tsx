import React from 'react';
import { Link } from 'react-router-dom';

export interface Project {
  id: string;
  name: string;
  description?: string;
  progress?: number;
}

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`}>
      <div>
        <h3>{project.name}</h3>
        {project.description && <p>{project.description}</p>}
        <div>
          <label>Progress:</label>
          <progress value={project.progress ?? 0} max={100}></progress>
          <span>{project.progress ?? 0}%</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
