import React from 'react';
import {
    Box,
    Button,
    Stack,
    Text,
    Image,
    HStack,
    Container,
    SimpleGrid
} from "@chakra-ui/react";
import { Box as Blox, Wrench } from "lucide-react";
import { HandFist } from "lucide-react";
import { UserDataDetes } from "../data/UserData"
import PlatSettings from '@/components/PlatSettings';
import ProfInfo from '@/components/ProfInfo';
import ProfConvo from '@/components/ProfConvo';
import { ProfProjData } from "../data/ProfProj"

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
    return (
        <Box minH={"100vh"} minW={"full"} bg={"rgb(225, 226, 239)"}>
            <Box
                w="full"
                h="150px"
                bgImage="url('https://static.vecteezy.com/system/resources/previews/066/340/304/non_2x/abstract-bright-blue-gradient-green-background-trendy-wave-shapes-pattern-with-lines-background-colorful-design-vector.jpg')"
                position="relative"
                left={0}
                top={0}
                roundedBottom="xl"
            >
                <Box position={"absolute"} display={"flex"} justifyContent={"space-between"} alignContent={"center"} h={"100px"} w={"1188px"} p={4} rounded={"xl"} top={100} left={50} backdropFilter="blur(30px)"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    borderRadius="xl"
                    boxShadow="lg">

                    <Box display={"flex"} justifyContent={"space-between"} alignContent={"center"} gap={4}>
                        <Image src="/simon2.jpg" boxSize="70px" borderRadius="xl" />
                        <Stack gap={0} alignContent={"center"} mt={2}>
                            {UserDataDetes.map((item) => (
                                <>
                                    <Text color={"black"} fontWeight={"medium"} fontSize={"20px"}>{item.name}</Text>
                                    <Text color={"grey"} fontSize={"15px"}>{item.email}</Text>
                                </>
                            ))}
                        </Stack>
                    </Box>

                    <HStack gap={8} mr={8}>
                        {ProvNavData.map((item) => (
                            <>
                                <Text color={"black"} display={"flex"} gap={1}
                                    transition='0.3s'
                                    _hover={{ color: 'white', bg: 'black', p: '2', transform: 'translateY(-2px)', }}
                                    bg={"white"}
                                    p={2}
                                    rounded={"xl"}
                                    cursor={"pointer"}
                                >{item.image}{item.name}</Text>
                            </>
                        ))}
                    </HStack>

                </Box>
            </Box>

            <Container mt={"80px"}>
                <Box gridTemplateColumns={'repeat(3, 1fr)'} display={"flex"} gap={3}>
                    <PlatSettings />
                    <ProfInfo />
                    <ProfConvo />
                </Box>
            </Container>

            <Container mt={"40px"} mb={"40px"}>
                <Stack p={5} bg={"white"} rounded={'xl'}>
                    <Text fontWeight={"bold"} fontSize={"xl"} color={"black"}>Projects</Text>
                    <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>Architects Design Houses</Text>

                    {/* Use SimpleGrid for easy responsive columns */}
                    <SimpleGrid columns={[1, 2, 4]} gap={3} my={4}>
                        {/* 1. Only map the first 3 items to keep the 4th slot open */}
                        {ProfProjData.slice(0, 3).map((item, index) => (
                            <Stack
                                key={index}
                                align={"flex-start"}
                                gap={4}
                                bg={"white"}
                                p={5}
                                rounded={"xl"}
                                shadow="sm"
                            >
                                <Image
                                    src={item.image}
                                    w={"full"}
                                    h={"200px"}
                                    objectFit="cover"
                                    borderRadius="md"
                                    alt={item.name1}
                                />
                                <Stack gap={1}>
                                    <Text fontSize={"sm"} color={"grey"}>{item.name1}</Text>
                                    <Text fontSize={"xl"} color={"black"} fontWeight={'bold'} lineHeight={'short'}>
                                        {item.name2}
                                    </Text>
                                </Stack>
                                <Text fontSize={"sm"} color={"grey"} h={'60px'}>
                                    {item.detail}
                                </Text>
                                <Button border={"1px teal solid"} bg={'white'} color={'teal'} _hover={{ bg: 'teal.50' }} w={'full'} focusRing={'none'}>
                                    View All
                                </Button>
                            </Stack>
                        ))}

                        {/* 2. The Custom 4th Box (Now sits perfectly in the last column) */}
                        <Stack
                            align={"center"}
                            justify={"center"}
                            border={"2px dashed"}
                            borderColor={"gray.800"}
                            rounded={"xl"}
                            p={5}
                            transition="all 0.2s"
                            cursor="pointer"
                            _hover={{ bg: "gray.50", borderColor: "teal.300" }}
                        >
                            <Text color={'black'} fontSize={'4xl'} lineHeight="1">+</Text>
                            <Text color={'black'} fontSize={'md'} fontWeight="bold" textAlign="center">
                                Create a New Project
                            </Text>
                        </Stack>
                    </SimpleGrid>
                </Stack>
            </Container>
        </Box>

    )
}

export default Profile1