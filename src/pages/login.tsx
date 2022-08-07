import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useBoolean } from '@chakra-ui/hooks';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Text, VStack } from '@chakra-ui/layout';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Admin } from '@interfaces/index';
import { useAuthStore } from '@store/useAuthStore';

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<Admin>();
  const [showPassword, toggleShowPassword] = useBoolean(false);

  const isLoading = useAuthStore((state) => state.isLoading);
  const SignInAdmin = useAuthStore((state) => state.signInAdmin);

  const handleAdminLogin: SubmitHandler<Admin> = (data) => {
    console.log(data);
    SignInAdmin(data);
  };

  return (
    <Box width={{ base: '280px', md: '350px' }} mx="auto">
      <Text fontWeight="semibold" fontSize="2xl" textAlign="center">
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
                fontSize={'15px'}
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
                  fontSize={'15px'}
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
              </InputGroup>
            </FormControl>
            <Button
              isLoading={isLoading}
              type="submit"
              colorScheme="primary"
              width={'full'}
            >
              Admin Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
