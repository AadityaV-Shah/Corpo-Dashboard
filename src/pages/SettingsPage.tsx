import React, { useState } from 'react';
import {
    Stack,
    Text,
    Box,
    Container,
    HStack,
    Switch
} from "@chakra-ui/react";
import SettingsR from '@/components/Settings';

interface SettingsPageProps {
    text?: string;
    subtext?: string;
    component?: React.ReactNode;
}

const SettingsPage = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotif, setIsNotif] = useState(true);

    const settingsData: SettingsPageProps[] = [
    {
        text: "Dark Theme", 
        subtext: "Turn on for Dark mode. Turn off for Light mode.",
        component:
            <Switch.Root colorPalette={"green"} size={"lg"} 
            checked={isDarkMode} 
            onChange={() => setIsDarkMode(!isDarkMode)}>
                <Switch.HiddenInput />
                <Switch.Control />
                <Switch.Label />
            </Switch.Root>
    },
    {
        text: "Notifications", 
        subtext: "Enable notifications to be up to date with whats happening",
        component:
            <Switch.Root colorPalette={"green"} size={"lg"} 
            checked={isNotif} 
            onChange={() => setIsNotif(!isNotif)}>
                <Switch.HiddenInput />
                <Switch.Control />
                <Switch.Label />
            </Switch.Root>
    },
]

    return (
        <Box minH={"100vh"} w={"100%"} bg={"rgb(225, 226, 239)"} pt={5}>
            <Container maxW="container.xl">
                <Stack gap={7} alignContent={"flex-start"}>
                    <Text fontSize={"3xl"} color={"black"}>Settings</Text>

                    {settingsData.map((item, index) => (
                        <SettingsR
                            key={index}
                            // text={item.text}
                            // subtext={item.subtext}
                            // component={item.component}
                            {...item}
                        />
                    ))}

                </Stack>
            </Container>
        </Box>
    );
};

export default SettingsPage
