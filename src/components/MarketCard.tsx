import React, { useState, useEffect } from 'react';
import type { FC, SVGProps } from 'react'
import { Box, Text, Card, Stack, Icon, Dialog } from "@chakra-ui/react";
import CButton from './Button';

interface MarketCardProps {
    iconic?: FC<SVGProps<SVGSVGElement>>;
    title?: string;
    detail?: string;
    bgimage?: string;
    boxsize?: string;
    textcolor?: string;
    xdetail?: string;
}

const MarketCard: React.FC<MarketCardProps> = ({ iconic: Iconic, title, detail, bgimage, boxsize, textcolor, xdetail }) => {

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Card.Root borderRadius="xl">
            <Card.Body display="flex"
                flexDirection="column"
                gap={"5"} // Using pixel values to see a clear difference
                bgImage={bgimage}
                bgSize="cover"
                borderRadius="xl"
                position={"relative"}
                fontFamily={"poppins"}
                py={5}
            >

                <Box
                    w="full"
                    h="auto"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                >
                    <Icon boxSize={boxsize} color={textcolor}>{Iconic && <Iconic />}</Icon>
                </Box>

                <Stack w={"full"} align={"center"} gap={3}>
                    <Text fontSize={"2xl"} fontWeight={"bold"} color={textcolor}>{title}</Text>
                    <Text fontSize={"base"} fontWeight={"medium"} color={textcolor}>{detail}</Text>
                </Stack>

                <Dialog.Root
                    open={dialogOpen}
                    onOpenChange={(xdetail) => setDialogOpen(xdetail.open)}
                    placement="top"
                    motionPreset="scale"
                >

                    <CButton
                        label='Details'
                        variant={"dark"}
                        onClick={() => setDialogOpen(true)}
                    />

                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content 
                        bg="gray.800" 
                        color="white"
                        bgImage="url('/designMentor2.webp')"
                        >
                            <Dialog.Header>
                                <Dialog.Title fontSize="xl">Details for {title}</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>

                                <Text fontSize={"md"} lineHeight={"tall"}>{xdetail}</Text>

                            </Dialog.Body>
                            <Dialog.CloseTrigger />
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>

            </Card.Body>
        </Card.Root>
    );
};

export default MarketCard