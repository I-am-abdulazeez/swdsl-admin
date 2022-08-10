import { ChangeEvent } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { FileInputProps } from '@interfaces/index';
import { Input } from '@chakra-ui/input';
import { chakra } from '@chakra-ui/system';
import { Box, Text } from '@chakra-ui/layout';

import { fileTypes } from '@data/index';

import MotionBox from '../MotionBox';

import { customToast } from '@utils/index';

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
