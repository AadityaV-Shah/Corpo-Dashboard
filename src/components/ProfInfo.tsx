import React, { useState } from 'react';
import {
    Stack,
    Text,
    HStack,
    Box
} from "@chakra-ui/react";
import { ProfInfoData } from "../data/ProfInfo"
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';


const ProfInfo: React.FC = () => {
    return (
        <Stack alignContent={"flex-start"} gap={5} bg={"white"} p={5} rounded={"xl"} w={"100%"}>
            <Text fontWeight={"medium"} color={"black"} fontSize={"xl"}>Profile Information</Text>

            <Stack alignContent={"flex-start"} gap={2} borderBottom={"1px solid grey"} pb={4}>

                <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"} lineHeight={"tall"}>A motivated and detail-oriented individual with a passion for continuous learning and growth. Skilled at adapting to new challenges and working effectively in team environments. Committed to delivering high-quality results and maintaining a strong work ethic.</Text>

            </Stack>

            {ProfInfoData.map((item) => (
                <>
                    <HStack><Text color={"black"} fontWeight={"medium"}>Full Name:</Text><Text color={"grey"}>{item.name}</Text></HStack>
                    <HStack><Text color={"black"} fontWeight={"medium"}>Phone:</Text><Text color={"grey"}>{item.phone}</Text></HStack>
                    <HStack><Text color={"black"} fontWeight={"medium"}>Email:</Text><Text color={"grey"}>{item.email}</Text></HStack>
                    <HStack><Text color={"black"} fontWeight={"medium"}>Location:</Text><Text color={"grey"}>{item.location}</Text></HStack>
                    <HStack><Text color={"black"} fontWeight={"medium"}>Socials:</Text> <Box css={{ color: 'grey', fontSize: 'xl' }} display={"flex"} gap={3}><FaFacebook /><FaInstagram /><FaLinkedin /><FaGithub /></Box></HStack>
                </>
            ))}
        </Stack>
    )
}

export default ProfInfo