import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { Field } from '@/components/ui/field';
import { toaster, Toaster as UIToaster } from '@/components/ui/toaster';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const isValidEmail = email.includes("@") && email.includes(".");
    const isValidPassword = password.length >= 6;

    const handleSubmit = (e: React.FormEvent) => {
        console.log(e)
        e.preventDefault();
        if (isValidEmail && isValidPassword) {
            console.log({ email, password });
            navigate("/");
        } else {
            toaster.create({ title: 'Error', description: 'Invalid email or password', type: 'error' });
        }
    };

    return (

        <Box minH={"100vh"} minW={"100vw"} bg={"rgb(225, 226, 239)"} alignContent={"center"} justifyItems={"center"} position={"relative"}>
            <Box
                w="full"
                h="300px"
                bgImage="url('https://static.vecteezy.com/system/resources/previews/066/340/304/non_2x/abstract-bright-blue-gradient-green-background-trendy-wave-shapes-pattern-with-lines-background-colorful-design-vector.jpg')"
                position="absolute"
                left={0}
                top={0}
                roundedBottom="xl"
            />
            <Box position={"absolute"} h={"auto"} w={"400px"} gap={4} bg={"white"} p={5} rounded={"xl"} top={200} left={550}>
                <Stack>
                    <Box justifyItems={"center"}> <Text color={"black"} fontWeight={"medium"} fontSize={"xl"}>Register</Text> </Box>

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

                            <Button type="submit" colorPalette="teal" variant="solid" width="full">
                                Sign Up
                            </Button>
                        </Stack>
                    </form>

                </Stack>
            </Box>

        </Box>
    )
}

export default SignUp