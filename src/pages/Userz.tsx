import React, { useState } from "react";
import { Box, Text, Container, Image, Stack, Button, Badge, Dialog, HStack, Input, Grid } from "@chakra-ui/react";
import { RadioGroup } from "@chakra-ui/react"
import { DataTable } from "../components/DataTable";
import type { Column } from "../components/DataTable";


interface UserProps {
    id: number;
    image: string;
    name: string;
    email: string;
    role1: string;
    role2: string;
    status: string;
    empdate: string;
}

const usersData: UserProps[] = [
    {
        id: 1,
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Esthera Jackson",
        email: "esthera@simmmpale.com",
        role1: "Manager",
        role2: "Organization",
        status: "Online",
        empdate: "2021-06-14"
    },
    {
        id: 2,
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        name: "Alexa Liras",
        email: "alexa@simmmpale.com",
        role1: "Programmer",
        role2: "Developer",
        status: "Offline",
        empdate: "2021-06-14"
    },
    {
        id: 3,
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        name: "Laurent Michael",
        email: "laurent@simmmpale.com",
        role1: "Executive",
        role2: "Projects",
        status: "Online",
        empdate: "2021-06-14"
    },
    {
        id: 4,
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Freduardo Hill",
        email: "freduardo@simmmpale.com",
        role1: "Manager",
        role2: "Organization",
        status: "Online",
        empdate: "2021-06-14"
    },
    {
        id: 5,
        image: "https://randomuser.me/api/portraits/men/5.jpg",
        name: "Daniel Thomas",
        email: "daniel@simmmpale.com",
        role1: "Programmer",
        role2: "Developer",
        status: "Offline",
        empdate: "2021-06-14"
    },
    {
        id: 6,
        image: "https://randomuser.me/api/portraits/men/6.jpg",
        name: "Mark Wilson",
        email: "mark@simmmpale.com",
        role1: "Designer",
        role2: "UI/UX Design",
        status: "Offline",
        empdate: "2021-06-14"
    },
    {
        id: 7,
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        name: "Westside Gunn",
        email: "bleed@reality.com",
        role1: "QA",
        role2: "Project Lead",
        status: "Online",
        empdate: "2021-06-14"
    }
];

