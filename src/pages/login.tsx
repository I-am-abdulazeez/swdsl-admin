import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Text, VStack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth/index";

const Login = (): JSX.Element => {
  const location = useLocation();
  const toast = useToast();
  const { signInAdmin, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const handleClick = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Please fill out the credentials",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    signInAdmin(email, password);
  };

  return (
    <Box width="400px" mx="auto">
      <Text fontWeight="semibold" fontSize="lg" textAlign="center">
        SWDSL Admin Login Page
      </Text>
      <Box mt={6}>
        <chakra.form onSubmit={handleSubmit}>
          <VStack spacing={3}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>We'll never share your password.</FormHelperText>
            </FormControl>
            <Button
              isLoading={isLoading}
              type="submit"
              colorScheme="primary"
              isFullWidth
            >
              Login as an Admin
            </Button>
          </VStack>
        </chakra.form>
      </Box>
    </Box>
  );
};

export default Login;
