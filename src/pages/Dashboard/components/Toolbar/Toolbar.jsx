import { CiSearch } from "react-icons/ci";
import { MdAddToPhotos } from "react-icons/md";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
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
      await fetch(
        `http://127.0.0.1:5000/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("Se ha enviado exitosamente");
      onOpenChange();
    } catch (err) {
      throw new Error(err);
    }
  }

  async function generateFile(){
    try {
      const response = await fetch('http://127.0.0.1:5000/products/export',{
        method: "GET",
      })
      const data = await response.json()
      // toast("Excel generado correctamente", { type: "success" });
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__search}>
        <Input
          placeholder="Search"
          labelPlacement="outside"
          startContent={<CiSearch />}
        />
        <div className="flex gap-2">
          <MdAddToPhotos onClick={onOpen} className="cursor-pointer w-[40px]" />
          <FaRegFileExcel onClick={generateFile} className="cursor-pointer w-[40px]"/>
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
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger"  onPress={onClose}>
                  Cerrar
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
