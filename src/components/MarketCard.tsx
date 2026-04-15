import type { FC, SVGProps } from 'react'
import { Box, Text, Card, Stack, Icon } from "@chakra-ui/react";

interface MarketCardProps {
    iconic?: FC<SVGProps<SVGSVGElement>>;
    title?: string;
    detail?: string;
    bgimage?: string;
    boxsize?: string;
    textcolor?: string;
}

const MarketCard: React.FC<MarketCardProps> = ({ iconic: Iconic, title, detail, bgimage, boxsize, textcolor }) => {
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
                    <Icon boxSize={boxsize} color={textcolor}>{Iconic && <Iconic />}</Icon>
                </Box>

                <Stack w={"full"} align={"center"} gap={3}>
                    <Text fontSize={"2xl"} fontWeight={"bold"} color={textcolor}>{title}</Text>
                    <Text fontSize={"base"} fontWeight={"medium"} color={textcolor}>{detail}</Text>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
};

export default MarketCard