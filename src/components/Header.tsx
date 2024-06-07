import React from 'react';
import styles from '../styles/components/Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>MKS Sistemas</div>
      <div className={styles.cart}>
      </div>
    </header>
  );
};

export default Header;
