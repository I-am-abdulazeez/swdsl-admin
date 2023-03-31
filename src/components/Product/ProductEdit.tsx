import { forwardRef, useState } from 'react';
import { Box } from '@chakra-ui/layout';
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
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';

import { RiPencilLine } from 'react-icons/ri';
import { useParams } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormDetails from '@components/FormDetails';

import { useProductStore } from '@store/useProductStore';

import { uploadImage } from '@utils/index';
import { UploadFormState } from '@interfaces/index';
import { ProductParams, ProductType } from 'src/types';

const ProductEdit = forwardRef(({ product }: ProductType, ref) => {
  const { id } = useParams<ProductParams>();
  const { register, handleSubmit } = useForm<UploadFormState>();

  const [file, setFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const editProduct = useProductStore((state) => state.editProduct);
  const isLoading = useProductStore((state) => state.isLoading);

  const handleProductImageUpload = () => {
    uploadImage({
      file,
      progress,
      setProgress,
      setUploadLoading,
      setUrl,
    });
  };

  const handleProductUpdate: SubmitHandler<UploadFormState> = (data) => {
    const newUpdate = {
      drinkName: data.drinkName || product?.drinkName,
      description: data.description || product?.description,
      category: data.category || product?.category,
      url: url || product?.url,
      price: Number(data.price) || Number(product?.price),
    };

    editProduct(id, newUpdate, onClose, setFile);
  };

  return (
    <Box>
      <IconButton
        aria-label="edit-button"
        size="sm"
        colorScheme="secondary"
        variant="ghost"
        onClick={onOpen}
        icon={<RiPencilLine size="18px" />}
      />
      <Modal
        isCentered
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
      >
        <ModalOverlay backdropFilter={'blur(5px)'} />
        <ModalContent>
          <ModalHeader>
            Edit Product{' '}
            <chakra.span color="success.700">{product?.drinkName}</chakra.span>?
          </ModalHeader>
          <ModalCloseButton size="sm" />
          <form onSubmit={handleSubmit(handleProductUpdate)}>
            <ModalBody>
              <FormDetails
                register={register}
                file={file}
                progress={progress}
                setFile={setFile}
                setProgress={setProgress}
                showValue={true}
                isRequired={false}
                product={product}
              />
            </ModalBody>
            <ModalFooter>
              <ButtonGroup mt={4} spacing={2}>
                <Button
                  isLoading={uploadLoading}
                  onClick={handleProductImageUpload}
                  isDisabled={!file || progress === 100}
                  size="sm"
                >
                  Upload Image
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  variant="solid"
                  isLoading={isLoading}
                  colorScheme="success"
                >
                  Update Product
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
});

export default ProductEdit;
