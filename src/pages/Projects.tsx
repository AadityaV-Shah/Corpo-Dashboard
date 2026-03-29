import React, { useState, useEffect } from "react";
import { supabaseApi } from "@/api/supabase";
import { useForm, Controller } from "react-hook-form";
import { Box, Text, Container, Image, Stack, Button, Badge, Dialog, HStack, Input, Grid, InputGroup } from "@chakra-ui/react";
import { RadioGroup } from "@chakra-ui/react"
import { Progress } from "@chakra-ui/react"
import { DataTable } from "../components/DataTable";
import type { Column } from "../components/DataTable";
import { LuSearch } from "react-icons/lu";

interface ProjProps {
    id: number;
    image: string;
    name: string;
    budget: string;
    status: string;
    completion: number;
}

const EditProjForm = ({
    item,
    onSave,
    onClose
}: {
    item: ProjProps;
    onSave: (id: number, data: Partial<ProjProps>) => void;
    onClose: () => void;
}) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<ProjProps>({
        defaultValues: item
    });

    const onSubmit = (data: ProjProps) => {
        onSave(item.id, data);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
                <Grid templateColumns="120px 1fr" alignItems="center" gap={4}>
                    <Text fontWeight="semibold" textAlign="right" mt={2}>Name</Text>
                    <Stack>
                        <Input {...register("name", { required: "Name is required" })} variant="subtle" />
                        {errors.name && <Text color="red.400" fontSize="xs">{errors.name.message}</Text>}
                    </Stack>
                </Grid>

                <Grid templateColumns="120px 1fr" alignItems="center" gap={4}>
                    <Text fontWeight="semibold" textAlign="right">Budget</Text>
                    <Stack>
                        <Input {...register("budget", { required: "Budget is required" })} variant="subtle" />
                        {errors.budget && <Text color="red.400" fontSize="xs">{errors.budget.message}</Text>}
                    </Stack>
                </Grid>

                <Grid templateColumns="120px 1fr" alignItems="center" gap={4}>
                    <Text fontWeight="semibold" textAlign="right">Status</Text>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (

                            <RadioGroup.Root
                                value={field.value}
                                onValueChange={(details) => field.onChange(details.value)}
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
                        )}
                    />
                </Grid>

                <Grid templateColumns="120px 1fr" alignItems="center" gap={4}>
                    <Text fontWeight="semibold" textAlign="right">Completion(%)</Text>
                    <Stack>
                        <Input type="number" {...register("completion", {
                            required: "% is required", valueAsNumber: true, min: { value: 0, message: "Min value = 0" },
                            max: { value: 100, message: "Max value = 100" }
                        })} variant="subtle" />
                        {errors.completion && <Text color="red.400" fontSize="xs">{errors.completion.message}</Text>}
                    </Stack>
                </Grid>

                <Grid templateColumns="1fr 1fr" alignItems="center" gap={4}>
                    <Dialog.ActionTrigger asChild>
                        <Button variant={"surface"}>Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button type="submit" colorPalette={"blue"}>
                        Save Changes
                    </Button>
                </Grid>
            </Stack>
        </form>
    );
};


//Main Component
const Projects: React.FC = () => {

    const [data, setData] = useState<ProjProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialogId, setOpenDialogId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProj = async () => {
            try {
                const response = await supabaseApi.get("/projects?select=*&order=id.asc");
                console.log("STATUS:", response.status);
                console.log("DATA:", response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProj();
    }, []);

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
            render: (item) => (

                <Dialog.Root
                    key={item.id}
                    open={openDialogId === item.id}
                    onOpenChange={(details) => setOpenDialogId(details.open ? item.id : null)}
                    placement="top"
                    motionPreset="slide-in-bottom">
                    <Dialog.Trigger asChild>
                        <Button variant="ghost" size="sm" ml={5}>Edit</Button>
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
                    <Text textAlign="center" color="gray.500" py={8}>Loading users…</Text>
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