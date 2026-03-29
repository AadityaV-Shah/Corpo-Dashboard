import { Box, Text, Container, Card, Grid, Stack, Image } from "@chakra-ui/react";

interface MentorProps {
    image: string;
    name: string;
    role: string;
    wplace: string;
    skill: string;
    detail: string;
}

const mentorData: MentorProps[] = [
    {
        image: "https://randomuser.me/api/portraits/women/91.jpg",
        name: "Dr. Lucy Steele",
        role: "AI Research Mentor",
        wplace: "Stanford University",
        skill: "Machine Learning & Deep Learning",
        detail: "Dr. Sarah France is an AI researcher at Stanford University with over 15 years of experience in machine learning and deep learning. She mentors our team in building intelligent models and optimizing algorithms."
    },
    {
        image: "https://randomuser.me/api/portraits/men/33.jpg",
        name: "Hector Salamanca",
        role: "Software Architecture Advisor",
        wplace: "Google",
        skill: "System Design & Scalable Applications",
        detail: "Hector Salamanca is a software architect at Google specializing in system design and scalable applications. He provides guidance on structuring robust, efficient software systems."
    },
    {
        image: "https://randomuser.me/api/portraits/women/34.jpg",
        name: "Skyler White",
        role: "Product Strategy Mentor",
        wplace: "Amazon",
        skill: "Product Development & UX Strategy",
        detail: "Sarah Johnson is a product strategist at Amazon with expertise in UX and product development. She helps the team craft user-centered designs and roadmap strategies."
    },
    {
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Peter Griffin",
        role: "Cloud Computing Mentor",
        wplace: "Microsoft",
        skill: "Cloud Infrastructure & DevOps",
        detail: "Peter Griffin works at Microsoft focusing on cloud infrastructure and DevOps. He advises on scalable cloud architecture and best practices for deployment pipelines."
    },
    {
        image: "https://randomuser.me/api/portraits/men/90.jpg",
        name: "Gyro Zeppeli",
        role: "Data Science Advisor",
        wplace: "IBM",
        skill: "Data Analytics & AI Solutions",
        detail: "Priya Nair is a data scientist at IBM experienced in analytics and AI solutions. She mentors our team on extracting insights from complex datasets and applying AI effectively."
    },
    {
        image: "https://randomuser.me/api/portraits/men/36.jpg",
        name: "Jesse Pinkman",
        role: "Cybersecurity Mentor",
        wplace: "Cisco",
        skill: "Network Security & Threat Analysis",
        detail: "James Walker is a cybersecurity expert at Cisco specializing in network security and threat analysis. He guides the team on building secure systems and identifying vulnerabilities."
    }
];

const Mentors = () => {
    return (
        <Box minH={"100vh"} w={"100%"} bg={"rgb(225, 226, 239)"} pt={5} pb={10}>
            <Container maxW="container.xl">
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                    gap={6}
                >
                    {mentorData.map((item) => (
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
                                    <Image src={item.image} objectFit="contain" borderRadius="full" />

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
                                        {item.detail}
                                    </Box>
                                </Box>

                                <Stack w={"full"} align={"center"} gap={3}>
                                    <Text fontSize={"22px"}>{item.name}</Text>
                                    <Text fontSize={"16px"}>{item.role}</Text>
                                    <Text fontSize={"16px"} bg={"red.400"} p={2} rounded={"xl"} cursor={"pointer"}>{item.wplace}</Text>
                                    <Text fontSize={"15px"}>{item.skill}</Text>
                                </Stack>
                            </Card.Body>
                        </Card.Root>
                    )
                    )}
                </Grid>
            </Container>
        </Box>
    )
}

export default Mentors