import React from 'react';

import LinkButton from '@/components/ui/LinkButton/LinkButton';

import styles from './NavBar.module.css';

const NavBar: React.FC = () => (
  <nav className={styles.navbar}>
    <div className={styles.container}>
      <LinkButton path="/">На головну</LinkButton>
      <LinkButton path="/users">Користувачі</LinkButton>
    </div>
  </nav>
);

export default NavBar;
