import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
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

import { forwardRef, useState } from 'react';
import { RiPencilLine } from 'react-icons/ri';
import { useParams } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormDetails from '@components/FormDetails';

import { useAuthStore } from '@store/useAuthStore';
import { useProductStore } from '@store/useProductStore';

import { uploadImage } from '@utils/index';
import { UploadFormState } from '@interfaces/index';
import { ProductEditParams, ProductType } from 'src/types';

const ProductEdit = forwardRef(
  ({ product }: ProductType, StuffRef): JSX.Element => {
    const { userId } = useAuthStore();
    const { id } = useParams<ProductEditParams>();
    const { register, handleSubmit } = useForm<UploadFormState>();

    const [file, setFile] = useState<File | null>(null);
    const [uploadLoading, setUploadLoading] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [progress, setProgress] = useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isLoading = useProductStore((state) => state.isLoadingSave);

    const handleProductImageUpload = () => {
      uploadImage({
        file,
        progress,
        setProgress,
        setUploadLoading,
        setUrl,
      });
    };

    const handleProductEdit: SubmitHandler<UploadFormState> = (data) => {
      const { drinkName, description, category, price } = data;
      const newUpdate = {
        drinkName: drinkName || product?.drinkName,
        description: description || product?.description,
        category: category || product?.category,
        url: url || product?.url,
        price: price || product?.price,
      };
      console.log(newUpdate);
      // docsEditMutation.mutate(newUpdate);
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
          <ModalOverlay backdropFilter={'blur(4px)'} />
          <ModalContent>
            <ModalHeader>
              Edit Product{' '}
              <chakra.span color="success.700">
                {product?.drinkName}
              </chakra.span>
              ?
            </ModalHeader>
            <ModalCloseButton size="sm" />
            <form onSubmit={handleSubmit(handleProductEdit)}>
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
                    Upload Image First
                  </Button>
                  <Button
                    size="sm"
                    type="submit"
                    variant="solid"
                    isLoading={isLoading}
                    colorScheme="success"
                  >
                    Update All
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
);

export default ProductEdit;
