import React, { useState, useEffect } from "react";
import { supabaseApi } from "@/api/supabase";
import { Box, Text, Container, Image, Button, Badge, Dialog, HStack, Input } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react"
import { DataTable } from "../components/DataTable";
import { GenericEditForm, type FormField } from "../components/GenericEditForm";
import type { Column } from "../components/DataTable";
import { LuSearch } from "react-icons/lu";
import { InputGroup } from "@/components/ui/input-group"
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';

interface ProjProps {
    id: number;
    image: string;
    name: string;
    budget: string;
    status: string;
    completion: number;
}

const PROJ_FIELDS: FormField<ProjProps>[] = [
    {
        name: "name",
        label: "Name",
        type: "text",
        validation: { required: "Name is required" },
    },
    {
        name: "budget",
        label: "Budget",
        type: "text",
        validation: { required: "Budget is required" },
    },
    {
        name: "status",
        label: "Status",
        type: "radio",
        options: [
            { label: "Working", value: "Working" },
            { label: "Done", value: "Done" },
            { label: "Cancelled", value: "Cancelled" },
        ],
    },
    {
        name: "completion",
        label: "Completion (%)",
        type: "number",
        validation: {
            required: "% is required",
            valueAsNumber: true,
            min: { value: 0, message: "Min value = 0" },
            max: { value: 100, message: "Max value = 100" },
        },
    },
];

const EditProjForm = ({
    item,
    onSave,
    onClose,
}: {
    item: ProjProps;
    onSave: (id: number, data: Partial<ProjProps>) => void;
    onClose: () => void;
}) => (
    <GenericEditForm<ProjProps>
        defaultValues={item}
        fields={PROJ_FIELDS}
        onSubmit={(data) => onSave(item.id, data)}
        onClose={onClose}
    />
);


//Main Component
const Projects: React.FC = () => {


    const [openDialogId, setOpenDialogId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    //Fetching data from Supabase table using a custom useEffect hook, endpoint(table) and params are passed through propsnpm 
    const { data, loading, setData } = useSupabaseFetch<ProjProps>("/projects", { select: '*', order: 'id.asc' });

    const handleSave = async (id: number, updatedProj: Partial<ProjProps>) => {
        try {
            const { id: _, image: __, ...patchData } = updatedProj as ProjProps;

            const response = await supabaseApi.patch(`/projects?id=eq.${id}`, patchData, {
                headers: { Prefer: "return=representation" },
            });
            console.log("PATCH STATUS:", response.status);
            setData((prev) => prev.map((u) => (u.id === id ? { ...u, ...patchData } : u)));
        } catch (error: any) {
            console.error("PATCH ERROR:", error.response?.status, error.response?.data);
            alert("Failed to save changes.");
        }
    };

    const filteredData = React.useMemo(() => {
        const search = searchQuery.toLowerCase();
        return data.filter((item) =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(search)
            )
        );
    }, [data, searchQuery]);

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
                    <Text fontWeight="bold" lineHeight="short">
                        ${item.budget ? Number(item.budget).toLocaleString('en-US') : "—"}
                    </Text>
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
            render: (item) => (

                <Dialog.Root
                    key={item.id}
                    open={openDialogId === item.id}
                    onOpenChange={(details) => setOpenDialogId(details.open ? item.id : null)}
                    placement="top"
                    motionPreset="slide-in-bottom">
                    <Dialog.Trigger asChild>
                        <Button variant="surface" size="sm" ml={5}>Edit</Button>
                    </Dialog.Trigger>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content color={"white"}>
                            <Dialog.Header>
                                <Dialog.Title fontSize={"xl"}>Edit Project</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <EditProjForm
                                    item={item}
                                    onSave={handleSave}
                                    onClose={() => setOpenDialogId(null)}
                                />
                            </Dialog.Body>
                            <Dialog.CloseTrigger />
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>
            )
        },
    ];

    return (
        <Box
            minH="100vh"
            width="100%"
            bg="rgb(225, 226, 239)"
            pt={4}
        >
            <Container maxW="container.lg">

                {loading ? (
                    <Text textAlign="center" color="gray.500" py={8}>Loading projects...</Text>
                ) : data.length === 0 ? (
                    <Text textAlign="center" color="gray.500" py={8}>No users found.</Text>
                ) : (

                    <>
                        <Box mb={4} display="flex" justifyContent="flex-end">
                            <InputGroup
                                flex="1"
                                maxW="250px"
                                startElement={<LuSearch color="gray" />}
                            >
                                <Input
                                    placeholder="Search projects or status..."
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
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            styles={{
                                cell: { background: "rgb(225, 226, 239)", fontSize: "md", color: "black" },
                                headerText: { color: "grey", fontWeight: "bold" }
                            }}
                        />
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Projects;