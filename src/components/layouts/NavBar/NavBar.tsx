import React from 'react';

import LinkButton from '@/components/ui/LinkButton/LinkButton.tsx';

import styles from './NavBar.module.css';

const NavBar: React.FC = () => (
  <nav className={styles.navbar}>
    <div className={styles.container}>
      <div className={styles.links}>
        <LinkButton to="/">На головну</LinkButton>
        <LinkButton to="/users">Користувачі</LinkButton>
      </div>
      <div className={styles.brand}>PLIFFDAX</div>
    </div>
  </nav>
);

export default NavBar;
