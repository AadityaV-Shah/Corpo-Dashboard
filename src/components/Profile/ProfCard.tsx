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
import { ProfProjData } from '@/data/ProfProj';


const ProfCard: React.FC = () => {
    return (

        <Container mt={"80px"} mb={"40px"}>
            <Stack p={5} bg={"white"} rounded={'xl'}>
                <Text fontWeight={"bold"} fontSize={"xl"} color={"black"}>Projects</Text>
                <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>Architects Design Houses</Text>

                {/* Use SimpleGrid for easy responsive columns */}
                <SimpleGrid gridTemplateColumns={{ base: 'repeat(1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4} my={4}>
                    {/* 1. Only map the first 3 items to keep the 4th slot open */}
                    {ProfProjData.slice(0, 3).map((item, index) => (
                        <Stack
                            key={index}
                            align={"flex-start"}
                            gap={4}
                            bg={"white"}
                            p={5}
                            rounded={"xl"}
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
                            <Text fontSize={"sm"} color={"grey"} minH={'60px'} pb={4}>
                                {item.detail}
                            </Text>
                            <Button border={"1px teal solid"} bg={'white'} color={'green'} _hover={{ bg: 'teal.50' }} w={'full'} focusRing={'none'}>
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
    )
}

export default ProfCard