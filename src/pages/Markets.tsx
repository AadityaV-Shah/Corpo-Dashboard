import { Box, Text, Container, Card, Grid, Stack, Icon } from "@chakra-ui/react";
import { Cpu, Activity, CreditCard, BookOpen, ShoppingCart, HardHat, Users, Server, Globe } from "lucide-react";

interface MarketProps {
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    desc: string;
}

const marketsData: MarketProps[] = [
    { name: "Technology", icon: Cpu, desc: "Software, AI, and IT solutions." },
    { name: "Healthcare", icon: Activity, desc: "Medical devices and services." },
    { name: "Finance", icon: CreditCard, desc: "Banking and fintech solutions." },
    { name: "Education", icon: BookOpen, desc: "EdTech platforms and tools." },
    { name: "Retail", icon: ShoppingCart, desc: "E-commerce and supply chain." },
    { name: "Manufacturing", icon: HardHat, desc: "Automation and industry solutions." },
    { name: "Human Resources", icon: Users, desc: "HR solutions and workforce management." },
    { name: "Cloud Services", icon: Server, desc: "Cloud infrastructure and hosting services." },
    { name: "Global Trade", icon: Globe, desc: "International logistics and trade solutions." },
];

const Markets = () => {
    return (
        <Box minH={"100vh"} w={"100%"} bg={"rgb(225, 226, 239)"} pt={5} pb={10}>
            <Container maxW="container.xl">
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                    gap={6}
                >
                    {marketsData.map((item, index) => (
                        <Card.Root borderRadius="xl">
                            <Card.Body display="flex"
                                flexDirection="column"
                                gap={"5"} // Using pixel values to see a clear difference
                                bgImage="url('/designMentor.jpg')"
                                bgSize="cover"
                                borderRadius="xl"
                                position={"relative"}
                                fontFamily={"poppins"}>

                                <Box
                                    w="full"
                                    h="auto"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    position="relative"
                                >
                                    <Icon as={item.icon} boxSize="50px" />
                                </Box>

                                <Stack w={"full"} align={"center"} gap={3}>
                                    <Text fontSize={"25px"}>{item.name}</Text>
                                    <Text fontSize={"16px"}>{item.desc}</Text>
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

export default Markets