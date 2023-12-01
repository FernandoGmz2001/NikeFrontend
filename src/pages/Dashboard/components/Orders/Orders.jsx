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

function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const columns = [
    "Id de orden",
    "Id del producto",
    "Cantidad",
    "Total",
    "User Id",
  ];

  async function getOrders() {
    const response = await fetch("http://127.0.0.1:5000/orders");
    const data = await response.json();
    setOrders(data);
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
        <Table
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
        </Table>
      </section>
    </div>
  );
}

export default Orders;
