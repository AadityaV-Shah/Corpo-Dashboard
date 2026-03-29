import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Input, Group, InputElement } from "@chakra-ui/react";
import { IoMdPerson } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaBell, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";


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
                    <Text fontWeight="bold" fontSize="xs" letterSpacing="wider" color="gray" display={{ sm: 'none', lg: 'block' }}>
                        PAGES /
                    </Text>
                    <Text fontWeight="bold" fontSize="xs" letterSpacing="wider" color="black">
                        WELCOME TO TRADEMASTERPRO!
                    </Text>
                </HStack>

                {/* Center: Navigation Links */}
                <HStack gap="8" display={{ base: "none", sm: "flex" }}>
                    <Group flex="1" maxW="300px" display={{ sm: 'none', lg: 'block' }}>
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
                        <FaFacebook color="gray.500" size={20} cursor={"pointer"} />
                        <a href="https://github.com/AadityaV-Shah" target="blank"><FaGithub color="gray.500" size={20} cursor={"pointer"} /></a>
                        <a href="https://www.linkedin.com/in/aaditya-vikram-shah-b9b06a3b6/" target="blank"><FaLinkedin color="gray.500" size={20} cursor={"pointer"} /></a>
                        <FaBell color="gray.500" size={20} cursor={"pointer"} />
                        <IoMdSettings color="gray.500" size={20} cursor={"pointer"} />
                    </HStack>
                </HStack>
            </Flex>
        </Box >
    );
};

export default Navbar;