const Userz: React.FC = () => {

    const [data, setData] = useState<UserProps[]>(usersData);

    const handleSave = (id: number, updatedUser: Partial<UserProps>) => {
        setData((prevData) =>
            prevData.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
        );
    };

    // Define column configuration specifically for UserProps
    const columns: Column<UserProps>[] = [
        {
            header: "AUTHOR",
            accessor: "name",
            render: (user) => (
                <Box display="flex" alignItems="center" gap={3}>
                    <Image src={user.image} alt={user.name} boxSize="40px" borderRadius="full" />
                    <Stack gap={0}>
                        <Text fontWeight="bold" lineHeight="short">{user.name}</Text>
                        <Text fontSize="sm" color="gray.500" lineHeight="short">{user.email}</Text>
                    </Stack>
                </Box>
            ),
        },
        {
            header: "FUNCTION",
            accessor: "role1",
            render: (user) => (
                <Stack gap={0}>
                    <Text fontWeight="bold" lineHeight="short">{user.role1}</Text>
                    <Text fontSize="sm" color="gray.500" lineHeight="short">{user.role2}</Text>
                </Stack>
            ),
        },
        {
            header: "STATUS",
            accessor: "status",
            render: (user) => (
                <Badge
                    bg={user.status === "Online" ? "green" : "gray"}
                    variant="subtle"
                    px={2}
                    borderRadius="full"
                >
                    {user.status}
                </Badge>
            ),
        },
        {
            header: "EMPLOYED",
            accessor: "empdate",
            render: (user) => (
                <Text fontWeight={"medium"}>
                    {user.empdate}
                </Text>
            ),
        },
        {
            header: "",
            accessor: "id", // Changed from "actions" to a valid key
            render: (user) => {

                //Local State
                const [editName, setEditName] = useState(user.name);
                const [editEmail, setEditEmail] = useState(user.email);
                const [editRole1, setEditRole1] = useState(user.role1);
                const [editRole2, setEditRole2] = useState(user.role2);
                const [editStat, setEditStat] = useState(user.status);
                const [editComp, setEditComp] = useState(user.empdate);

                return (

                    /* FIX: Wrap the Trigger and Content together here */
                    <Dialog.Root placement="top" motionPreset="slide-in-bottom">
                        <Dialog.Trigger asChild>
                            <Button variant="ghost" size="sm">Edit</Button>
                        </Dialog.Trigger>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content color={"white"}>
                                <Dialog.Header>
                                    <Dialog.Title fontSize={"xl"}>Edit User</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Stack gap={3}>
                                        {/* Each "row" is a Grid with 2 columns */}
                                        <Grid templateColumns="100px 1fr" alignItems="center" gap={4} focusRing={"none"}>
                                            <Text fontWeight="semibold" textAlign="right">Name</Text>
                                            <Input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                variant="subtle"
                                            />
                                        </Grid>

                                        <Grid templateColumns="100px 1fr" alignItems="center" gap={4}>
                                            <Text fontWeight="semibold" textAlign="right">Email</Text>
                                            <Input
                                                type="email"
                                                value={editEmail}
                                                onChange={(e) => setEditEmail(e.target.value)}
                                                variant="subtle"
                                            />
                                        </Grid>

                                        <Grid templateColumns="100px 1fr" alignItems="center" gap={4}>
                                            <Text fontWeight="semibold" textAlign="right">Role</Text>
                                            <Input
                                                value={editRole1}
                                                onChange={(e) => setEditRole1(e.target.value)}
                                                variant="subtle"
                                            />
                                        </Grid>

                                        <Grid templateColumns="100px 1fr" alignItems="center" gap={4}>
                                            <Text fontWeight="semibold" textAlign="right">Department</Text>
                                            <Input
                                                value={editRole2}
                                                onChange={(e) => setEditRole2(e.target.value)}
                                                variant="subtle"
                                            />
                                        </Grid>

                                        <Grid templateColumns="100px 1fr" alignItems="center" gap={4}>
                                            <Text fontWeight="semibold" textAlign="right">Status</Text>

                                            <RadioGroup.Root
                                                value={editStat}
                                                onValueChange={(details) => setEditStat(details.value || "")}
                                                colorPalette="blue">
                                                <HStack gap="6">
                                                    {/* Option: Online */}
                                                    <RadioGroup.Item value="Online" cursor="pointer" pointerEvents="auto">
                                                        <RadioGroup.ItemHiddenInput />
                                                        <RadioGroup.ItemIndicator />
                                                        <RadioGroup.ItemText>Online</RadioGroup.ItemText>
                                                    </RadioGroup.Item>

                                                    {/* Option: Offline */}
                                                    <RadioGroup.Item value="Offline" cursor="pointer" pointerEvents="auto">
                                                        <RadioGroup.ItemHiddenInput />
                                                        <RadioGroup.ItemIndicator />
                                                        <RadioGroup.ItemText>Offline</RadioGroup.ItemText>
                                                    </RadioGroup.Item>
                                                </HStack>
                                            </RadioGroup.Root>

                                        </Grid>

                                        <Grid templateColumns="100px 1fr" alignItems="center" gap={4}>
                                            <Text fontWeight="semibold" textAlign="right">Employed</Text>
                                            <Input type="date"
                                                value={editComp}
                                                onChange={(e) => setEditComp(e.target.value)}
                                                variant="subtle"
                                                placeholder={user.empdate}
                                                size="md"
                                                _hover={{ borderColor: "blue.400" }}
                                                _focus={{ borderColor: "blue.500", ring: "1" }} />
                                        </Grid>

                                        <Grid templateColumns="50% 50%" alignItems="center" gap={4} px={3} mt={2}>
                                            <Dialog.ActionTrigger asChild>
                                                <Button variant={"surface"}>Cancel</Button>
                                            </Dialog.ActionTrigger>
                                            <Dialog.ActionTrigger asChild>
                                                <Button
                                                    variant={"surface"}
                                                    onClick={() => handleSave(user.id, {
                                                        name: editName,
                                                        email: editEmail,
                                                        role1: editRole1,
                                                        role2: editRole2,
                                                        status: editStat,
                                                        empdate: editComp,
                                                    })}
                                                >
                                                    Save
                                                </Button>
                                            </Dialog.ActionTrigger>
                                        </Grid>

                                    </Stack>
                                </Dialog.Body>
                                <Dialog.CloseTrigger />
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Dialog.Root>
                );
            }
        },
    ];

    return (
        <Box minH="100vh" width="100%" bg="rgb(225, 226, 239)" pt={2}>
            <Container maxW="container.lg">
                <DataTable
                    columns={columns}
                    data={data}
                    styles={{
                        cell: { background: "rgb(225, 226, 239)", fontWeight: "bold", fontSize: "md", color: "black" },
                        headerText: { color: "grey" }
                    }}
                />
            </Container>
        </Box>
    );
};

export default Userz;

