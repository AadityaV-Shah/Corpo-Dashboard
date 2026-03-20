import React from 'react';
import { Box, Flex, Text, VStack, HStack } from '@chakra-ui/react';

const BarChart = () => {
    // Data for the bars (representing height in pixels or percentage)
    const data = [330, 230, 120, 300, 520, 420, 480, 300, 160];
    const yAxisLabels = ['500', '400', '300', '200', '120', '0'];

    return (
        <Box
            w="full"
            maxW="full"
            bg="linear-gradient(to bottom right, #1a1c3a, #0d0e1f)"
            p={8}
            borderRadius="2xl"
        >
            <HStack align="flex-end" gap="6" h="300px">

                {/* Y-Axis Labels */}
                <VStack
                    justify="space-between"
                    h="full"
                    align="flex-start"
                    pr={4}
                    color="gray.400"
                    fontSize="xs"
                    fontWeight="bold"
                >
                    {yAxisLabels.map((label) => (
                        <Text key={label}>{label}</Text>
                    ))}
                </VStack>

                {/* Bars Container */}
                <Flex
                    flex={1}
                    h="full"
                    align="flex-end"
                    justify="space-around"
                    pb="4px" // Offset for baseline alignment
                >
                    {data.map((value, index) => (
                        <Box
                            key={index}
                            w="12px"               // Thin, elegant bars
                            h={`${(value / 520) * 100}%`} // Percentage height relative to max
                            bg="white"
                            borderRadius="full"    // Fully rounded (capsule shape)
                            transition="all 0.3s ease-in-out"
                            _hover={{
                                bg: "blue.200",
                                transform: "scaleX(1.2)",
                                cursor: "pointer"
                            }}
                        />
                    ))}
                </Flex>
            </HStack>
        </Box>
    );
};

export default BarChart;