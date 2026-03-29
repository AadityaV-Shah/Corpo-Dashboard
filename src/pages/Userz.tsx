import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Box, Text, Container, Image, Stack, Button, Badge,
    Dialog, HStack, Input, Grid, InputGroup, Menu, Portal, RadioGroup
} from "@chakra-ui/react";
import { supabaseApi } from "@/api/supabase";
import { LuSearch } from "react-icons/lu";
import { DataTable } from "../components/DataTable";
import type { Column } from "../components/DataTable";
import { ChevronDown } from "lucide-react";

// --- Interfaces ---
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

// --- Reusable dropdown for role/department fields ---
const FieldMenu = ({
    value,
    onChange,
    placeholder,
    options,
}: {
    value: string;
    onChange: (val: string) => void;    
    placeholder: string;
    options: string[];
}) => (
    <Menu.Root onSelect={(details) => onChange(details.value)}>
        <Menu.Trigger asChild>
            <Button variant="outline" size="sm">
                {value || placeholder} <ChevronDown />
            </Button>
        </Menu.Trigger>
        <Portal>
            <Menu.Positioner>
                <Menu.Content>
                    {options.map((opt) => (
                        <Menu.Item key={opt} value={opt}>{opt}</Menu.Item>
                    ))}
                </Menu.Content>
            </Menu.Positioner>
        </Portal>
    </Menu.Root>
);

const ROLES = ["Assistant", "Manager", "Lead", "Intern", "Apprentice", "Programmer", "Executive", "Designer"];
const DEPARTMENTS = ["FrontEnd", "Node", "Java", "DevOps", "Marketing", "Mobile", "Database", "UI/UX"];

// --- Edit User Form ---
const EditUserForm = ({
    user,
    onSave,
    onClose,
}: {
    user: UserProps;
    onSave: (id: number, data: Partial<UserProps>) => void;
    onClose: () => void;
}) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<UserProps>({
        defaultValues: user,
    });

    const onSubmit = (data: UserProps) => {
        onSave(user.id, data);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
                <Grid templateColumns="110px 1fr" alignItems="start" gap={4}>
                    <Text fontWeight="semibold" textAlign="right" mt={2}>Name</Text>
                    <Stack gap={1}>
                        <Input {...register("name", { required: "Name is required" })} variant="subtle" />
                        {errors.name && <Text color="red.400" fontSize="xs">{errors.name.message}</Text>}
                    </Stack>
                </Grid>

                <Grid templateColumns="110px 1fr" alignItems="start" gap={4}>
                    <Text fontWeight="semibold" textAlign="right" mt={2}>Email</Text>
                    <Stack gap={1}>
                        <Input
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" },
                            })}
                            variant="subtle"
                        />
                        {errors.email && <Text color="red.400" fontSize="xs">{errors.email.message}</Text>}
                    </Stack>
                </Grid>

                <Grid templateColumns="110px 1fr" alignItems="center" gap={4}>
                    <Text fontWeight="semibold" textAlign="right">Role</Text>
                    <Controller
                        name="role1"
                        control={control}
                        render={({ field }) => (
                            <FieldMenu value={field.value} onChange={field.onChange} placeholder="Select Role" options={ROLES} />
                        )}
                    />
                </Grid>

                <Grid templateColumns="110px 1fr" alignItems="center" gap={4}>
                    <Text fontWeight="semibold" textAlign="right">Department</Text>
                    <Controller
                        name="role2"
                        control={control}
                        render={({ field }) => (
                            <FieldMenu value={field.value} onChange={field.onChange} placeholder="Select Department" options={DEPARTMENTS} />
                        )}
                    />
                </Grid>

                <Grid templateColumns="110px 1fr" alignItems="center" gap={4}>
                    <Text fontWeight="semibold" textAlign="right">Status</Text>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup.Root value={field.value} onValueChange={(d) => field.onChange(d.value)} colorPalette="blue">
                                <HStack gap={6}>
                                    {["Online", "Offline"].map((s) => (
                                        <RadioGroup.Item key={s} value={s}>
                                            <RadioGroup.ItemHiddenInput />
                                            <RadioGroup.ItemIndicator />
                                            <RadioGroup.ItemText>{s}</RadioGroup.ItemText>
                                        </RadioGroup.Item>
                                    ))}
                                </HStack>
                            </RadioGroup.Root>
                        )}
                    />
                </Grid>

                <Grid templateColumns="110px 1fr" alignItems="center" gap={4}>
                    <Text fontWeight="semibold" textAlign="right">Employed</Text>
                    <Input type="date" {...register("empdate")} variant="subtle" />
                </Grid>

                <Grid templateColumns="1fr 1fr" gap={4} mt={4}>
                    <Dialog.ActionTrigger asChild>
                        <Button variant="surface">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button type="submit" colorPalette="blue">Save Changes</Button>
                </Grid>
            </Stack>
        </form>
    );
};

