import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Input, Center, Spinner } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { InputGroup } from "@/components/ui/input-group"
import MentorCard from "@/components/MentorCard";
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';

interface AccountProps {
    pfp?: string;
    name?: string;
    phone?: string;
    about?: string;
}

const Accounts = () => {

    const [searchQuery, setSearchQuery] = useState("");

    //Fetching data from Supabase table using a custom useEffect hook, endpoint(supabase table) and params are passed through propsnpm 
    const { data, loading, setData } = useSupabaseFetch<AccountProps>("/admin_profiles", { select: '*', order: 'id.asc' });

    const filteredData = React.useMemo(() => {
        const search = searchQuery.toLowerCase().trim();
        if (!search) return data;
        return data.filter((a) =>
            [a.name, a.phone]
                .some((v) => String(v ?? "").toLowerCase().includes(search))
        );
    }, [data, searchQuery]);

    return (
        <Box minH={"100vh"} w={"100%"} bg={"rgb(225, 226, 239)"} pt={5} pb={10}>
            <Container maxW="container.xl">

                {/* Search box to filter the accounts */}

                <Box mb={4} display="flex" justifyContent="flex-end">
                    <InputGroup
                        flex="1"
                        maxW="250px"
                        startElement={<LuSearch color="gray" />}
                    >
                        <Input
                            placeholder="Search accounts..."
                            variant="outline"
                            size={"sm"}
                            bg="white"
                            color="black"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            _placeholder={{ color: "gray.500" }}
                        />
                    </InputGroup>
                </Box>

                {/* The accounts */}

                {loading ? (

                    <Center h="300px">
                        <Spinner size="xl" color="blue.500" borderWidth="4px" />
                    </Center>

                ) : (

                    <Grid
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                        gap={6}
                    >
                        {filteredData.map((data, id) => (
                            <MentorCard
                                key={id}
                                image={data.pfp}
                                name={data.name}
                                role={data.phone}
                                detail={data.about}
                                blabel="Bio"
                                showDetails={true}
                                showWork={false}
                            />
                        ))}
                    </Grid>
                    
                )}

            </Container>
        </Box>
    );
};

export default Accounts