import { useState, useEffect } from "react";
import { Box, Container, Grid } from "@chakra-ui/react";
import { supabaseApi } from "@/api/supabase";
import MentorCard from "@/components/MentorCard";
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';

interface MentorProps {
    image: string;
    name: string;
    role: string;
    wplace: string;
    skill: string;
    detail: string;
}

const Mentors = () => {

    //Fetching data from Supabase table using a custom useEffect hook, endpoint(supabase table) and params are passed through propsnpm 
    const { data, loading, setData } = useSupabaseFetch<MentorProps>("/mentors", { select: '*', order: 'id.asc' });

    return (
        <Box minH={"100vh"} w={"100%"} bg={"rgb(225, 226, 239)"} pt={5} pb={10}>
            <Container maxW="container.xl">
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                    gap={6}
                >
                    {data.map((data) => (
                        <MentorCard
                            image={data.image}
                            name={data.name}
                            role={data.role}
                            work={data.wplace}
                            depart={data.skill}
                            detail={data.detail}
                            blabel="Details"
                            showDetails={true}
                            showWork={true}
                        />
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default Mentors