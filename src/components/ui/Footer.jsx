import React from 'react'
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Footer = () => {
  return (
    <footer className={styles.footer}>
    <div className={styles.footerContainer}>
      <p className={styles.footerText}>© 2025 GameZone. All rights reserved.</p>
      <ul className={styles.footerLinks}>
        <li><Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
        <li><Link to="/terms" className={styles.footerLink}>Terms of Service</Link></li>
      </ul>
    </div>
  </footer>
  )
}

export default Footer