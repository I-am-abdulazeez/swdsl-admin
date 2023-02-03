import { useState } from 'react';
import { Text, ButtonGroup, Button } from '@chakra-ui/react';
import { Timestamp } from '@firebase/firestore';
import { SubmitHandler, useForm } from 'react-hook-form';

import { UploadFormState } from '@interfaces/index';
import { uploadImage } from '@utils/index';
import { useProductStore } from '@store/useProductStore';
import FormDetails from '@components/FormDetails';

const Upload: React.FC = () => {
  const { register, handleSubmit, reset, unregister, setValue } =
    useForm<UploadFormState>();

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<Timestamp | null>(null);

  const saveProduct = useProductStore((state) => state.saveProduct);
  const isLoading = useProductStore((state) => state.isLoadingSave);

  const handleProductSubmit: SubmitHandler<UploadFormState> = (data) => {
    const newProductUpload = {
      drinkName: data.drinkName,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      url,
      createdAt,
      packSize: data.packSize,
      packsOrWholesale: data.packsOrWholesale,
    };
    saveProduct(newProductUpload, reset, setFile);
  };

  const handleProductImageUpload = () => {
    uploadImage({
      file,
      progress,
      setCreatedAt,
      setProgress,
      setUploadLoading,
      setUrl,
    });
  };

  return (
    <>
      <Text fontSize="xl" mb={5} fontWeight="semibold">
        Upload Drinks
      </Text>
      <form onSubmit={handleSubmit(handleProductSubmit)}>
        <FormDetails
          register={register}
          file={file}
          progress={progress}
          setFile={setFile}
          setProgress={setProgress}
          isRequired={true}
          unregister={unregister}
          setValue={setValue}
        />
        <ButtonGroup mt={4} spacing={2}>
          <Button
            size="sm"
            isLoading={uploadLoading}
            isDisabled={!file || progress === 100}
            onClick={handleProductImageUpload}
          >
            Upload Image
          </Button>
          <Button
            size="sm"
            type="submit"
            variant="solid"
            isDisabled={!file || progress === 0}
            colorScheme="success"
            isLoading={isLoading}
          >
            Save Product
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export default Upload;
