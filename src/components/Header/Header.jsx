import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

import clsx from "clsx";

const Header = () => {
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
export default Header;
