import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Navbar from "../../components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import styles from "./UserPage.module.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase.js";

function UserPage() {
  const [userInformation, setUserInformation] = useState({});
  const [email, setEmail] = useState(userInformation.email);
  const [password, setPassword] = useState(userInformation.password);
  const [username, setUsername] = useState(userInformation.username);
  const [redirect, setRedirect] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");
  const [selectedImage, setSelectedImage] = useState(null);
  const storage = getStorage();

  function closeSession() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setRedirect(true);
  }

  async function getActualUser() {
    console.log(userData.userId);
    const response = await fetch(
      `http://localhost:5000/users/${userData.userId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    setUserInformation(data[0]);
    setEmail(data[0].email);
    setPassword(data[0].password);
    setUsername(data[0].username);
  }

  useEffect(() => {
    getActualUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/users/${userData.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            username: username,
          }),
        }
      );
      const data = await response.json();
      toast("Datos actualizados correctamente", { type: "success" });
      console.log(data);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userEmail: email,
          userUsername: username,
          userId: userData.userId,
        })
      );
      getActualUser();
    } catch (err) {
      toast("Error al actualizar los datos", { type: "error" });
    }
  };
  const updateUserImage = async (image) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users/${userData.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatarImage: image }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + img.name);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle the upload progress
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setSelectedImage(downloadURL);
            updateUserImage(downloadURL);
            toast("Imagen actualizada correctamente", { type: "success" });
          });
        }
      );
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="">
      <Navbar />
      <div className="wrapper">
        <div className={styles.profile__card}>
          <header></header>
          <div className={styles.avatar__container}>
            <picture className={styles.avatar__picture}>
              <img
                src={
                  selectedImage ? selectedImage : userInformation.avatarImage
                }
                alt="picture"
                className={styles.avatar__image}
              />
              <div className={styles.change__picture}>
                <label htmlFor="fileInput" className={styles.customFileUpload}>
                  Change picture
                </label>
                <input id="fileInput" className={styles.file__input} type="file" onChange={handleImageChange} />
              </div>
            </picture>
            <div className={styles.avatar__text}>
              <h1>Settings</h1>
              <h2>{userData?.userEmail}</h2>
            </div>
            {token && (
              <Link to={"/dashboard"}>
                <Button color="primary">Dashboard</Button>
              </Link>
            )}
            <Button onClick={closeSession} color="danger">
              Close session
            </Button>
          </div>
          <div className={styles.profile__configuration}>
            <form onSubmit={handleUpdate} className={styles.form}>
              <div className={styles.form__group}>
                <Input
                  size="sm"
                  type="email"
                  value={email}
                  label="Email"
                  labelPlacement="outside"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.form__group}>
                <Input
                  size="sm"
                  type="password"
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Change your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.form__group}>
                <Input
                  size="sm"
                  type="text"
                  label="Username"
                  labelPlacement="outside"
                  placeholder="Change your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <Button color="primary" onClick={handleUpdate}>
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserPage;
