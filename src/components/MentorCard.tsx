import React, { useState, useEffect } from 'react';
import { Box, Text, Container, Card, Grid, Stack, Image, Dialog, Button } from "@chakra-ui/react";
import CButton from './Button';

interface MentorCardProps {
    image?: string;
    name?: string;
    role?: string;
    work?: string;
    depart?: string;
    bgimage?: string;
    detail?: string;
}

const MentorCard: React.FC<MentorCardProps> = ({ image, name, role, work, depart, bgimage, detail }) => {

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Card.Root borderRadius="xl">
            <Card.Body display="flex"
                flexDirection="column"
                gap={"5"} // Using pixel values to see a clear difference
                bgImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/designMentor.jpg')"
                bgSize="cover"
                borderRadius="xl"
                position={"relative"}
                fontFamily={"poppins"}>

                <Box w="full" h={"auto"} justifyItems={"center"} position={"relative"}>
                    <Image src={image} objectFit="contain" borderRadius="full" />

                    {/* The Overlay - Now sits directly on top and listens for its own hover */}
                    <Box
                        position="absolute"
                        top="0"
                        left="-6"
                        w={{ base: '300px', lg: '390px' }}
                        h="auto"
                        display="flex"
                        alignItems="center"
                        p="2"
                        justifyContent="center"
                        bg="rgba(0,0,0,0.7)" // Semi-transparent black
                        color="white"
                        borderRadius="xl"
                        cursor="pointer"
                        opacity="0"
                        zIndex="10" // Force it to the front
                        transition="opacity 0.2s ease-in-out"
                        _hover={{ opacity: 1 }} // Direct hover trigger
                    >
                        {detail}
                    </Box>
                </Box>

                <Stack w={"full"} align={"center"} gap={3}>
                    <Text fontSize={"22px"}>{name}</Text>
                    <Text fontSize={"16px"}>{role}</Text>
                    <Text fontSize={"16px"} bg={"red.400"} p={2} rounded={"xl"} cursor={"pointer"}>{work}</Text>
                    <Text fontSize={"15px"}>{depart}</Text>
                </Stack>

                <Dialog.Root
                    open={dialogOpen}
                    onOpenChange={(details) => setDialogOpen(details.open)}
                    placement="top"
                    motionPreset="slide-in-bottom"
                >

                    <CButton
                        label='Details'
                        variant={"secondary"}
                        onClick={() => setDialogOpen(true)}
                    />

                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content bg="gray.800" color="white">
                            <Dialog.Header>
                                <Dialog.Title fontSize="xl">Details for {name}</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>

                                <Text fontSize={"md"} lineHeight={"tall"}>{detail}</Text>

                            </Dialog.Body>
                            <Dialog.CloseTrigger />
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>

            </Card.Body>
        </Card.Root>
    );
};

export default MentorCard