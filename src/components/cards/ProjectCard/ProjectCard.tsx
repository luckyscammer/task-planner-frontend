import React from 'react';
import { Link } from 'react-router-dom';

import { Project } from '@/lib/types/project';

import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const progress = project.progress ?? 0;

  return (
    <Link to={`/projects/${project.id}`} className={styles.card}>
      <h3 className={styles.title}>{project.name}</h3>
      {project.description && <p className={styles.desc}>{project.description}</p>}

      <div className={styles.progressBlock}>
        <span className={styles.progressLabel}>Прогрес:</span>
        <div className={styles.progressWrapper}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={styles.progressValue}>{progress}%</span>
      </div>
    </Link>
  );
};

export default ProjectCard;