import cn from 'classnames';
import React from 'react';

import styles from './StatusMessage.module.css';

export interface StatusMessageProps {
  variant?: 'loading' | 'error' | 'empty';
  children: React.ReactNode;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
  variant = 'loading',
  children,
}) => {
  return <div className={cn(styles.message, styles[variant])}>{children}</div>;
};

export default StatusMessage;
