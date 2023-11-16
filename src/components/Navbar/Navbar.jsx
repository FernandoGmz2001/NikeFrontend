import { AiOutlineUser } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import propTypes from "prop-types";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
function Navbar({ userColor, bagColor }) {
  return (
    <nav className={styles.navbar}>
      <Link to='/home'>
        <img
          src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Nike-1.png"
          width={70}
          height={30}
          alt="nike__logo"
          className="logo"
        />
      </Link>
      <ul className={styles.navbar__menu}>
        <li>HOMBRES</li>
      </ul>
      <div className={styles.navbar__userActions}>
        <div className="user__avatar">
          <AiOutlineUser size={"20px"} color={userColor} />
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
