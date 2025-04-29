import React from 'react';

import LinkButton from "@/components/ui/LinkButton/LinkButton.tsx";

import classes from './NavBar.module.css';

const NavBar: React.FC = () => (
  <nav className={classes.navbar}>
    <LinkButton path="/">На головну</LinkButton>
  </nav>
);

export default NavBar;
