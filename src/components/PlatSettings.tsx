"use client"

import React, { useState } from 'react';
import {
    Stack,
    Text,
    HStack,
    Switch
} from "@chakra-ui/react";

const PlatSettings: React.FC = () => {

    const [settings, setSettings] = useState({
        follows: true,
        launches: true,
        newsletter: true,
    });

    // Update function
    const handleToggle = (key: string, val: boolean) => {
        setSettings((prev) => ({ ...prev, [key]: val }));
    };

    return (
        <Stack alignContent={"flex-start"} gap={4} bg={"white"} p={5} rounded={"xl"} w={"100%"}>
            <Text fontWeight={"medium"} color={"black"} fontSize={"xl"}>Platform Settings</Text>

            <Stack alignContent={"flex-start"} gap={2}>
                <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>Account</Text>
                <HStack gap={2}>
                    <Switch.Root colorPalette={"green"} size={"lg"}>
                        <Switch.HiddenInput />
                        <Switch.Control />
                        <Switch.Label />
                    </Switch.Root>
                    <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>Email me when someone follows me</Text>
                </HStack>
                <HStack gap={2}>
                    <Switch.Root colorPalette={"green"} size={"lg"}
                        checked={settings.follows}
                        onCheckedChange={(e) => handleToggle('follows', e.checked)}
                    >
                        <Switch.HiddenInput />
                        <Switch.Control />
                        <Switch.Label />
                    </Switch.Root>
                    <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>Email me when someone answers on my post</Text>
                </HStack>
                <HStack gap={2}>
                    <Switch.Root colorPalette={"green"} size={"lg"}>
                        <Switch.HiddenInput />
                        <Switch.Control />
                        <Switch.Label />
                    </Switch.Root>
                    <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>Email me when someone mentions me</Text>
                </HStack>
            </Stack>

            <Stack alignContent={"flex-start"} gap={3}>
                <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>Application</Text>
                <HStack gap={2}>
                    <Switch.Root colorPalette={"green"} size={"lg"}
                        checked={settings.launches}
                        onCheckedChange={(e) => handleToggle('launches', e.checked)}
                    >
                        <Switch.HiddenInput />
                        <Switch.Control />
                        <Switch.Label />
                    </Switch.Root>
                    <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>New launches and projects</Text>
                </HStack>
                <HStack gap={2}>
                    <Switch.Root colorPalette={"green"} size={"lg"}>
                        <Switch.HiddenInput />
                        <Switch.Control />
                        <Switch.Label />
                    </Switch.Root>
                    <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>Monthly Product Updates</Text>
                </HStack>
                <HStack gap={2}>
                    <Switch.Root colorPalette={"green"} size={"lg"}
                        checked={settings.newsletter}
                        onCheckedChange={(e) => handleToggle('newsletter', e.checked)}
                    >
                        <Switch.HiddenInput />
                        <Switch.Control />
                        <Switch.Label />
                    </Switch.Root>
                    <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>Subscribe to newsletter</Text>
                </HStack>
            </Stack>

        </Stack>
    )
}

export default PlatSettings