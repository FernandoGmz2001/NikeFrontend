import { AiOutlineUser } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import propTypes from "prop-types";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/react";

function Navbar({ userColor, bagColor }) {
  const location = useLocation();
  const username = localStorage.getItem("username");

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img
          src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Nike-1.png"
          width={70}
          height={30}
          alt="nike__logo"
          className="logo"
        />
      </Link>
      <ul className={styles.navbar__menu}>
        <Link to="/products">
          <li>HOMBRES</li>
        </Link>
      </ul>
      <div className={styles.navbar__userActions}>
        <div className="user__avatar">
          {location.pathname != "/login" && username == "" ? (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <Link to="/profile">
              <AiOutlineUser size={"20px"} color={userColor} />
            </Link>
          )}
        </div>
        <div className="user__bag">
          <BsHandbag size={"20px"} color={bagColor} />
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  userColor: propTypes.string,
  bagColor: propTypes.string,
};

export default Navbar;
