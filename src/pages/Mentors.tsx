import { useState, useEffect } from "react";
import { Box, Text, Container, Card, Grid, Stack, Image } from "@chakra-ui/react";
import { supabaseApi } from "@/api/supabase";

interface MentorProps {
    image: string;
    name: string;
    role: string;
    wplace: string;
    skill: string;
    detail: string;
}

const Mentors = () => {

    const [mentors, setMentors] = useState<MentorProps[]>([]);


    useEffect(() => {
        const getInfo = async () => {
            const response = await supabaseApi.get(`/mentors`);
            if (response.data.length > 0) {
                setMentors(response.data)
            };
        };
        getInfo();
    }, []);

    return (
        <Box minH={"100vh"} w={"100%"} bg={"rgb(225, 226, 239)"} pt={5} pb={10}>
            <Container maxW="container.xl">
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                    gap={6}
                >
                    {mentors.map((mentors, index) => (
                        <Card.Root borderRadius="xl">
                            <Card.Body display="flex"
                                flexDirection="column"
                                gap={"5"} // Using pixel values to see a clear difference
                                bgImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/designMentor.jpg')"
                                bgSize="cover"
                                borderRadius="xl"
                                position={"relative"}
                                fontFamily={"poppins"}>

                                <Box w="full" h={"auto"} justifyItems={"center"} position={"relative"}>
                                    <Image src={mentors.image} objectFit="contain" borderRadius="full" />

                                    {/* The Overlay - Now sits directly on top and listens for its own hover */}
                                    <Box
                                        position="absolute"
                                        top="0"
                                        left="-6"
                                        w="390px"
                                        h="auto"
                                        display="flex"
                                        alignItems="center"
                                        p="2"
                                        justifyContent="center"
                                        bg="rgba(0,0,0,0.7)" // Semi-transparent black
                                        color="white"
                                        borderRadius="xl"
                                        cursor="pointer"
                                        opacity="0"
                                        zIndex="10" // Force it to the front
                                        transition="opacity 0.2s ease-in-out"
                                        _hover={{ opacity: 1 }} // Direct hover trigger
                                    >
                                        {mentors.detail}
                                    </Box>
                                </Box>

                                <Stack w={"full"} align={"center"} gap={3}>
                                    <Text fontSize={"22px"}>{mentors.name}</Text>
                                    <Text fontSize={"16px"}>{mentors.role}</Text>
                                    <Text fontSize={"16px"} bg={"red.400"} p={2} rounded={"xl"} cursor={"pointer"}>{mentors.wplace}</Text>
                                    <Text fontSize={"15px"}>{mentors.skill}</Text>
                                </Stack>
                            </Card.Body>
                        </Card.Root>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default Mentors