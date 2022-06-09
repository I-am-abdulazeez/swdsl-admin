import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { chakra } from "@chakra-ui/system";
import { useToast } from "@chakra-ui/toast";
import { doc } from "@firebase/firestore";
import { useFirestoreDocumentDeletion } from "@react-query-firebase/firestore";
import { FormEvent, forwardRef, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";

import { firebaseFirstore } from "@lib/firebase";

type ProductDeletionParams = {
  id: string;
};

const ProductDelete = forwardRef(({ snapshot }: any, stuffRef): JSX.Element => {
  const toast = useToast();
  const navigateTo = useNavigate();
  const { id } = useParams<ProductDeletionParams>();
  const [snapText, setSnapText] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = doc(firebaseFirstore, "products", String(id));
  const mutationDocDeletion = useFirestoreDocumentDeletion(ref, {
    onSuccess() {
      navigateTo(-1);
    },
  });

  const handleDocDeletion = (e: FormEvent) => {
    e.preventDefault();
    if (snapText === snapshot?.drinkName) {
      mutationDocDeletion.mutate();
    } else {
      toast({
        status: "error",
        description:
          "Product name does not match. Did you enter the name correctly?",
        isClosable: true,
        variant: "subtle",
        duration: 5000,
      });
    }
  };
  return (
    <Box>
      <IconButton
        aria-label="delete-button"
        onClick={onOpen}
        size="sm"
        colorScheme="red"
        variant="ghost"
        icon={<RiDeleteBin2Line size="18px" />}
      />
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Delete Product{" "}
            <chakra.span color="error.700">{snapshot?.drinkName}</chakra.span>?
          </ModalHeader>
          <ModalCloseButton size="sm" />
          <form onSubmit={handleDocDeletion}>
            <ModalBody>
              <Text fontWeight="semibold">
                Are you sure? You can't undo this action afterwards.?
              </Text>
              <Text my={5} fontWeight="medium">
                Please type{" "}
                <chakra.span fontWeight="semibold" color="secondary.600">
                  {snapshot?.drinkName}{" "}
                </chakra.span>{" "}
                to confirm.
              </Text>
              <Input
                isRequired
                onChange={(e) => setSnapText(e.target.value)}
                value={snapText}
                placeholder={snapshot?.drinkName}
                type="text"
              />
            </ModalBody>
            <ModalFooter>
              <Button size="sm" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" size="sm" colorScheme="red" variant="solid">
                Delete Product
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
});

export default ProductDelete;
