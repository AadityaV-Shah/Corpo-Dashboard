import { useState, useEffect } from "react";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { FaBell, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import OptionsMenu from "../OptionsMenu";
import type { ProfInfoProps } from "../Profile/ProfInfo";
import { supabase } from "@/api/supabaseAdmin";
import { supabaseApi } from "@/api/supabase";
import { User } from "lucide-react";
import MyPage from "@/pages/SMleftsection"


const Navbar = () => {

    const [profile, setProfile] = useState<ProfInfoProps>({ name: "", phone: "", location: "", about: "" });

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;
            const response = await supabaseApi.get(`/admin_profiles?id=eq.${session.user.id}`);
            if (response.data.length > 0) {
                const { name, phone, location, about } = response.data[0];
                setProfile({ name, phone, location, about });
            }
        };
        getUser();
    }, []);

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
                    <Text fontWeight="bold" fontSize="xs" letterSpacing="wider" color="gray" display={{ base: 'none', md: 'none', lg: 'block' }}>
                        PAGES /
                    </Text>
                    <Text fontWeight="bold" fontSize="xs" letterSpacing="wider" color="black" display={{ base: 'none', md: 'none', lg: 'block' }}>
                        WELCOME TO TRADEMASTERPRO!
                    </Text>
                </HStack>

                {/* Center: Navigation Links */}
                <HStack gap="8" display={{ base: "none", md: "none", lg: 'flex' }}>

                    <HStack gap="6" color="gray.600" display={{ base: 'none', md: 'none', lg: 'flex' }}>
                        <FaFacebook color="gray.500" size={20} cursor={"pointer"} />
                        <a href="https://github.com/AadityaV-Shah" target="blank"><FaGithub color="gray.500" size={20} cursor={"pointer"} /></a>
                        <a href="https://www.linkedin.com/in/aaditya-vikram-shah-b9b06a3b6/" target="blank"><FaLinkedin color="gray.500" size={20} cursor={"pointer"} /></a>
                        <FaBell color="gray.500" size={20} cursor={"pointer"} />
                    </HStack>

                    <HStack
                        w="100%"
                        px={1}
                        gap={2}
                        align="center"
                        display={{ base: 'none', md: 'none', lg: 'flex' }}
                    >
                        <Box w={"25px"} h={"25px"} display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg="gray.700"
                            borderRadius="full"
                            boxSize={8}
                        >
                            <User />
                        </Box>

                        <HStack alignItems="center"
                            justifyContent="center"
                            gap={2}>
                            <Box mr="auto">
                                <Text fontSize="sm" fontWeight="500" lineHeight="16px" color="black">
                                    {profile.name || '-'}
                                </Text>
                            </Box>
                            <OptionsMenu />
                        </HStack>
                    </HStack>

                </HStack>




                {/* ---------------- SM DashNav Menu ----------------- */}

                <Box
                    display={{ base: 'flex', lg: 'none' }}
                    alignItems="center"
                    justifyContent="space-between"
                    w="full"
                >
                    <MyPage />

                    <HStack px={1} gap={2} align="center">  {/* ✅ removed w="100%" */}
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg="gray.700"
                            borderRadius="full"
                            boxSize={8}
                        >
                            <User />
                        </Box>

                        <HStack alignItems="center" justifyContent="center" gap={2}>
                            <Box mr="auto">
                                <Text fontSize="sm" fontWeight="500" lineHeight="16px" color="black">
                                    {profile.name || '-'}
                                </Text>
                            </Box>
                            <OptionsMenu />
                        </HStack>
                    </HStack>
                </Box>

            </Flex>
        </Box >
    );
};

export default Navbar;