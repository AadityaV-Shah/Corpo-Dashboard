import React, { useState, useEffect } from 'react';
import {
    Box,
    Stack,
    Text,
    Image,
    HStack,
    Container
} from "@chakra-ui/react";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
    IconButton
} from "@chakra-ui/react";
import { supabaseApi } from '@/api/supabase';
import { supabase } from '@/api/supabaseAdmin';
import { Menu as MenuIcon } from "lucide-react";
import { Box as Blox, Wrench } from "lucide-react";
import { HandFist } from "lucide-react";
import PlatSettings from '@/components/Profile/PlatSettings';
import ProfInfo from '@/components/Profile/ProfInfo';
import ProfConvo from '@/components/Profile/ProfConvo';
import ProfCard from '@/components/Profile/ProfCard';
import type { ProfInfoProps } from '@/components/Profile/ProfInfo';
import Teams from '@/pages/Teams';

interface ProfNavProps {
    image: React.ReactNode;
    name: string;
}

const ProvNavData: ProfNavProps[] = [
    {
        image: <Blox />,
        name: "Overview",
    },
    {
        image: <Wrench />,
        name: "Teams",
    },
    {
        image: <HandFist />,
        name: "Projects",
    },
]

const Profile1: React.FC = () => {

    const [activeTab, setActiveTab] = useState("Overview")
    const [userEmail, setUserEmail] = useState("");
    const [profile, setProfile] = useState<ProfInfoProps>({ pfp: "", name: "", phone: "", location: "", about: "" });

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            setUserEmail(session.user.email ?? "");

            const response = await supabaseApi.get(`/admin_profiles?id=eq.${session.user.id}`);
            if (response.data.length > 0) {
                const { pfp, name, phone, location, about } = response.data[0];
                setProfile({ pfp, name, phone, location, about });
            }
        };
        getUser();
    }, []);

    return (

        <Box minH={"100vh"} minW={"full"} bg={"rgb(225, 226, 239)"}>

            {/* Upper part of the profile (Name, email, navigation) */}
            <Box
                w="full"
                h="100px"
                bg='#11b798'
                position="relative"
                left={0}
                top={0}
                roundedBottom="xl"
            >
                <Box
                    position={"absolute"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"} // Changed from alignContent
                    h={"100px"}

                    /* RESPONSIVE WIDTH LOGIC */
                    w={{ base: "90%", md: "95%", lg: "1188px" }}
                    maxW="1188px"

                    /* CENTERING LOGIC */
                    top={50}
                    left="50%"
                    transform="translateX(-50%)"

                    p={4}
                    backdropFilter="blur(30px)"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    borderRadius="xl"
                    boxShadow="lg"
                >

                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={4}>
                        <Image src={profile.pfp} boxSize="70px" borderRadius="xl" display={{ base: 'block', md: 'block', lg: 'block' }} />
                        <Stack gap={0} alignContent={"center"} mt={2}>
                            <Text color={"black"} fontWeight={"medium"} fontSize={"20px"}>{profile.name || '-'}</Text>
                            <Text color={"grey"} fontSize={"15px"}>{userEmail}</Text>
                        </Stack>
                    </Box>


                    {/* Normal display on desktop */}
                    <HStack gap={8} mr={8} display={{ base: 'none', lg: 'flex' }}>
                        {ProvNavData.map((item) => (
                            <>
                                <Text
                                    key={item.name}
                                    onClick={() => setActiveTab(item.name)} // 3. Update state on click
                                    color={activeTab === item.name ? "white" : "black"} // 4. Dynamic styling
                                    bg={activeTab === item.name ? "black" : "white"}
                                    display={"flex"} gap={1} p={2} rounded={"xl"} cursor={"pointer"}
                                    transition='0.3s'

                                    _hover={{ color: 'white', bg: 'black', p: '2', transform: 'translateY(-2px)' }}
                                >
                                    {item.image}{item.name}
                                </Text>
                            </>
                        ))}
                    </HStack>

                    {/* Mobile Display */}
                    <Box display={{ base: "block", lg: "none" }} position={"relative"}>
                        <MenuRoot>
                            <MenuTrigger asChild>
                                <IconButton variant="outline" aria-label="Open Menu">
                                    <MenuIcon />
                                </IconButton>
                            </MenuTrigger>
                            <MenuContent borderRadius="xl" boxShadow="lg" p={2} bg={"white"} zIndex={2000} position={"absolute"} top={"-100%"} right={"110%"}>
                                {ProvNavData.map((item) => (
                                    <MenuItem
                                        value={item.name}
                                        key={item.name}
                                        onClick={() => setActiveTab(item.name)}
                                        cursor="pointer"
                                        borderRadius="lg"
                                        bg={activeTab === item.name ? "black" : "transparent"}
                                        color={activeTab === item.name ? "white" : "black"}
                                        _hover={{ bg: "gray.200", color: "black" }}
                                    >
                                        {item.image} {item.name}
                                    </MenuItem>
                                ))}
                            </MenuContent>
                        </MenuRoot>
                    </Box>

                </Box>
            </Box>

            {/* Profile components */}
            {activeTab === "Overview" && (
                <Container mt={"80px"}>
                    <Box
                        gridTemplateColumns={{ base: 'repeat(1fr)', md: 'repeat(1fr)', lg: 'repeat(4, 1fr)' }}
                        display={"flex"}
                        flexDirection={{ base: "column", md: "column", lg: 'row' }}
                        gap={3}
                        pb={{ base: '20px', md: 'none', lg: 'none' }}
                        zIndex={1000}
                    >
                        <PlatSettings />
                        <ProfInfo />
                        <ProfConvo />
                    </Box>
                </Container>
            )}


            {/* Profile Project Cards */}
            {activeTab === "Projects" && (
                <ProfCard />
            )}

            {/* Teams Card */}
            {activeTab === "Teams" && (
                <Teams />
            )}

        </Box>

    )
}

export default Profile1
