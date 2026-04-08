import React, { useState, useEffect } from "react";
import {
    Box, Text, Container, Image, Stack, Button, Badge,
    Dialog, Input, InputGroup
} from "@chakra-ui/react";
import { supabaseApi } from "@/api/supabase";
import { LuSearch } from "react-icons/lu";
import { DataTable } from "../components/DataTable";
import type { Column } from "../components/DataTable";
import { GenericEditForm, type FormField } from "../components/GenericEditForm";
import CButton from "@/components/Button";

// --- Interface ---
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

const ROLES = ["Assistant", "Manager", "Lead", "Intern", "Apprentice", "Programmer", "Executive", "Designer"];
const DEPARTMENTS = ["FrontEnd", "Node", "Java", "DevOps", "Marketing", "Mobile", "Database", "UI/UX"];

const USER_FIELDS: FormField<UserProps>[] = [
    {
        name: "name",
        label: "Name",
        type: "text",
        validation: { required: "Name is required" },
    },
    {
        name: "email",
        label: "Email",
        type: "text",
        validation: {
            required: "Email is required",
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
            },
        },
    },
    {
        name: "role1",
        label: "Role",
        type: "dropdown",
        options: ROLES,
        placeholder: "Select Role",
    },
    {
        name: "role2",
        label: "Department",
        type: "dropdown",
        options: DEPARTMENTS,
        placeholder: "Select Department",
    },
    {
        name: "status",
        label: "Status",
        type: "radio",
        options: [
            { label: "Online", value: "Online" },
            { label: "Offline", value: "Offline" },
        ],
    },
    {
        name: "empdate",
        label: "Employed",
        type: "date",
    },
];

const EditUserForm = ({
    user,
    onSave,
    onClose,
}: {
    user: UserProps;
    onSave: (id: number, data: Partial<UserProps>) => void;
    onClose: () => void;
}) => (
    <GenericEditForm<UserProps>
        defaultValues={user}
        fields={USER_FIELDS}
        onSubmit={(data) => onSave(user.id, data)}
        onClose={onClose}
    />
);


// --- Main Component ---
const Userz: React.FC = () => {

    const [data, setData] = useState<UserProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialogId, setOpenDialogId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await supabaseApi.get("/profiles", {
                    params: {
                        select: '*',
                        order: 'id.asc'
                    }
                });
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
                        <CButton
                            label="Edit"
                            variant="ghost"
                            size="md"
                            fullWidth={true}
                            loading={false}
                            style={{ width: 'fill', color: 'white' }}
                        />
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
                        <Box overflowX="auto" width="100%">
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                styles={{
                                    cell: { background: "rgb(225, 226, 239)", fontWeight: "bold", fontSize: "md", color: "black" },
                                    headerText: { color: "grey" },
                                }}
                            />
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Userz;