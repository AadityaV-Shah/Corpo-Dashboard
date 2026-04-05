import { Box, Flex, HStack, Stack, Image, Text, Button, Link } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import CButton from "@/components/Button";

const Herobust = () => {
    return (
        <Box mt="5" gap="5" h={{ base: 'auto' }} display={"flex"} flexDirection={{ base: 'column', lg: 'row' }} justifyContent={{ base: "center", lg: "space-between" }}>

            {/* LG SIZE herobust */}
            <Box w={{ base: '100%', sm: '100%', md: '100%', lg: '50%' }} gap={1} h="300px" px="5" display={{ base: 'none', md: 'none', lg: 'flex' }} py="5" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="top" justifyItems="center">
                <Stack>
                    <Text fontSize="sm" color="gray" fontWeight="medium">Built By Traders, For Traders</Text>
                    <Text fontSize="lg" fontWeight="bold">Learn to Trade from Millionaire Mentors</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, animi?</Text>
                    <br></br>

                    <CButton
                        label="Start Trading Today"
                        variant="primary"
                        size="md"
                        rightIcon={<ArrowRight />}
                        fullWidth={true}
                        loading={false}
                        style={{ width: '290px' }}
                    />

                </Stack>
                <Box>
                    <Image src="https://cdn.corporatefinanceinstitute.com/assets/money-2.jpeg" borderRadius="xl" w="full" h="full" overflow="hidden" />
                </Box>
            </Box>

            {/* BASE SIZE herobust */}
            <Box
                w={{ base: '100%', lg: '50%' }}
                gap={4}
                px="5"
                py="5"
                display={{ base: 'flex', lg: 'none' }}
                flexDirection="column"
                bg="white"
                color="black"
                borderRadius="xl"
                justifyContent="space-between"
                alignItems="center"
            >
                <Image
                    src="https://cdn.corporatefinanceinstitute.com/assets/money-2.jpeg"
                    borderRadius="xl"
                    w="full"
                    h="auto"
                />

                <Stack w="full" gap={2}>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                        Built By Traders, For Traders
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                        Learn to Trade from Millionaire Mentors
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, animi?
                    </Text>

                    <Button borderWidth="2px" borderColor="orange" mx="25px" bgColor="Orange" color="white" fontWeight="bold">Start Trading Today <ArrowRight /> </Button>

                </Stack>
            </Box>

            <Box w={{ base: '100%', sm: '100%', md: '100%', lg: '50%' }} h="300px" px="5" display="flex" py="5" bg="whiteAlpha/700" color="white" borderRadius="xl" justifyContent="space-between" alignItems="top" bgImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cloudinary.hbs.edu/hbsit/image/upload/s--5YPcmM0m--/f_auto,c_fill,h_375,w_750,/v20200101/681DA2E060F4CEE9AA1C606DE6117A9E.jpg')" bgSize="cover">
                <Stack>
                    <Text fontSize="40px" fontWeight="bold">Work with the best</Text>
                    <Text w="75%">Learn to trade stocks, crypto, forex, and options from professional
                        traders. Join 50,000+ students building wealth through financial
                        education.</Text>
                </Stack>
            </Box>

        </Box>
    );
};

export default Herobust