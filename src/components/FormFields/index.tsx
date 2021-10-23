import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  DrinksCategory,
  FileInputProps,
  InputFieldProps,
  SelectFieldProps,
} from "../../interfaces";
import { Input } from "@chakra-ui/input";
import { drinkCategoriesArray } from "../../data";
import { Select } from "@chakra-ui/select";
import { chakra } from "@chakra-ui/system";
import { Box, Text } from "@chakra-ui/layout";
import MotionBox from "../MotionBox";
import ProgressBar from "../ProgressBar";

export const InputField = ({
  name,
  label,
  handleChange,
  placeHolder,
  value,
}: InputFieldProps) => {
  return (
    <FormControl isRequired id={name}>
      <FormLabel fontSize="14px">{label}</FormLabel>
      <Input
        value={value}
        name={name}
        onChange={handleChange}
        type="text"
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

export const FileInput = ({
  file,
  handleFileChange,
  progress,
}: FileInputProps) => {
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
          bg: "#cc534b",
          color: "#fff",
          cursor: "pointer",
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
          left="14px"
          top="4.9px"
          fontSize="1.3rem"
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
          <MotionBox
            height="5px"
            bg="primary.300"
            borderRadius="md"
            mt={2}
            initial={{ width: 0 }}
            animate={{ width: progress + "%" }}
          />
        )}
      </Box>
    </FormControl>
  );
};
