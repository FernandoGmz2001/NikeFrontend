import { AiOutlineUser } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import propTypes from "prop-types";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { Button, User } from "@nextui-org/react";
import { useEffect, useState } from "react";

function Navbar({ userColor, bagColor }) {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [profileImage, setProfileImage] = useState(null)

  async function getProfileImage(){
    const response = await fetch (`http://localhost:5000/users/${userData.userId}`)
    const data = await response.json()
    setProfileImage(data.avatarImage)
    console.log(data);
  }

  useEffect(()=>{
    getProfileImage()
  },[])

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
      <Link to="/">
          <li>HOME</li>
        </Link>
        <Link to="/products">
          <li>MEN</li>
        </Link>
      </ul>
      <div className={styles.navbar__userActions}>
        <div className="user__avatar">
          {location.pathname != "/login" && userData?.userUsername == "" ? (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <Link to="/profile">
              {
                userData?.userUsername == undefined ? (
                  null
                ) : (
                  <User
                    name={userData.userUsername}
                    description={userData.userEmail}
                    avatarProps={{
                      src: profileImage,
                    }}
                  />
                )
              }
            </Link>
          )}
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
