import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { useBoolean } from '@chakra-ui/hooks';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Text, VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';

import { useAuth } from '@hooks/useAuth/index';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Admin } from '@interfaces/index';

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<Admin>();
  const [showPassword, toggleShowPassword] = useBoolean(false);
  const { signInAdmin, isLoading } = useAuth();

  const handleAdminLogin: SubmitHandler<Admin> = (data) => {
    console.log(data);
    // signInAdmin(data.email, data.password);
  };

  return (
    <Box width={{ base: '300px', md: '400px' }} mx="auto">
      <Text fontWeight="semibold" fontSize="lg" textAlign="center">
        SWDSL Admin Login Page
      </Text>
      <Box mt={6}>
        <form onSubmit={handleSubmit(handleAdminLogin)}>
          <VStack spacing={7}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                {...register('email', {
                  required: true,
                })}
                type="email"
                placeholder="Email Address"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  {...register('password', {
                    required: true,
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={toggleShowPassword.toggle}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>{' '}
            </FormControl>
            <Button
              isLoading={isLoading}
              type="submit"
              colorScheme="primary"
              width={'full'}
            >
              Login as an Admin
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
