import { Box, Flex, HStack, Stack, Image, Text, Button, Link } from "@chakra-ui/react";
import { LayoutDashboard, User, PencilLine, WalletMinimal, ArrowRight } from "lucide-react";
import { Input, Group, InputElement } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react"
import { FaWallet } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { FaFile } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const Herobust = () => {
    return (
        <HStack mt="5" gap="5">
            <Box w="50%" gap={1} h="300px" px="5" display="flex" py="5" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="top" justifyItems="center">
                <Stack>
                    <Text fontSize="sm" color="gray" fontWeight="medium">Built By Traders, For Traders</Text>
                    <Text fontSize="lg" fontWeight="bold">Learn to Trade from Millionaire Mentors</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, animi?</Text>
                    <br></br>
                    <Button borderWidth="2px" borderColor="orange" mx="25px" bgColor="Orange" color="white" fontWeight="bold">Start Trading Today <ArrowRight /> </Button>
                </Stack>
                <Box>
                    <Image src="https://cdn.corporatefinanceinstitute.com/assets/money-2.jpeg" borderRadius="xl" w="full" h="full" overflow="hidden" />
                </Box>
            </Box>

            <Box w="50%" h="300px" px="5" display="flex" py="5" bg="whiteAlpha/700" color="white" borderRadius="xl" justifyContent="space-between" alignItems="top" bgImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cloudinary.hbs.edu/hbsit/image/upload/s--5YPcmM0m--/f_auto,c_fill,h_375,w_750,/v20200101/681DA2E060F4CEE9AA1C606DE6117A9E.jpg')" bgSize="cover">
                <Stack>
                    <Text fontSize="40px" fontWeight="bold">Work with the best</Text>
                    <Text w="75%">Learn to trade stocks, crypto, forex, and options from professional
                        traders. Join 50,000+ students building wealth through financial
                        education.</Text>
                </Stack>
            </Box>

        </HStack>
    );
};

export default Herobust