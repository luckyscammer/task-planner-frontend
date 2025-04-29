import React from 'react';
import { Link } from 'react-router-dom';

import styles from '@/components/ui/LinkButton/LinkButton.module.css';

interface NavButtonProps {
  path: string;
  children: React.ReactNode;
}

const LinkButton: React.FC<NavButtonProps> = ({ path, children }) => {
  return (
    <Link to={path} className={styles.link}>
      <button className={styles.button}>
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
