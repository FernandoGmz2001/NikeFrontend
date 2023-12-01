import styles from "./Orders.module.css";
import { useState, useEffect } from "react";
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
import { toast, ToastContainer } from "react-toastify";

function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState({});
  const columns = [
    "Id de orden",
    "Id del producto",
    "Cantidad",
    "Total",
    "User Id",
    "Cancel"
  ];

  async function getOrders() {
    const response = await fetch("http://127.0.0.1:5000/orders");
    const data = await response.json();
    setOrders(data);
  }

  function handleSelectedOrder(order) {
    onOpen();
    console.log(order);
    setSelectedOrder(order);
  }

  async function handleConfirmDelete() {
    try {
      const response = await fetch(`http://localhost:5000/orders/${selectedOrder.orderId}`,{
        method: "DELETE",
      })
      const data = await response.json();
      getOrders()
      console.log(data);
      onOpenChange()
      toast('Orden eliminada exitosamente', {type: 'success'})
    } catch (err) {
      throw new Error(err);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={styles.content}>
      <header className={styles.content__header}>
        <h1>Ordenes</h1>
      </header>
      <section className={styles.content__body}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.productId}</td>
                <td>{order.quantity}</td>
                <td>{order.total}</td>
                <td>{order.userId}</td>
                <td><Button color="danger" onClick={() => handleSelectedOrder(order)}>Cancel</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Table
          aria-label="Tabla de ordenes"
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
          <TableBody items={orders}>
            {(order) => (
              <TableRow key={order.orderId}>
              <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.productId}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.userId}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table> */}
      </section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Eliminar orden
              </ModalHeader>
              <ModalBody><h1>Desea cancelar esta orden?</h1></ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleConfirmDelete}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer/>
    </div>
  );
}

export default Orders;
