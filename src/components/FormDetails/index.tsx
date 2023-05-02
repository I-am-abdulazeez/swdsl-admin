import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Box,
  HStack,
  Switch,
} from '@chakra-ui/react';
import { FileInput } from '@components/FormFields';

import { drinkCategoriesArray } from '@data/index';
import { FormDetailsProps } from '@interfaces/index';
import { useEffect, useState } from 'react';

const FormDetails: React.FC<FormDetailsProps> = ({
  register,
  file,
  progress,
  setFile,
  setProgress,
  showValue,
  isRequired,
  product,
  unregister,
  setValue,
}) => {
  const [isPacksOrWholesale, setIsPacksOrWholesale] = useState<boolean>(
    product?.packsOrWholesale || false
  );

  useEffect(() => {
    if (isPacksOrWholesale) {
      register('packsOrWholesale', { required: true });
    } else {
      unregister('packsOrWholesale');
      setValue('packSize', '');
    }
  }, [isPacksOrWholesale]);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6} textAlign="left">
        <FormControl>
          <FormLabel fontSize="14px">Drink name</FormLabel>
          <Input
            {...register('drinkName', { required: isRequired })}
            type={'text'}
            placeholder="Meridian"
            defaultValue={(showValue && product?.drinkName) || ''}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="14px">Description</FormLabel>
          <Input
            {...register('description', { required: isRequired })}
            type={'text'}
            placeholder="Meridian wine is the best"
            defaultValue={(showValue && product?.description) || ''}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="14px">Select Category</FormLabel>
          <Select
            {...register('category', { required: isRequired })}
            placeholder="Select category"
            defaultValue={(showValue && product?.category) || ''}
          >
            {drinkCategoriesArray.map(({ drinkCategory, drink_id }) => (
              <option key={drink_id} value={drinkCategory}>
                {drinkCategory}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>
            <FormLabel fontSize="14px">Select Product method</FormLabel>
            <HStack>
              <Text fontWeight={'semibold'}>Product in wholesale</Text>
              <Switch
                id="packs switch"
                {...register('packsOrWholesale')}
                colorScheme={'primary'}
                size={'sm'}
                fontWeight={'semibold'}
                defaultChecked={showValue && product?.packsOrWholesale}
                isChecked={isPacksOrWholesale}
                onChange={() => setIsPacksOrWholesale(!isPacksOrWholesale)}
              />
              <Text fontWeight={'semibold'}>Product in packs</Text>
            </HStack>
          </FormLabel>
        </FormControl>
        {isPacksOrWholesale ? (
          <FormControl>
            <FormLabel>
              <FormLabel fontSize="14px">Select pack size</FormLabel>
              <Select
                {...register('packSize', {
                  required: true,
                })}
                placeholder="Select Pack Size"
                defaultValue={(showValue && product?.packSize) || ''}
              >
                <option value="3 Packs">3 Packs</option>
                <option value="4 Packs">4 Packs</option>
                <option value="6 Packs">6 Packs</option>
                <option value="10 Packs">10 Packs</option>
                <option value="12 Packs">12 Packs</option>
              </Select>
            </FormLabel>
          </FormControl>
        ) : null}
        <FormControl mt={'3px'}>
          <FormLabel fontSize="14px">Price</FormLabel>
          <Input
            {...register('price', { required: isRequired })}
            type="number"
            placeholder="500 (in Dollars)"
            defaultValue={(showValue && product?.price) || ''}
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
