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
                    <Text textAlign="center" fontSize="sm" color="grey" _hover={{ color: "black", cursor: "default", _before: { width: '100%' } }} position={"relative"} cursor={'pointer'}
                        _before={{ content: '""', position: 'absolute', bottom: '0', left: '0', h: '1px', bg: 'black', w: '0%', transition: 'width 0.4s ease' }}
                    >
                        Terms & Conditions
                    </Text>
                    <Text textAlign="center" fontSize="sm" color="grey" _hover={{ color: "black", cursor: "default", _before: { width: '100%' } }} position={"relative"} cursor={'pointer'}
                        _before={{ content: '""', position: 'absolute', bottom: '0', left: '0', h: '1px', bg: 'black', w: '0%', transition: 'width 0.4s ease' }}
                    >
                        Privacy Policy
                    </Text>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer