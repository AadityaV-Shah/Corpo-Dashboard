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
                bgImage="linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/designMentor2.webp')"
                bgSize="cover"
                borderRadius="xl"
                position={"relative"}
                fontFamily={"poppins"}>

                <Box w="full" h={"auto"} justifyItems={"center"} position={"relative"}>
                    <Image src={image} objectFit="contain" borderRadius="full"/>
                </Box>

                <Stack w={"full"} align={"center"} gap={3}>
                    <Text fontSize={"22px"} fontWeight={"bold"}>{name}</Text>
                    <Text fontSize={"16px"} fontWeight={"medium"}>{role}</Text>
                    <Text fontSize={"16px"} bg={"red.400"} p={2} rounded={"xl"} cursor={"pointer"} fontWeight={"medium"}>{work}</Text>
                    <Text fontSize={"15px"} fontWeight={"medium"}>{depart}</Text>
                </Stack>

                <Dialog.Root
                    open={dialogOpen}
                    onOpenChange={(details) => setDialogOpen(details.open)}
                    placement="top"
                    motionPreset="scale"
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