import React from "react";
import styles from "./Sidebar.module.css"; // Assuming you have a CSS module for styles
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy {new Date().getFullYear()}
          WorldWise. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
