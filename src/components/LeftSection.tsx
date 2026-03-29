import React, { useState, useEffect } from 'react';
import { supabase } from "@/api/supabaseAdmin";
import { Box, Stack, Text, HStack, Flex, Icon } from "@chakra-ui/react";
import { LayoutDashboard, User, BanknoteArrowUp, Rocket, Pencil, BadgeDollarSign, Info } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import OptionsMenu from "./OptionsMenu";
import type { ProfInfoProps } from '@/components/Profile/ProfInfo';
import { supabaseApi } from '@/api/supabase';

const LeftSection = () => {

    const [userEmail, setUserEmail] = useState("");
    const [profile, setProfile] = useState<ProfInfoProps>({ name: "", phone: "", location: "", about: "" });

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            setUserEmail(session.user.email ?? "");

            const response = await supabaseApi.get(`/admin_profiles?id=eq.${session.user.id}`);
            if (response.data.length > 0) {
                const { name, phone, location, about } = response.data[0];
                setProfile({ name, phone, location, about });
            }
        };
        getUser();
    }, []);

    const menuItems = [
        { name: "Home", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Mentors", icon: Pencil, path: "/mentors" },
        { name: "Markets", icon: BanknoteArrowUp, path: "/markets" },
        { name: "Pricing", icon: BadgeDollarSign, path: "/pricing" },
    ];

    const accItems = [
        { name: "Users", icon: User, path: "/userz" },
        { name: "Projects", icon: Rocket, path: "/projects" },
        { name: "About Us", icon: Info, path: "/about" },
    ];

    return (
        <Box
            position="fixed"
            left="0"
            top="0"
            w="250px" // Slightly wider for better breathing room
            h="100vh" // Full viewport height
            zIndex={2000} // CamelCase for React props
        >
            <Stack
                bg="rgb(225, 226, 239)" // Standards-compliant RGBA for glass effect
                backdropFilter="blur(10px)"
                px="4"
                py="4"
                h="full" // Ensures the background fills the 100vh Box
                borderRight="1px solid"
                borderColor="whiteAlpha.300"
                gap="7" // Adds consistent spacing between menu items
            >
                {/* Left Side Logo */}
                <HStack gap="2" alignItems="center" py="10px">
                    <Box bg="teal.500" p="1.5" borderRadius="lg" color="white">
                        <LayoutDashboard size={18} />
                    </Box>
                    <Text fontWeight="bold" fontSize="15px" letterSpacing="wider" color="gray.800">
                        TradeMasterPro
                    </Text>
                </HStack>

                <Stack gap="2">
                    {menuItems.map((item) => (
                        <RouterLink
                            key={item.name}
                            to={item.path}
                            style={{ textDecoration: "none" }}
                        >
                            <Flex
                                align="center"
                                px="4"
                                py="3"
                                borderRadius="lg"
                                transition="0.2s"
                                color="black"
                                _hover={{ bg: "teal.400", transform: "translateX(5px)" }}
                            >
                                <Icon as={item.icon} mr="3" />
                                <Text fontWeight="medium">{item.name}</Text>
                            </Flex>
                        </RouterLink>
                    ))}
                </Stack>

                <Stack gap="2">
                    {accItems.map((item) => (
                        <RouterLink
                            key={item.name}
                            to={item.path}
                            style={{ textDecoration: "none" }}
                        >
                            <Flex
                                align="center"
                                px="4"
                                py="3"
                                borderRadius="lg"
                                transition="0.2s"
                                _hover={{ bg: "teal.400", transform: "translateX(5px)" }}
                            >
                                <Icon as={item.icon} mr="3" color="black" />
                                <Text fontWeight="medium" color="black">{item.name}</Text>
                            </Flex>
                        </RouterLink>
                    ))}
                </Stack>

                {/* <Box bg="teal.500" h="auto" px="5" display="flex" py={"15px"} color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                    <Stack gap="3" px="0" py="0">
                        <Text color="white" fontWeight="medium">Need help?</Text>
                        <Text color="white" fontWeight="normal">Please Check Our Docs</Text>
                        <Button bg="white" w="full"> Documentation </Button>
                    </Stack>
                </Box> */}

                <HStack
                    w="100%"
                    mt={32}
                    px={1}
                    pt={4}
                    gap={2}
                    align="center"
                    borderTop="1px solid grey"
                >
                    <Box w={"25px"} h={"25px"} display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="gray.700"
                        borderRadius="md">
                        <Text>A</Text>
                    </Box>

                    <Box mr="auto">
                        <Text fontSize="sm" fontWeight="500" lineHeight="16px" color="black">
                            {profile.name || '-'}
                        </Text>
                        <Text fontSize="xs" color="black">
                            {userEmail}
                        </Text>
                    </Box>
                    <OptionsMenu />
                </HStack>

            </Stack>
        </Box>
    );
};

export default LeftSection;