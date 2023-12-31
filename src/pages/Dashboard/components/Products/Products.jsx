import styles from "./Products.module.css";
import { useEffect, useState, useMemo } from "react";
import { Input } from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Pagination,
} from "@nextui-org/react";
import { FiDelete, FiEdit } from "react-icons/fi";

function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();

  async function getProducts() {
    const response = await fetch("http://127.0.0.1:5000/products");
    const data = await response.json();
    setIsLoading(false);
    setProducts(data[0].productos);
  }
  useEffect(() => {
    getProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  function handleSelectedProduct(product) {
    onOpen();
    setSelectedProduct(product);
  }

  function handleDeleteProduct(product) {
    onOpenModal2();
    setSelectedProduct(product);
  }

  async function handleConfirm() {
    try {
      await fetch(
        `http://127.0.0.1:5000/products/${selectedProduct.productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedProduct),
        }
      );
      toast("Producto editado correctamente", { type: "success" });
      getProducts();
      onOpenChange();
    } catch (err) {
      throw new Error(err);
    }
  }

  async function handleConfirmDelete() {
    try {
      await fetch(
        `http://127.0.0.1:5000/products/${selectedProduct.productId}`,
        {
          method: "DELETE",
        }
      );
      toast("Producto eliminado correctamente", { type: "success" });
      getProducts();
      onCloseModal2();
    } catch (err) {
      throw new Error(err);
    }
  }
  return (
    <div className={styles.products}>
      <header className={styles.products__header}>
        <h1>Productos</h1>
        <Input
          type="text"
          value={searchTerm}
          size="sm"
          onChange={handleSearchChange}
          placeholder="Search"
        />
      </header>

      <section className={styles.products__body}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Genero</th>
              <th>Descripcion</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>{product.productGender}</td>
                <td>{product.productDescription}</td>
                <td className="">
                  {/* <FiEdit
                    onClick={() => handleSelectedProduct(product)}
                    className="cursor-pointer"
                    color="green"
                    size={18}
                  /> */}
                  <Button
                    color="success"
                    className="text-white"
                    onClick={() => handleSelectedProduct(product)}
                  >
                    Editar
                  </Button>
                </td>
                <td className="">
                  <Button
                    color="danger"
                    onClick={() => handleDeleteProduct(product)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar producto
              </ModalHeader>
              <ModalBody>
                <form action="">
                  <Input
                    size="sm"
                    label="Nombre del producto"
                    name="productName"
                    value={selectedProduct.productName || ""}
                    onChange={handleInputChange}
                  />
                  <Input
                    size="sm"
                    label="Descripcion del producto"
                    name="productDescription"
                    value={selectedProduct.productDescription || ""}
                    onChange={handleInputChange}
                  />
                  <Input
                    size="sm"
                    label="Imagen"
                    name="productImage"
                    value={selectedProduct.productImage || ""}
                    onChange={handleInputChange}
                  />
                  <Input
                    size="sm"
                    label="Precio"
                    name="productPrice"
                    value={selectedProduct.productPrice || ""}
                    onChange={handleInputChange}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenModal2} onClose={onCloseModal2}>
        <ModalContent>
          <ModalHeader>Eliminar producto</ModalHeader>
          <ModalBody>Esta seguro de que desea eliminar el producto?</ModalBody>
          <ModalFooter>
            <Button color="danger" mr={3} onClick={onCloseModal2}>
              Close
            </Button>
            <Button color="primary" onPress={handleConfirmDelete}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Products;
