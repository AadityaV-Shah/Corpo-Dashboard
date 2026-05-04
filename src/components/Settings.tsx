import React, { useState } from 'react';
import {
    Stack,
    Text,
    Box,
    Container,
    HStack,
    Switch,
    SimpleGrid
} from "@chakra-ui/react";

interface SettingsProps {
    text?: string;
    subtext?: string;
    component?: React.ReactNode;
}

const SettingsR: React.FC<SettingsProps> = ({ text, subtext, component }) => {
    return (
        <Stack gap={2}>
            <SimpleGrid columns={2} gap={20}>

                <Stack gap={1} justify={"flex-start"}>
                    <Text color={"black"} fontSize={"xl"}>{text}</Text>
                    <Text color={"grey"} fontSize={"sm"}>{subtext}</Text>
                </Stack>

                {component}

            </SimpleGrid>
        </Stack>
    );
};

export default SettingsR