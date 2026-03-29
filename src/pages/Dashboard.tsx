import React from 'react';
import {
    Box,
    Flex,
} from "@chakra-ui/react";
import InfoNumbers from '@/components/Dashboard/InfoNumbers';
import Herobust from '@/components/Dashboard/Herobust';
import BarInfo from '@/components/Dashboard/BarInfo';

const Dashboard: React.FC = () => {
    return (
        <Box display="flex">
            <Flex w="full" h="full" flexDirection="column" bgColor="rgb(225, 226, 239)" flex="1" px="15px" pb={5}>
                <InfoNumbers />
                <Herobust />
                <BarInfo />
            </Flex>
        </Box>
    )
}

export default Dashboard 