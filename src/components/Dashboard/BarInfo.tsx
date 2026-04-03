import { Box, Flex, HStack, Stack, Image, Text, } from "@chakra-ui/react";
import { FaToolbox, } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import BarChart from "./BarChart";
import LineChartz from "./LineChartz";

const BarInfo = () => {
    return (
        <Box display={"flex"} flexDirection={{ base: 'column', lg: 'row' }} alignItems="center" gap={5} justifyContent={{ base: "center", lg: "space-between" }}>

            {/* Bar chart section */}

            <Box w={{ base: '100%', lg: '50%' }} h="auto" mt="8" px="5" py="5" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center" boxShadow={"lg"}>
                <Stack gap="4">
                    <BarChart />
                    <Box mt="2">
                        <Text fontWeight="bold" fontSize="xl">Active Users</Text>
                        <HStack>
                            <Text color="green" fontWeight="medium"> (+23) </Text> <Text fontWeight="medium"> than last week </Text>
                        </HStack>
                    </Box>

                    <HStack w="full" h="auto" gap="1" pt="5px" justifyContent="space-between" overflow={"hidden"}>
                        <Stack w="25%" px="5" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                            <HStack gap="2">
                                <FiUsers size="20px" color="teal" />
                                <Text fontSize="sm" fontWeight="medium" color="grey">Users</Text>
                            </HStack>
                            <Text fontSize="lg" fontWeight="bold">32,000</Text>
                        </Stack>

                        <Stack w="25%" px="2" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                            <HStack gap="2">
                                <FaRocket size="20px" color="teal" />
                                <Text fontSize="sm" fontWeight="medium" color="grey">Clicks</Text>
                            </HStack>
                            <Text fontSize="lg" fontWeight="bold">2,43 M</Text>
                        </Stack>

                        <Stack w="25%" px="2" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                            <HStack gap="2">
                                <FaShoppingCart size="20px" color="teal" />
                                <Text fontSize="sm" fontWeight="medium" color="grey">Sales</Text>
                            </HStack>
                            <Text fontSize="lg" fontWeight="bold">$2,400</Text>
                        </Stack>

                        <Stack w="25%" px="2" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                            <HStack gap="2">
                                <FaToolbox size="20px" color="teal" />
                                <Text fontSize="sm" fontWeight="medium" color="grey">Items</Text>
                            </HStack>
                            <Text fontSize="lg" fontWeight="bold">320</Text>
                        </Stack>
                    </HStack>
                </Stack>
            </Box>

            {/* Line chart section */}

            <Box w={{ base: '100%', lg: '50%' }} h={{ base: 'auto', lg: '590px' }} mt="8" px="5" py="5" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center" boxShadow={"lg"}>
                <Stack gap={1}>
                    <Text fontSize={20} fontWeight={"bold"}>Sales Overview</Text>
                    <HStack><Text color={"green"} fontWeight={"bold"}>(+5) more</Text><Text color={"grey"}>in 2021</Text></HStack>
                </Stack>
                <LineChartz />
            </Box>
        </Box>
    );
};

export default BarInfo;