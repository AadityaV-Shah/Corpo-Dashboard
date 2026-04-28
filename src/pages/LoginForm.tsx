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
import { supabase } from "@/api/supabaseAdmin";
import { useNavigate } from 'react-router-dom';
import { Field } from '@/components/ui/field';
import { toaster, Toaster as UIToaster } from '@/components/ui/toaster';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toaster.create({ title: "Error", description: error.message, type: "error" });
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <Flex w="100vw" h="100vh">


      {/* Left Half Container */}
      <Flex
        w={{base:'100%', md:'100%', lg:'50%'}}
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

              <Button type="submit" colorPalette="teal" variant="solid" width="full" loading={loading}>
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
        display={{ base: "none", md: "none", lg:'flex' }}
        bg="#11b798"
      >
        <Text fontFamily={"Poppins"} fontSize={'90px'}>TMP</Text>
      </Flex>
    </Flex>
  );
};

export default LoginForm;