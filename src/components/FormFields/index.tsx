import { ChangeEvent } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import {
  DrinksCategory,
  FileInputProps,
  InputFieldProps,
  SelectFieldProps,
  UploadFormState,
} from '@interfaces/index';
import { Input } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';
import { chakra } from '@chakra-ui/system';
import { Box, Text } from '@chakra-ui/layout';

import { drinkCategoriesArray, fileTypes } from '@data/index';

import MotionBox from '../MotionBox';

import { customToast } from '@utils/index';

export const InputField = ({
  name,
  label,
  handleChange,
  placeHolder,
  value,
  type,
  isRequired,
}: InputFieldProps) => {
  return (
    <FormControl isRequired={isRequired} id={name}>
      <FormLabel fontSize="14px">{label}</FormLabel>
      <Input
        value={value}
        name={name}
        onChange={handleChange}
        type={type}
        borderRadius="md"
        placeholder={placeHolder}
      />
    </FormControl>
  );
};

export const SelectField = ({
  name,
  value,
  handleChange,
  placeHolder,
}: SelectFieldProps) => {
  return (
    <FormControl isRequired id={name}>
      <FormLabel fontSize="14px">Drink Category</FormLabel>
      <Select
        value={value}
        name={name}
        onChange={handleChange}
        borderRadius="md"
        placeholder={placeHolder}
      >
        {drinkCategoriesArray.map(
          ({ drinkCategory, drink_id }: DrinksCategory) => (
            <option key={drink_id} value={drinkCategory}>
              {drinkCategory}
            </option>
          )
        )}
      </Select>
    </FormControl>
  );
};

export const FileInput: React.FC<FileInputProps> = ({
  progress,
  file,
  setFile,
  setProgress,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let selected = e.target.files![0];
    if (selected && fileTypes.includes(selected.type)) {
      setFile(selected);
      setProgress(0);
    } else if (file?.size! > 2048) {
      customToast({
        status: 'error',
        title: 'File too large, Maximum of 2MB',
      });
    } else {
      setFile(null);
      customToast({
        status: 'error',
        title: 'Please select an image file',
      });
    }
  };

  return (
    <FormControl>
      <FormLabel
        display="block"
        width="40px"
        height="40px"
        border="1px solid #cc534b"
        borderRadius="50%"
        lineHeight="30px"
        color="#cc534b"
        mb={0}
        fontWeight="bold"
        fontSize="24px"
        transition="all .3s ease-in-out"
        _hover={{
          bg: '#cc534b',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        <Input
          height="0"
          width="0"
          opacity="0"
          onChange={handleFileChange}
          type="file"
        />
        <chakra.span
          position="absolute"
          left="13px"
          top="4px"
          fontSize="1.5rem"
        >
          +
        </chakra.span>
      </FormLabel>
      <Box fontSize="0.8rem" mt={2}>
        <Text>
          {file && (
            <chakra.span fontWeight="semibold"> {file?.name}</chakra.span>
          )}
        </Text>
        {file && (
          <Box mt={2} height="5px" bg="gray.200" borderRadius="md">
            <MotionBox
              height="5px"
              bg="primary.300"
              borderRadius="md"
              initial={{ width: 0 }}
              animate={{ width: progress + '%' }}
            />
          </Box>
        )}
      </Box>
    </FormControl>
  );
};
