import { Box, Flex, HStack, Text, Button } from "@chakra-ui/react";
import { LayoutDashboard, User, PencilLine } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Box
            position="fixed"
            top="4"
            left="50%"
            transform="translateX(-50%)"
            w="90%"
            maxW="1200px"
            zIndex="1000"
        >
            <Flex
                bg="white/70" // Glassmorphism white with 70% opacity
                backdropFilter="blur(10px)" // The blur effect
                px="6"
                py="3"
                borderRadius="2xl"
                borderWidth="1px"
                borderColor="white/20"
                boxShadow="sm"
                justify="space-between"
                align="center"
            >
                {/* Left Side Logo */}
                <HStack gap="2">
                    <Box bg="teal.500" p="1.5" borderRadius="lg" color="white">
                        <LayoutDashboard size={18} />
                    </Box>
                    <Text fontWeight="bold" fontSize="sm" letterSpacing="wider" color="gray.800">
                        TradeMasterPro
                    </Text>
                </HStack>

                {/* Center: Navigation Links */}
                <HStack gap="8" display={{ base: "none", md: "flex" }}>
                    {/* <Link href="#" variant="plain" _hover={{ textDecoration: "none" }}>
                        <HStack gap="2" color="gray.600">
                            <User size={16} />
                            <Text fontSize="xs" fontWeight="bold">PROFILE</Text>
                        </HStack>
                    </Link> */}
                    <Link to="/signup">
                        <HStack gap="2" color="gray.600">
                            <PencilLine size={16} />
                            <Text fontSize="xs" fontWeight="bold">SIGN UP</Text>
                        </HStack>
                    </Link>
                </HStack>

                {/* Button */}
                <Button
                    bg="gray.900"
                    color="white"
                    borderRadius="full"
                    px="6"
                    size="sm"
                    fontSize="xs"
                    _hover={{ bg: "gray.700" }}
                >
                    Free Download
                </Button>
            </Flex>
        </Box>
    );
};

export default Navbar;