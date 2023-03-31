import { FormEvent, forwardRef, useState } from 'react';
import { Button, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { chakra } from '@chakra-ui/system';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useParams } from 'react-router';

import { useProductStore } from '@store/useProductStore';
import { customToast } from '@utils/index';
import { ProductParams, ProductType } from 'src/types';

const ProductDelete = forwardRef(({ product }: ProductType, ref) => {
  const { id } = useParams<ProductParams>();
  const [snapText, setSnapText] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const isLoading = useProductStore((state) => state.isLoading);

  const handleDocDeletion = (e: FormEvent) => {
    e.preventDefault();
    if (snapText === product?.drinkName) {
      deleteProduct(id, onClose);
    } else {
      customToast({
        status: 'error',
        title: 'Product name does not match.',
        description: 'Did you enter the name correctly?',
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
        icon={<RiDeleteBin6Line size="18px" />}
      />
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
      >
        <ModalOverlay backdropFilter={'blur(5px)'} />
        <ModalContent>
          <ModalHeader>
            Delete Product{' '}
            <chakra.span color="error.700">{product?.drinkName}</chakra.span>?
          </ModalHeader>
          <ModalCloseButton size="sm" />
          <form onSubmit={handleDocDeletion}>
            <ModalBody>
              <Text fontWeight="semibold">
                Are you sure? You can't undo this action afterwards.?
              </Text>
              <Text my={5} fontWeight="medium">
                Please type{' '}
                <chakra.span fontWeight="semibold" color="secondary.600">
                  {product?.drinkName}{' '}
                </chakra.span>{' '}
                to confirm.
              </Text>
              <Input
                isRequired
                onChange={(e) => setSnapText(e.target.value)}
                value={snapText}
                placeholder={product?.drinkName}
                type="text"
              />
            </ModalBody>
            <ModalFooter>
              <Button size="sm" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                size="sm"
                colorScheme="red"
                variant="solid"
                isLoading={isLoading}
              >
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
