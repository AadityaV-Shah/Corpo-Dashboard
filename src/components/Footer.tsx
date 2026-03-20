import { Box, Container, Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box w="full" bg="rgb(225, 226, 239)" borderTop={"1px solid grey"}>
            <Container px={8} py={6} display="flex" justifyContent="space-between">
                <Box>
                    <Text textAlign="center" fontSize="sm" color="#000000">
                        © {new Date().getFullYear()} TradeMasterPro. All rights reserved.
                    </Text>
                </Box>
                <Box gap="30px" display="flex">
                    <Text textAlign="center" fontSize="sm" color="#000000" _hover={{ color: "grey", cursor: "default" }}>
                        Terms & Conditions
                    </Text>
                    <Text textAlign="center" fontSize="sm" color="#000000" _hover={{ color: "grey", cursor: "default" }}>
                        Privacy Policy
                    </Text>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer