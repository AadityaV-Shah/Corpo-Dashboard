import { Box, Flex, HStack, Text, Button, Link } from "@chakra-ui/react";
import { LayoutDashboard, User, PencilLine } from "lucide-react";
import { Input, Group, InputElement } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react"
import { IoMdPerson } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaBell, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";


const Navbar = () => {
    return (
        <Box
            position="relative"
            w="full"
            borderBottom={"1px solid grey"}
            zIndex="1000"
        >
            <Flex
                bg="rgb(225, 226, 239)" // Glassmorphism white with 70% opacity
                backdropFilter="blur(10px)" // The blur effect
                px="6"
                py="4"
                borderWidth="1px"
                borderColor="white/20"
                // boxShadow="sm"
                justify="space-between"
                align="center"
            >
                <HStack>
                    <Text fontWeight="bold" fontSize="xs" letterSpacing="wider" color="gray">
                        PAGES
                    </Text>
                    <Text fontWeight="bold" fontSize="xs" letterSpacing="wider" color="black">
                        / WELCOME TO TRADEMASTERPRO!
                    </Text>
                </HStack>

                {/* Center: Navigation Links */}
                <HStack gap="8" display={{ base: "none", sm: "flex" }}>
                    <Group flex="1" maxW="300px">
                        <InputElement pointerEvents="none" placement="start" ps="3">
                            <IoMdPerson color="gray.500" size={20} />
                        </InputElement>
                        <Input
                            placeholder="Type here..."
                            ps="10"
                            borderRadius="2xl"
                            variant="outline"
                            height="36px"
                            bg="white"
                            color="black"
                        />
                    </Group>

                    <HStack gap="6" color="gray.600">
                        <FaFacebook color="gray.500" size={20} />
                        <FaInstagram color="gray.500" size={20} />
                        <FaLinkedin color="gray.500" size={20} />
                        <FaBell color="gray.500" size={20} />
                        <IoMdSettings color="gray.500" size={20} />
                    </HStack>
                </HStack>
            </Flex>
        </Box >
    );
};

export default Navbar;