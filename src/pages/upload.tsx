import { useState } from 'react';
import {
  Box,
  Text,
  SimpleGrid,
  ButtonGroup,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { Timestamp } from '@firebase/firestore';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FileInput } from '@components/FormFields';

import { drinkCategoriesArray } from '@data/index';
import { UploadFormState } from '@interfaces/index';
import { uploadImage } from '@utils/index';
import { useProductStore } from '@store/useProductStore';

const Upload: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<UploadFormState>();

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<Timestamp | null>(null);

  const saveProduct = useProductStore((state) => state.saveProduct);
  const isLoading = useProductStore((state) => state.isLoadingSave);

  const handleProductSubmit: SubmitHandler<UploadFormState> = (data) => {
    const { category, price, description, drinkName } = data;
    const newProductUpload = {
      drinkName,
      description,
      category,
      price: Number(price),
      url,
      createdAt,
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
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6} textAlign="left">
          <FormControl>
            <FormLabel fontSize="14px">Drink name</FormLabel>
            <Input
              {...register('drinkName', { required: true })}
              type={'text'}
              placeholder="Meridian"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="14px">Description</FormLabel>
            <Input
              {...register('description', { required: true })}
              type={'text'}
              placeholder="Meridian wine is the best"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="14px">Select Category</FormLabel>
            <Select
              {...register('category', { required: true })}
              placeholder="Select category"
            >
              {drinkCategoriesArray.map(({ drinkCategory, drink_id }) => (
                <option key={drink_id} value={drinkCategory}>
                  {drinkCategory}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="14px">Price</FormLabel>
            <Input
              {...register('price', { required: true })}
              type="number"
              placeholder="500 (in Dollars)"
            />
          </FormControl>
        </SimpleGrid>

        <Box my={3}>
          <Text fontSize="sm" fontWeight="normal">
            Click on the circle below to select a drink image
          </Text>
        </Box>
        <Box
          display="flex"
          p={3}
          borderRadius="10px"
          flexDir="column"
          border="1px solid #EDF2F7"
        >
          <FileInput
            file={file}
            progress={progress}
            setProgress={setProgress}
            setFile={setFile}
          />
        </Box>

        <ButtonGroup mt={4} spacing={2}>
          <Button
            size="sm"
            isLoading={uploadLoading}
            isDisabled={!file || progress === 100}
            onClick={handleProductImageUpload}
          >
            Upload Image First
          </Button>
          <Button
            size="sm"
            type="submit"
            variant="solid"
            isDisabled={!file || progress === 0}
            colorScheme="success"
            isLoading={isLoading}
          >
            Save All
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export default Upload;
