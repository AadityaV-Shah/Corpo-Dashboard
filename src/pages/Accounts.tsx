import { useState, useEffect } from "react";
import { Box, Container, Grid } from "@chakra-ui/react";
import { supabaseApi } from "@/api/supabase";
import MentorCard from "@/components/MentorCard";

interface AccountProps {
    pfp?: string;
    name?: string;
    phone?: string;
    about?: string;
}

const Accounts = () => {

    const [accounts, setAccounts] = useState<AccountProps[]>([]);

    useEffect(() => {
        const getInfo = async () => {

            const response = await supabaseApi.get(`/admin_profiles`);
            if (!response.data) return;

            setAccounts(response.data)
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
                    {accounts.map((accounts, id) => (
                        <MentorCard
                            key={id}
                            image={accounts.pfp}
                            name={accounts.name}
                            role={accounts.phone}
                            detail={accounts.about}
                            blabel="Bio"
                            showDetails={true}
                            showWork={false}
                        />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Accounts