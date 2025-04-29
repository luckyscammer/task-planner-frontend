import cn from 'classnames';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import styles from './LinkButton.module.css';

export interface LinkButtonProps extends LinkProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  ...linkProps
}) => {
  const cls = cn(
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
  );

  return (
    <Link to={to} className={cls} {...linkProps}>
      {children}
    </Link>
  );
};

export default LinkButton;
