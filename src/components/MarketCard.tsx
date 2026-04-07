import type { FC, SVGProps } from 'react'
import { Box, Text, Container, Card, Grid, Stack, Icon } from "@chakra-ui/react";

interface MarketCardProps {
    iconic?: FC<SVGProps<SVGSVGElement>>;
    title?: string;
    detail?: string;
    bgimage?: string;
    boxsize?: string;
}

const MarketCard: React.FC<MarketCardProps> = ({ iconic: Iconic, title, detail, bgimage, boxsize }) => {
    return (
        <Card.Root borderRadius="xl">
            <Card.Body display="flex"
                flexDirection="column"
                gap={"5"} // Using pixel values to see a clear difference
                bgImage={bgimage}
                bgSize="cover"
                borderRadius="xl"
                position={"relative"}
                fontFamily={"poppins"}>

                <Box
                    w="full"
                    h="auto"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                >
                    <Icon boxSize={boxsize}>{Iconic && <Iconic />}</Icon>
                </Box>

                <Stack w={"full"} align={"center"} gap={3}>
                    <Text fontSize={"25px"}>{title}</Text>
                    <Text fontSize={"16px"}>{detail}</Text>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
};

export default MarketCard