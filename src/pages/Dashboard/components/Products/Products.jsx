import styles from "./Products.module.css";
import { useEffect, useState, useMemo } from "react";
import { Input } from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";
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
    console.log(data[0].productos);
  }
  useEffect(() => {
    getProducts();
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const columns = [
    "Nombre",
    "Precio",
    // "Cantidad",
    "Genero",
    "Descripcion",
    "Imagen",
    "Acciones",
  ];

  function handleSelectedProduct(product) {
    onOpen();
    setSelectedProduct(product);
  }

  function handleDeleteProduct(product) {
    onOpenModal2()
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
      console.log("Se ha enviado exitosamente");
      getProducts()
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
      console.log("Se ha enviado exitosamente");
      getProducts()
      onCloseModal2();
    } catch (err) {
      throw new Error(err);
    }
  }
  return (
    <div className={styles.products}>
      <header className={styles.products__header}>
        <h1>Productos</h1>
      </header>
      <section className={styles.products__body}>
        <Table
          aria-label="Example table with client side pagination"
          isHeaderSticky
          classNames={{
            wrapper: "h-[500px]",
          }}
        >
          <TableHeader>
            {columns.map((column, index) => (
              <TableColumn key={index}>{column}</TableColumn>
            ))}
          </TableHeader>
          <TableBody items={products}>
            {(product) => (
              <TableRow key={product.productId}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productPrice}</TableCell>
                <TableCell>{product.productGender}</TableCell>
                <TableCell>{product.productDescription}</TableCell>
                <TableCell>{product.productImage}</TableCell>
                <TableCell className="flex gap-6">
                  <FiEdit
                    onClick={() => handleSelectedProduct(product)}
                    className="cursor-pointer"
                  />
                  <MdDeleteOutline
                    onClick={() => handleDeleteProduct(product)}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
                  Cerrar
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                  Confirmar
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
              Cerrar
            </Button>
            <Button color="primary"  onPress={handleConfirmDelete}>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Products;
