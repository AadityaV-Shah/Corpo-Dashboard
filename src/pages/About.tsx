import React from "react";
import { Box, Container } from "@chakra-ui/react";
import AboutCard from "../components/AboutCard";

const About: React.FC = () => {
    return (
        <Box minH="100vh" width="100%" bg="rgb(225, 226, 239)" pt={8} pb={8}>
            <Container maxW="container.lg">

                <AboutCard
                    title="About Us"
                    description="Level up your business with TradeMasterPro. Our mastercrafted tools will take your business to the next level."
                    imageSrc="https://thumbs.dreamstime.com/b/smiling-professional-business-leaders-employees-group-team-portrait-coaches-mentors-posing-together-diverse-office-141681202.jpg"
                    imagePosition="right"
                />

                <Box mt={4}>
                    <AboutCard
                        title="Our Mission: Helping millions of people make money"
                        description="Level up your business with TradeMasterPro. Our mastercrafted tools will take your business to the next level."
                        imageSrc="https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29ycG9yYXRlfGVufDB8fDB8fHww"
                        imagePosition="left"
                    />
                </Box>

                <Box mt={4}>
                    <AboutCard
                        title="Our Story"
                        description="What began as a vision to challenge the status quo has evolved into a global mission of excellence. Founded on the principles of innovation, integrity, and impact, we started with a small, dedicated team and a singular goal: to provide transformative solutions that empower our clients to thrive in an ever-changing landscape."
                        imageSrc="https://thumbs.dreamstime.com/b/diverse-group-co-workers-having-casual-discussion-office-executives-friendly-month-reporting-creative-brainstorm-208836547.jpg"
                        imagePosition="right"
                    />
                </Box>

            </Container>
        </Box>
    );
};

export default About;