import { Box, Text, Container, Table } from "@chakra-ui/react";

interface ProfileProps {
    uname: string;
    name: string;
    email: string;
    role: string;
    plan: string;
    phone: number;
}

const profileData: ProfileProps[] = [
    {
        uname: "AV$hah",
        name: "Aaditya Vikram Shah",
        email: "aaditya@email.com",
        role: "User",
        plan: "Premium",
        phone: 9878765654,
    },
];

const Profile: React.FC = () => {

    return (
        <Box
            height="100vh"
            width="100%"
            bg="rgb(225, 226, 239)"
            display="flex"
            alignItems="flex-start"
        >
            <Container maxW="container.lg">
                {/* Avatar */}
                <Box display="flex" gap={5} alignItems="center" justifyContent={"start"}>
                    <Box
                        width="150px"
                        height="150px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="gray.700"
                        borderRadius="md"
                    >
                        <Text fontSize="3xl" color="white">
                            A
                        </Text>
                    </Box>

                    {/* Profile Table */}
                    <Box width="70%" display="flex" flexDirection="column" gap={4} mt={6}>
                        {profileData.map((item) => (
                            <Table.Root key={item.uname} width="100%" css={{
                                "& td": { background: "rgb(225, 226, 239)", color: "black", fontWeight: "medium", fontSize: "md" }
                            }}>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>Username:</Table.Cell>
                                        <Table.Cell>{item.uname}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>Name:</Table.Cell>
                                        <Table.Cell>{item.name}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>Email:</Table.Cell>
                                        <Table.Cell>{item.email}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>Role:</Table.Cell>
                                        <Table.Cell>{item.role}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>Plan:</Table.Cell>
                                        <Table.Cell>{item.plan}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>Phone:</Table.Cell>
                                        <Table.Cell>{item.phone}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table.Root>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Profile;