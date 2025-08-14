import React from "react";
// import AppNav from "../Components/AppNav";
import Sidebar from "../Components/Sidebar";
import styles from "./AppLayout.module.css"; // Assuming you have a CSS module for styles
import Map from "../Components/Map";
import User from "../Components/User";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
