// components/AboutCard.tsx
import React from "react";
import { Box, Text, Image, Stack, HStack } from "@chakra-ui/react";

interface AboutCardProps {
    title: string;
    description: string;
    imageSrc: string;
    imagePosition?: "left" | "right";
}

const AboutCard: React.FC<AboutCardProps> = ({ title, description, imageSrc, imagePosition = "right" }) => {
    const imageBox = (
        <Box h={"auto"} w={"300px"} flexShrink={0}>
            <Image src={imageSrc} w={"full"} h={"full"} rounded={"xl"} objectFit="cover" />
        </Box>
    );

    const textBlock = (
        <Stack>
            <Text fontWeight={"medium"} color={"black"} fontSize={"3xl"} lineHeight={"normal"} mt={3}>{title}</Text>
            <Text color={"black"} lineHeight={"taller"}>{description}</Text>
        </Stack>
    );

    return (
        <>
            {/* LG view */}
            <HStack justifyContent={"space-between"} alignItems={"center"} p={10} bgColor={"rgb(210, 212, 230)"} rounded={"xl"}  gap={7} display={{ base: 'none', md: 'none', lg: 'flex' }}>
                {imagePosition === "left" ? <>{imageBox}{textBlock}</> : <>{textBlock}{imageBox}</>}
            </HStack>

            {/* SM/MD view */}
            <Stack justifyContent={"center"} alignItems={"center"} p={10} bgColor={"rgb(210, 212, 230)"} rounded={"xl"} display={{ base: 'flex', md: 'flex', lg: 'none' }}>
                {imageBox}
                {textBlock}
            </Stack>
        </>
    );
};

export default AboutCard;