/**
 * Footer Component
 * 
 * This component represents the footer section of the hotel website.
 * It displays the footer header with information about the hotel management system.
 * 
 */

import React from 'react';
import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.footer__header}>
        Ducks Nest | Hotel Management System | 2023
      </h1>
    </div>
  );
};
export default Footer;
