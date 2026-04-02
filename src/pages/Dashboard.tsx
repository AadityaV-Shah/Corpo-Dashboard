import React from 'react';
import {
    Box,
    Flex,
    Container
} from "@chakra-ui/react";
import InfoNumbers from '@/components/Dashboard/InfoNumbers';
import Herobust from '@/components/Dashboard/Herobust';
import BarInfo from '@/components/Dashboard/BarInfo';

const Dashboard: React.FC = () => {
    return (
        <Box display="flex" w="full" overflow="hidden">
            <Flex w={"100%"} minH="100vh" flexDirection="column" bgColor="rgb(225, 226, 239)" flex="1" pb={5}>
                <Container maxW="100%" px={{ base: 3, md: 6 }}>
                    <InfoNumbers />
                    <Herobust />
                    <BarInfo />
                </Container>
            </Flex>
        </Box>
    )
}

export default Dashboard 