import { CiSearch } from "react-icons/ci";
import { MdAddToPhotos } from "react-icons/md";
import { Input } from "@nextui-org/react";
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
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__search}>
        <Input
          placeholder="Search"
          labelPlacement="outside"
          startContent={<CiSearch />}
        />
        <MdAddToPhotos onClick={onOpen} className="cursor-pointer w-[40px]" />
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
                  <Input size="sm" label="Nombre del producto" />
                  <Input
                    size="sm"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
export default Toolbar;
