import React from 'react';
import { Link } from 'react-router-dom';

import classes from '@/components/ui/LinkButton/LinkButton.module.css';

interface NavButtonProps {
  path: string;
  children: React.ReactNode;
}

const LinkButton: React.FC<NavButtonProps> = ({ path, children }) => {
  return (
    <Link to={path} className={classes.link}>
      <button className={classes.button}>
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
