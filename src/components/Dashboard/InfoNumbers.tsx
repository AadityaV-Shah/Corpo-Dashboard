import { Box, HStack, Stack, Text, } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { FaFile } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const InfoNumbers = () => {
    return (
        <Box w={{ base: 'full', lg: 'full' }} h={{ base: 'auto', lg: '100px' }} gap="5" pt="10px" display={"flex"}
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent={{ base: "center", lg: "space-between" }}
            alignItems={{ base: "center", lg: "center" }}>

            <Box w={{ base: '100%', lg: '25%' }} px="5" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                <Stack gap="1">
                    <Text fontSize="14px" fontWeight="medium" color="gray">Todays Money</Text>
                    <Text fontSize="lg" fontWeight="bold">$53,000</Text>
                </Stack>
                <FaWallet size="30px" color="teal" />
            </Box>
            <Box w={{ base: '100%', lg: '25%' }} px="5" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                <Stack gap="1">
                    <Text fontSize="14px" fontWeight="medium" color="gray">Todays Users</Text>
                    <Text fontSize="lg" fontWeight="bold">2,300</Text>
                </Stack>
                <CiGlobe size="30px" color="teal" />
            </Box>
            <Box w={{ base: '100%', lg: '25%' }} px="5" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                <Stack gap="1">
                    <Text fontSize="14px" fontWeight="medium" color="gray">New Clients</Text>
                    <Text fontSize="lg" fontWeight="bold">+3,052</Text>
                </Stack>
                <FaFile size="30px" color="teal" />
            </Box>
            <Box w={{ base: '100%', lg: '25%' }} px="5" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                <Stack gap="1">
                    <Text fontSize="14px" fontWeight="medium" color="gray">Total Sales</Text>
                    <Text fontSize="lg" fontWeight="bold">$173,000</Text>
                </Stack>
                <FaShoppingCart size="30px" color="teal" />
            </Box>
        </Box>
    );
};

export default InfoNumbers

