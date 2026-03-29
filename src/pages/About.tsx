import React from "react";
import { Box, Text, Container, Image, Stack, HStack } from "@chakra-ui/react";

const About: React.FC = () => {
    return (
        <Box minH="100vh" width="100%" bg="rgb(225, 226, 239)" pt={8} pb={8}>

            <Container maxW="container.lg">

                <HStack justifyContent={"space-between"} alignContent={"center"} p={10} bgColor={"rgb(210, 212, 230)"} rounded={"xl"} lineHeight={"taller"} >
                    <Stack justifyItems={"left"}>
                        <Text fontWeight={"medium"} color={"black"} fontSize={"3xl"}>About Us</Text>
                        <Text width={"80%"} color={"black"}>Level up your business with TradeMasterPro. Our mastercrafted tools will take your business to the next level.</Text>
                    </Stack>

                    <Box h={"auto"} w={"300px"} >
                        <Image src="https://thumbs.dreamstime.com/b/smiling-professional-business-leaders-employees-group-team-portrait-coaches-mentors-posing-together-diverse-office-141681202.jpg" w={"full"} h={"full"} rounded={"xl"} />
                    </Box>
                </HStack>

                <HStack justifyContent={"space-between"} alignContent={"center"} p={10} mt={4} bgColor={"rgb(210, 212, 230)"} rounded={"xl"} gap={7} lineHeight={"taller"} >

                    <Box h={"auto"} w={"300px"} >
                        <Image src="https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29ycG9yYXRlfGVufDB8fDB8fHww" w={"full"} h={"full"} rounded={"xl"} />
                    </Box>

                    <Stack justifyItems={"left"}>
                        <Text fontWeight={"medium"} color={"black"} fontSize={"3xl"}>Our Mission: Helping millions of people make money</Text>
                        <Text width={"100%"} color={"black"}>Level up your business with TradeMasterPro. Our mastercrafted tools will take your business to the next level.</Text>
                    </Stack>
                </HStack>

                <HStack justifyContent={"space-between"} alignContent={"center"} p={10} mt={4} bgColor={"rgb(210, 212, 230)"} rounded={"xl"} lineHeight={"taller"}  >

                    <Stack justifyItems={"left"}>
                        <Text fontWeight={"medium"} color={"black"} fontSize={"3xl"}>Our Story</Text>
                        <Text color={"black"}>What began as a vision to challenge the status quo has evolved into a global mission of excellence. Founded on the principles of innovation, integrity, and impact, we started with a small, dedicated team and a singular goal: to provide transformative solutions that empower our clients to thrive in an ever-changing landscape. We believed then, as we do now, that success is built on the foundation of trust and a relentless pursuit of quality.</Text>
                    </Stack>

                    <Box h={"auto"} w={"300px"} flexShrink={0}> {/*Flex shrink makes the element inside the flex box refuse to shrink because of other elements. */}
                        <Image src="https://thumbs.dreamstime.com/b/diverse-group-co-workers-having-casual-discussion-office-executives-friendly-month-reporting-creative-brainstorm-208836547.jpg" w={"full"} h={"full"} rounded={"xl"} objectFit="cover" />
                    </Box>
                </HStack>

            </Container>

        </Box>
    )
}

export default About