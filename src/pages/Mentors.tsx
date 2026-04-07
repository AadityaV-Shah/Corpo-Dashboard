import { useState, useEffect } from "react";
import { Box, Text, Container, Card, Grid, Stack, Image } from "@chakra-ui/react";
import { supabaseApi } from "@/api/supabase";
import MentorCard from "@/components/MentorCard";

interface MentorProps {
    image: string;
    name: string;
    role: string;
    wplace: string;
    skill: string;
    detail: string;
}

const Mentors = () => {

    const [mentors, setMentors] = useState<MentorProps[]>([]);


    useEffect(() => {
        const getInfo = async () => {
            const response = await supabaseApi.get(`/mentors`);
            if (response.data.length > 0) {
                setMentors(response.data)
            };
        };
        getInfo();
    }, []);

    return (
        <Box minH={"100vh"} w={"100%"} bg={"rgb(225, 226, 239)"} pt={5} pb={10}>
            <Container maxW="container.xl">
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                    gap={6}
                >
                    {mentors.map((mentors, index) => (
                        <MentorCard
                            image={mentors.image}
                            name={mentors.name}
                            role={mentors.role}
                            work={mentors.wplace}
                            depart={mentors.skill}
                            detail={mentors.detail}
                        />
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default Mentors