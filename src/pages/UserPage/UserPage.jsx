import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Navbar from "../../components/Navbar/Navbar";
import { ToastContainer,toast } from "react-toastify";
import styles from "./UserPage.module.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase.js'

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

    console.log(data[0].user.username);

    setUserInformation(data[0].user);
    setEmail(data[0].user.email);
    setPassword(data[0].user.password);
    setUsername(data[0].user.username);
  }

  useEffect(() => {
    getActualUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
      });
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
    }
  };

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
      localStorage.setItem("userData", JSON.stringify({
        userEmail: email,
        userUsername: username,
        userId: userData.userId,
      }));
      getActualUser();
    } catch (err) {
      toast("Error al actualizar los datos", { type: "error" });
  const updateUserImage = async (image) => {
    try{
      const response = await fetch(`http://localhost:5000/users/${userData.userId}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({avatarImage: image})
      })
      const data = await response.json()
      console.log(data);
    }catch(err){
      throw new Error(err)
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + img.name);
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle the upload progress
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setSelectedImage(downloadURL);
            updateUserImage(selectedImage)
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
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                alt="picture"
                className={styles.avatar__image}
              />
              <div className={styles.change__picture}>
                <button className={styles.btnChangePicture}>Cambiar foto</button>
              </div>

            </picture>
            <div className={styles.avatar__text}>
              <h1>Settings</h1>
              <h2>{userData?.userEmail}</h2>
            </div>
            {
          token && (
            <Link to={"/dashboard"}>
              <Button color="primary">Dashboard</Button>
            </Link>
          )
        }
      </div>
      <ToastContainer />
      </div>
    </div>
    </div>
  );
}

export default UserPage;
