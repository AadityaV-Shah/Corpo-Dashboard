import React, { useState, useEffect } from 'react';
import { Box, Text, Container, Card, Grid, Flex, Stack } from "@chakra-ui/react";
import { Check } from "lucide-react";
import { tiers } from "../data/pricing";
import CButton from "@/components/Button";
import DialogBox from '@/components/DialogBox';
import { toaster, Toaster as UIToaster } from '@/components/ui/toaster';

const Pricing = () => {

    const [selectedTier, setSelectedTier] = useState<string | null>(null);

    return (
        <Box minH={"100vh"} w={"100%"} bg={"rgb(225, 226, 239)"} pt={5} pb={{ base: '20px' }}>
            <Container maxW="container.xl">
                <Grid templateColumns={{ sm: 'repeat(1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                    {tiers.map((item, index) => (
                        <Card.Root key={item.title} border="none">
                            <Card.Body
                                display="flex"
                                flexDirection="column"
                                gap={index === 1 ? "15px" : "15px"}
                                bg={"#102271"}
                                p={6}
                                borderRadius="xl"
                                position={"relative"}
                                fontFamily={"poppins"}
                            >
                                <Stack gap={3}>
                                    <Card.Title color="white" fontSize="xl">{item.title}</Card.Title>
                                    <Card.Description display={"flex"} alignItems={"baseline"} gap={1} color={"whiteAlpha.800"}>
                                        <Text fontSize={"3xl"} fontWeight="bold" color="white">{item.price}</Text>
                                        <Text fontSize="sm">/ month</Text>
                                    </Card.Description>
                                </Stack>

                                <Box borderY="1px solid" borderColor="whiteAlpha.300" py={5} flex="1">
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        {item.description.map((desc, i) => (
                                            <Flex key={i} align="center" gap={3} mb={3}>
                                                <Check size={18} color="#32CD32" />
                                                <Text color="white" fontSize="sm">{desc}</Text>
                                            </Flex>
                                        ))}
                                    </ul>
                                </Box>

                                {/* <Button
                                    width="full"
                                    bg={index === 1 ? "orange.400" : "whiteAlpha.200"}
                                    _hover={{ bg: index === 1 ? "orange.600" : "whiteAlpha.400" }}
                                    color={index === 1 ? "white" : "white"}
                                >
                                    {item.buttonText}
                                </Button> */}

                                <CButton
                                    label={item.buttonText}
                                    variant={index === 1 ? "secondary" : "primary"}
                                    onClick={() => setSelectedTier(item.title)}
                                />

                                {index === 1 && (
                                    <Box
                                        position="absolute"
                                        top="-10px"
                                        left="60%"
                                        bg="orange.400"
                                        px={4}
                                        py={1}
                                        borderRadius="full"
                                        fontSize="xs"
                                        fontWeight="bold"
                                        color="white"
                                        boxShadow="lg"
                                    >
                                        MOST POPULAR
                                    </Box>
                                )}
                            </Card.Body>
                        </Card.Root>
                    ))}
                </Grid>
            </Container>

            <DialogBox
                open={selectedTier !== null}
                onClose={() => setSelectedTier(null)}
                title={selectedTier ?? ''}
                text={`Are you sure you would like the ${selectedTier} plan?`}  // ✅ fixed template literal
                button1={
                    <CButton
                        label='Cancel'
                        variant='primary'
                        fullWidth={true}
                        onClick={() => setSelectedTier(null)}  
                    />
                }
                button2={
                    <CButton
                        label='Save'
                        variant='secondary'
                        fullWidth={true}
                        onClick={() => {
                            toaster.create({
                                title: "Success",
                                description: "Plan updated successfully",
                                type: 'success'
                            });
                            setSelectedTier(null);
                        }}
                    />
                }
            />

            <UIToaster />

        </Box>
    );
};

export default Pricing;