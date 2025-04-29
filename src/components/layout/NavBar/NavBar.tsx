import React from 'react';

import LinkButton from '@/components/ui/LinkButton/LinkButton';

import styles from './NavBar.module.css';

const NavBar: React.FC = () => (
  <nav className={styles.navbar}>
    <div className={styles.container}>
      <LinkButton to="/">На головну</LinkButton>
      <LinkButton to="/users">Користувачі</LinkButton>
    </div>
  </nav>
);

export default NavBar;
