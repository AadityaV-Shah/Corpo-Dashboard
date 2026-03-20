import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Heading,
  Stack,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { Field } from '@/components/ui/field';
import { toaster, Toaster as UIToaster } from '@/components/ui/toaster';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    console.log(e)
    e.preventDefault();
    if (email === "avs@gmail.com" && password === "rockspeed") {
      console.log({ email }, { password })
      navigate("/dashboard")
    } else {
      toaster.create({ title: 'Error', description: 'Incorrect email or password', type: 'error' });
    }
  };

  return (
    <Flex w="100vw" h="100vh">
      {/* Left Half Container */}
      <Flex
        w="50%"
        h="full"
        align="center"
        justify="center"
        bgColor="bg.emphasized"
      >
        <Box
          w="full"
          maxW="400px"
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          bg="white"
        >
          <UIToaster />
          <Heading mb={6} color="black" textAlign="center" size="2xl">Login</Heading>

          <form onSubmit={handleSubmit}>
            <Stack gap="10">
              <Field label="Email" color="black">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </Field>

              <Field label="Password" color="black">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </Field>

              <Button type="submit" colorPalette="teal" variant="solid" width="full">
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>

      {/* Right Half */}
      <Flex
        w="50%"
        h="100vh"
        align="center"
        justify="center"
        display={{ base: "none", md: "flex" }}
        bgImage="url('https://static.vecteezy.com/system/resources/previews/066/340/304/non_2x/abstract-bright-blue-gradient-green-background-trendy-wave-shapes-pattern-with-lines-background-colorful-design-vector.jpg')"
      >
        <Text fontFamily={"Poppins"} fontSize={'90px'}>TradeMasterPro</Text>
      </Flex>
    </Flex>
  );
};

export default LoginForm;