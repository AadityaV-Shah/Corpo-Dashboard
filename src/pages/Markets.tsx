import MentorCard from "@/components/MarketCard";
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
                    {marketsData.map((item) => (
                        <MentorCard
                            iconic={item.icon}
                            title={item.name}
                            detail={item.desc}
                            bgimage={"url('/designMentor.jpg')"}
                            boxsize={"50px"}
                        />
                    )
                    )}
                </Grid>
            </Container>
        </Box>
    )
}

export default Markets