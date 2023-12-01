import { CiSearch } from "react-icons/ci";
import { MdAddToPhotos } from "react-icons/md";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaRegFileExcel } from "react-icons/fa";
import styles from "./Toolbar.module.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function Toolbar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);


  const [formData, setFormData] = useState({
    productDescription: "",
    productImage: "",
    productName: "",
    productPrice: "",
    productGender: "Men"
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handleConfirm() {
    try {
      await fetch(`http://127.0.0.1:5000/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Se ha enviado exitosamente");
      onOpenChange();
      toast("Producto creado exitosamente", { type: "success" })
    } catch (err) {
      throw new Error(err);
    }
  }

  async function generateFile() {
    try {
      const response = await fetch("http://127.0.0.1:5000/products/export", {
        method: "GET",
      });
      const data = await response.json();
      toast("Excel generado correctamente", { type: "success" });
    } catch (error) {
      throw new Error(error);
    }
  }

  const handleFileChange = (event) => {
    try {
      setSelectedFile(event.target.files[0]);
      toast("Archivo seleccionado correctamente", { type: "success" });
    } catch (error) {
      throw new Error(error);
    }

  };


  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://127.0.0.1:5000/products/import', {
        method: 'POST',
        body: formData,
      });

      console.log(await response)
      if (response.ok) {
        toast('Archivo importado exitosamente', { type: 'success' });
        
      } else {
        const errorData = await response.json();
        toast(errorData.error, { type: 'error' });
      }
    } catch (error) {
      console.error(error);
      toast('Error al importar el archivo', { type: 'error' });
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__search}>
        <div className="flex gap-2">
          <Button color="primary" onClick={onOpen}>Agregar producto</Button>
          <Button color="success" className="text-white" onClick={generateFile}>Generar excel</Button>
          <div className={styles.customFile}>
            <input
              type="file"
              className={styles.customFileInput}
              id="fileInput"
              onChange={handleFileChange}
            />
            <label className={styles.customFileLabel} htmlFor="fileInput">
              Subir archivo Excel
            </label>
          </div>
          <Button color="success" className="text-white" onClick={handleFileUpload}>
            Generar producto
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar producto
              </ModalHeader>
              <ModalBody>
                <form action="" className={styles.product__form}>
                  <Input
                    label="Nombre del producto"
                    name="productName"
                    placeholder="Ingrese el nombre del producto"
                    value={formData.productName}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Precio del producto"
                    name="productPrice"
                    placeholder="Ingrese el precio del producto"
                    value={formData.productPrice}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Descripción del producto"
                    name="productDescription"
                    placeholder="Ingrese la descripción del producto"
                    value={formData.productDescription}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Imagen del producto"
                    name="productImage"
                    placeholder="Ingrese la URL de la imagen del producto"
                    value={formData.productImage}
                    onChange={handleInputChange}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
    </div>
  );
}
export default Toolbar;
