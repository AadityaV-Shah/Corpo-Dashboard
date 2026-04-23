import React, { useState, useEffect } from 'react';
import { Box, Text, Container, Card, Grid, Stack, Image, Dialog, Button, Flex } from "@chakra-ui/react";

interface DialogProps {
    open?: boolean;
    onClose: () => void;
    title?: string;
    text?: string;
    button1?: React.ReactNode;
    button2?: React.ReactNode;
}

const DialogBox: React.FC<DialogProps> = ({ open, onClose, title, text, button1, button2 }) => {

    return (

        <Dialog.Root
            open={open}
            onOpenChange={(details) => !details.open && onClose() }
            placement="top"
            motionPreset="slide-in-bottom"
        >
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content 
                bg="gray.800" 
                color="white"
                >
                    <Dialog.Header>
                        <Dialog.Title fontSize="xl">{title}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>

                        <Text fontSize={"md"} lineHeight={"tall"}>{text}</Text>

                        <Flex justify={"space-between"} mt={7} gap={5}>

                            {button1} {button2}

                        </Flex>

                    </Dialog.Body>
                    <Dialog.CloseTrigger />
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>

    );
};

export default DialogBox