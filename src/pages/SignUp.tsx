import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Stack,
    Text,
    HStack,
    Center,
    Flex,
    Switch
} from "@chakra-ui/react";
import { supabase } from "@/api/supabaseAdmin";
import { useNavigate } from 'react-router-dom';
import { Field } from '@/components/ui/field';
import { toaster, Toaster as UIToaster } from '@/components/ui/toaster';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            toaster.create({ title: "Error", description: error.message, type: "error" });
        } else {
            toaster.create({ title: "Success", description: "Account created! You can now log in.", type: "success" });
            navigate("/");
        }

        setLoading(false);
    };

    return (

        <Box h={"100vh"} w={"100vw"} bg="bg.emphasized" alignContent={"center"} justifyItems={"center"} position={"relative"}>
            <Box
                w="full"
                h="300px"
                bg="#11b798"
                position="absolute"
                left={0}
                top={0}     
                roundedBottom="xl"
            />
            <Box position={"absolute"} h={"auto"} w={"400px"} gap={4} bg={"white"} p={5} rounded={"xl"} top={{base:'20', md:'100', lg:'100'}} left={{base:'100', md:'100', lg:'550'}}>
                <Stack gap={6}>
                    <Box justifyItems={"center"}> <Text color={"black"} fontWeight={"medium"} fontSize={"xl"}>Register with</Text> </Box>

                    <HStack gap={1} justifyContent={"space-evenly"} alignItems={"center"}>

                        <Center p={3} border="1px solid" borderColor="gray.300" borderRadius="md" cursor={"pointer"}>
                            <FaFacebook color="grey" size="30px" />
                        </Center>

                        <Center p={3} border="1px solid" borderColor="gray.300" borderRadius="md" cursor={"pointer"}>
                            <FaApple color="grey" size="30px" />
                        </Center>

                        <Center p={3} border="1px solid" borderColor="gray.300" borderRadius="md" cursor={"pointer"}>
                            <FaGoogle color="grey" size="30px" />
                        </Center>

                    </HStack>

                    <Flex justify={"center"}>
                        <Text color={"grey"}>or</Text>
                    </Flex>

                    <UIToaster />

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

                            <HStack gap={2} py={0}>
                                <Switch.Root colorPalette={"green"} size={"lg"}
                                >
                                    <Switch.HiddenInput />
                                    <Switch.Control />
                                    <Switch.Label />
                                </Switch.Root>
                                <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>Remember Me</Text>
                            </HStack>

                            <HStack gap={2} justifyContent={"space-between"} alignContent={"center"}>
                                <Button type="submit" colorPalette="teal" variant="solid" flex={1} loading={loading}>
                                    Sign Up
                                </Button>

                                <Button
                                    colorPalette="teal"
                                    variant="solid"
                                    flex={1}
                                    onClick={() => navigate("/")}
                                >
                                    Back
                                </Button>
                            </HStack>
                        </Stack>
                    </form>

                </Stack>
            </Box>

        </Box>
    )
}

export default SignUp