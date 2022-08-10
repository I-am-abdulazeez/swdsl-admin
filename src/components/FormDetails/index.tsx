import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Box,
} from '@chakra-ui/react';
import { FileInput } from '@components/FormFields';

import { drinkCategoriesArray } from '@data/index';
import { FormDetailsProps } from '@interfaces/index';

const FormDetails: React.FC<FormDetailsProps> = ({
  register,
  file,
  progress,
  setFile,
  setProgress,
}) => {
  return (
    <>
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
    </>
  );
};

export default FormDetails;
