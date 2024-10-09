import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

import clsx from "clsx";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.activeLink);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navigation}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </div>
    </div>
  );
};
export default Navigation;
