import React, { useState } from "react";
import { Box, Text, Container, Image, Stack, Button, Badge, Dialog, HStack, Input, Grid } from "@chakra-ui/react";
import { RadioGroup } from "@chakra-ui/react"
import { Progress } from "@chakra-ui/react"
import { DataTable } from "../components/DataTable";
import type { Column } from "../components/DataTable";

interface ProjProps {
    id: number;
    image: string;
    name: string;
    budget: string;
    status: string;
    completion: number;
}

export const ProjData: ProjProps[] = [
    {
        id: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg",
        name: "Chakra Soft UI Version",
        budget: "$14,000",
        status: "Working",
        completion: 60,
    },
    {
        id: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Jira_Logo.svg",
        name: "Add Progress Track",
        budget: "$3,000",
        status: "Cancelled",
        completion: 10,
    },
    {
        id: 3,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
        name: "Fix Platform Errors",
        budget: "Not set",
        status: "Done",
        completion: 100,
    },
    {
        id: 4,
        image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
        name: "Launch our Mobile App",
        budget: "$32,000",
        status: "Done",
        completion: 100,
    },
    {
        id: 5,
        image: "https://cdn-icons-png.flaticon.com/512/9796/9796520.png",
        name: "Add the New Pricing Page",
        budget: "$400",
        status: "Working",
        completion: 25,
    },
    {
        id: 6,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/250px-Android_robot.svg.png",
        name: "Rework android app",
        budget: "$900",
        status: "Working",
        completion: 25,
    },
    {
        id: 7,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1280px-Instagram_logo_2022.svg.png",
        name: "Create Instagram marketing ads",
        budget: "$400",
        status: "Working",
        completion: 25,
    },
];

const Projects: React.FC = () => {
    // State to manage the live data
    const [data, setData] = useState<ProjProps[]>(ProjData);

    // Function to handle saving changes
    const handleSave = (id: number, updatedItem: Partial<ProjProps>) => {
        setData((prevData) =>
            prevData.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
        );
    };

    const columns: Column<ProjProps>[] = [
        {
            header: "COMPANIES",
            accessor: "name",
            render: (item) => (
                <Box display="flex" alignItems="center" gap={3}>
                    <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="40px"
                        borderRadius="full"
                        objectFit={"contain"}
                    />
                    <Box gap={0}>
                        <Text fontWeight="medium" lineHeight="short">{item.name}</Text>
                    </Box>
                </Box>
            ),
        },

        {
            header: "BUDGET",
            accessor: "money",
            render: (item) => (
                <Box gap={0}>
                    <Text fontWeight="bold" lineHeight="short">{item.budget}</Text>
                </Box>
            )
        },

        {
            header: "STATUS",
            accessor: "stats",
            render: (item) => (
                <Badge bg={
                    item.status === "Done"
                        ? "Green"
                        : item.status === "Cancelled"
                            ? "red"
                            : "grey"
                }
                    variant="subtle"
                    px={2}
                    borderRadius="full">
                    {item.status}
                </Badge>
            )
        },

        {
            header: "COMPLETION",
            accessor: "complete",
            render: (item) => (
                <Progress.Root value={item.completion} maxW="sm">
                    <HStack gap="5">
                        <Progress.Track flex="1" bg={"white/100"}>
                            <Progress.Range bg={"green"} />
                        </Progress.Track>
                        <Progress.ValueText fontWeight={"bold"}>{item.completion}%</Progress.ValueText>
                    </HStack>
                </Progress.Root>
            )
        },

        {
            header: "",
            accessor: "action",
            render: (item) => {
                // Local state for the inputs inside the dialog
                const [editName, setEditName] = useState(item.name);
                const [editBudget, setEditBudget] = useState(item.budget);
                const [editStatus, setEditStatus] = useState(item.status);
                const [editComp, setEditComp] = useState(item.completion);

                return (
                    <Dialog.Root placement="top" motionPreset="slide-in-bottom">
                        <Dialog.Trigger asChild>
                            <Button variant="surface" size="sm">Edit</Button>
                        </Dialog.Trigger>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content color={"white"}>
                                <Dialog.Header>
                                    <Dialog.Title fontSize={"xl"}>Edit Project</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Stack gap={3}>
                                        <Grid templateColumns="120px 1fr" alignItems="center" gap={4}>
                                            <Text fontWeight="semibold" textAlign="right">Name</Text>
                                            <Input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                variant="subtle"
                                            />
                                        </Grid>

                                        <Grid templateColumns="120px 1fr" alignItems="center" gap={4}>
                                            <Text fontWeight="semibold" textAlign="right">Budget</Text>
                                            <Input
                                                value={editBudget}
                                                onChange={(e) => setEditBudget(e.target.value)}
                                                variant="subtle"
                                            />
                                        </Grid>

                                        <Grid templateColumns="120px 1fr" alignItems="center" gap={4}>
                                            <Text fontWeight="semibold" textAlign="right">Status</Text>
                                            <RadioGroup.Root
                                                value={editStatus}
                                                // Add the "|| """ or "|| item.status" to handle the null case
                                                onValueChange={(details) => setEditStatus(details.value || "")}
                                                colorPalette="blue"
                                            >
                                                <HStack gap="6">
                                                    <RadioGroup.Item value="Working" pointerEvents="auto">
                                                        <RadioGroup.ItemHiddenInput />
                                                        <RadioGroup.ItemIndicator />
                                                        <RadioGroup.ItemText>Working</RadioGroup.ItemText>
                                                    </RadioGroup.Item>

                                                    <RadioGroup.Item value="Done" pointerEvents="auto">
                                                        <RadioGroup.ItemHiddenInput />
                                                        <RadioGroup.ItemIndicator />
                                                        <RadioGroup.ItemText>Done</RadioGroup.ItemText>
                                                    </RadioGroup.Item>

                                                    <RadioGroup.Item value="Cancelled" pointerEvents="auto">
                                                        <RadioGroup.ItemHiddenInput />
                                                        <RadioGroup.ItemIndicator />
                                                        <RadioGroup.ItemText>Cancelled</RadioGroup.ItemText>
                                                    </RadioGroup.Item>
                                                </HStack>
                                            </RadioGroup.Root>
                                        </Grid>

                                        <Grid templateColumns="120px 1fr" alignItems="center" gap={4}>
                                            <Text fontWeight="semibold" textAlign="right">Completion(%)</Text>
                                            <Input
                                                value={editComp}
                                                onChange={(e) => setEditComp(Number(e.target.value))}
                                                variant="subtle"
                                            />
                                        </Grid>

                                        <Grid templateColumns="50% 50%" alignItems="center" gap={4} px={3} mt={2}>
                                            <Dialog.ActionTrigger asChild>
                                                <Button variant={"surface"}>Cancel</Button>
                                            </Dialog.ActionTrigger>
                                            <Dialog.ActionTrigger asChild>
                                                <Button
                                                    variant={"surface"}
                                                    onClick={() => handleSave(item.id, {
                                                        name: editName,
                                                        budget: editBudget,
                                                        status: editStatus,
                                                        completion: editComp
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
        <Box
            minH="100vh"
            width="100%"
            bg="rgb(225, 226, 239)"
            display="flex"
            mt={2}
        >
            <Container maxW="container.lg">
                <DataTable
                    columns={columns}
                    data={data}
                    styles={{
                        cell: { background: "rgb(225, 226, 239)", fontSize: "md", color: "black" },
                        headerText: { color: "grey", fontWeight: "bold" }
                    }}
                />
            </Container>
        </Box>
    );
};

export default Projects;