// --- Main Component ---
const Userz: React.FC = () => {

    const [data, setData] = useState<UserProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialogId, setOpenDialogId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await supabaseApi.get("/profiles?select=*&order=id.asc");
                console.log("STATUS:", response.status);
                console.log("DATA:", response.data);
                setData(response.data); 
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleSave = async (id: number, updatedUser: Partial<UserProps>) => {
        try {
            const { id: _, image: __, ...patchData } = updatedUser as UserProps;

            const response = await supabaseApi.patch(`/profiles?id=eq.${id}`, patchData, {
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
        const search = searchQuery.toLowerCase().trim();
        if (!search) return data;
        return data.filter((u) =>
            [u.name, u.email, u.role1, u.role2, u.status, u.empdate]
                .some((v) => String(v ?? "").toLowerCase().includes(search))
        );
    }, [data, searchQuery]);

    const columns: Column<UserProps>[] = [
        {
            header: "AUTHOR",
            accessor: "name",
            render: (user) => (
                <Box display="flex" alignItems="center" gap={3}>
                    <Image src={user.image} alt={user.name} boxSize="40px" borderRadius="full" />
                    <Stack gap={0}>
                        <Text fontWeight="bold">{user.name}</Text>
                        <Text fontSize="sm" color="gray.500">{user.email}</Text>
                    </Stack>
                </Box>
            ),
        },
        {
            header: "FUNCTION",
            accessor: "role1",
            render: (user) => (
                <Stack gap={0}>
                    <Text fontWeight="bold">{user.role1}</Text>
                    <Text fontSize="sm" color="gray.500">{user.role2}</Text>
                </Stack>
            ),
        },
        {
            header: "STATUS",
            accessor: "status",
            render: (user) => (
                <Badge colorPalette={user.status === "Online" ? "green" : "gray"} variant="solid" px={2} borderRadius="full">
                    {user.status}
                </Badge>
            ),
        },
        {
            header: "EMPLOYED",
            accessor: "empdate",
            render: (user) => <Text fontWeight="medium">{user.empdate}</Text>,
        },
        {
            header: "",
            accessor: "id",
            render: (user) => (
                <Dialog.Root
                    open={openDialogId === user.id}
                    onOpenChange={(details) => setOpenDialogId(details.open ? user.id : null)}
                    placement="top"
                    motionPreset="slide-in-bottom"
                >
                    <Dialog.Trigger asChild>
                        <Button variant="ghost" size="sm">Edit</Button>
                    </Dialog.Trigger>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content bg="gray.800" color="white">
                            <Dialog.Header>
                                <Dialog.Title fontSize="xl">Edit User</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <EditUserForm user={user} onSave={handleSave} onClose={() => setOpenDialogId(null)} />
                            </Dialog.Body>
                            <Dialog.CloseTrigger />
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>
            ),
        },
    ];

    return (
        <Box minH="100vh" width="100%" bg="rgb(225, 226, 239)" pt={4}>
            <Container maxW="container.lg">
                {loading ? (
                    <Text textAlign="center" color="gray.500" py={8}>Loading users…</Text>
                ) : data.length === 0 ? (
                    <Text textAlign="center" color="gray.500" py={8}>No users found.</Text>
                ) : (
                    <>
                        <Box mb={4} display="flex" justifyContent="flex-end">
                            <InputGroup flex="1" maxW="300px" startElement={<LuSearch color="gray" />}>
                                <Input
                                    placeholder="Search by name, role, status…"
                                    variant="outline"
                                    size="sm"
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
                                cell: { background: "rgb(225, 226, 239)", fontWeight: "bold", fontSize: "md", color: "black" },
                                headerText: { color: "grey" },
                            }}
                        />
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Userz;