import MentorCard from "@/components/MarketCard";
import { Box, Container, Grid } from "@chakra-ui/react";
import { Cpu, Activity, CreditCard, BookOpen, ShoppingCart, HardHat, Users, Server, Globe } from "lucide-react";

interface MarketProps {
    id: number,
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    desc: string;
    xdetail: string;
}

const marketsData: MarketProps[] = [
    { id: 1, name: "Technology", icon: Cpu, desc: "Software, AI, and IT solutions.", xdetail: "Empowering businesses with cutting-edge software, artificial intelligence, and IT infrastructure. From cloud platforms to enterprise tools, technology drives digital transformation across industries." },
    { id: 2, name: "Healthcare", icon: Activity, desc: "Medical devices and services.", xdetail: "Advancing patient care through innovative medical devices, diagnostics, and health services. Our solutions support hospitals, clinics, and health networks with reliable, compliant technology." },
    { id: 3, name: "Finance", icon: CreditCard, desc: "Banking and fintech solutions.", xdetail: "Modernizing financial services with secure banking platforms, payment systems, and fintech tools. We help institutions streamline operations, reduce risk, and deliver seamless customer experiences." },
    { id: 4, name: "Education", icon: BookOpen, desc: "EdTech platforms and tools.", xdetail: "Transforming learning through interactive EdTech platforms, virtual classrooms, and smart curricula. We equip educators and institutions with the tools to engage students and improve outcomes." },
    { id: 5, name: "Retail", icon: ShoppingCart, desc: "E-commerce and supply chain.", xdetail: "Connecting brands and consumers through powerful e-commerce platforms and supply chain solutions. From inventory management to last-mile delivery, we help retailers scale efficiently." },
    { id: 6, name: "Manufacturing", icon: HardHat, desc: "Automation and industry solutions.", xdetail: "Optimizing production lines with industrial automation, robotics, and smart factory technology. Our solutions reduce downtime, improve quality control, and drive operational efficiency." },
    { id: 7, name: "Human Resources", icon: Users, desc: "HR solutions and workforce management.", xdetail: "Streamlining hiring, onboarding, and employee management with modern HR platforms. We help organizations build stronger teams through data-driven workforce insights and automation." },
    { id: 8, name: "Cloud Services", icon: Server, desc: "Cloud infrastructure and hosting services.", xdetail: "Delivering scalable, secure cloud infrastructure tailored to businesses of every size. From hosting to DevOps pipelines, our cloud solutions ensure reliability, speed, and cost efficiency." },
    { id: 9, name: "Global Trade", icon: Globe, desc: "International logistics and trade solutions.", xdetail: "Facilitating seamless cross-border commerce through advanced logistics and trade management tools. We support importers, exporters, and freight networks with real-time tracking and compliance solutions." },
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
                            textcolor={"#000000"}
                            bgimage={"url('/designMentor1.jpg')"}
                            boxsize={"50px"}
                            xdetail={item.xdetail}
                            showButton={true}
                        />
                    )
                    )}
                </Grid>
            </Container>
        </Box>
    )
}

export default Markets