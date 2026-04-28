import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Stack,
    Text,
    Image,
    Container,
    SimpleGrid,
    Dialog
} from "@chakra-ui/react";
import { supabaseApi } from '@/api/supabase';
import { GenericEditForm, type FormField } from "../GenericEditForm";

//Props interface

interface ProfProjProps {
    id: number;
    image: string;
    name1: string;
    name2: string;
    detail: string;
}

//Props 

const PROFCARD_FIELDS: FormField<ProfProjProps>[] = [
    { name: "image", label: "Photo", type: "text", validation: { required: "Photo is required!" } },
    { name: "name1", label: "Name", type: "text", validation: { required: "Name is required" } },
    { name: "name2", label: "Title", type: "text", validation: { required: "Title is required" } },
    { name: "detail", label: "Detail", type: "textarea", validation: { required: "Detail is required" } },
];

//Logic to edit the existing database data

const EditUserForm = ({
    profcard, onSave, onClose,
}: {
    profcard: ProfProjProps;
    onSave: (id: number, data: Partial<ProfProjProps>) => void;
    onClose: () => void;
}) => (
    <GenericEditForm<ProfProjProps>
        defaultValues={profcard}
        fields={PROFCARD_FIELDS}
        onSubmit={(data) => onSave(profcard.id, data)}
        onClose={onClose}
    />
);

const ProfCard: React.FC = () => {

    const [data, setData] = useState<ProfProjProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [profcard, setProfcard] = useState<ProfProjProps[]>([]);
    const [openDialogId, setOpenDialogId] = useState<number | null>(null);

    // Fetch data from the database
    useEffect(() => {
        const getProfCardInfo = async () => {
            try {
                const response = await supabaseApi.get("/prof_projects", {
                    params: { select: '*', order: 'id.asc' }
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        getProfCardInfo();
    }, []);

    // Update data in the supabase database
    const handleSave = async (id: number, updatedProf: Partial<ProfProjProps>) => {
        try {
            const { id: _, ...patchData } = updatedProf as ProfProjProps;
            const response = await supabaseApi.patch(
                `/prof_projects?id=eq.${id}`, patchData,
                { headers: { Prefer: "return=representation" } }
            );
            console.log("PATCH STATUS:", response.status);
            setData((prev) => prev.map((p) => (p.id === id ? { ...p, ...patchData } : p)));
            setOpenDialogId(null);
        } catch (error: any) {
            console.error("PATCH ERROR:", error.response?.status, error.response?.data);
            alert("Failed to save changes.");
        }
    };

    // Loading state 
    if (loading) return <Text>Loading...</Text>

    return (

        <Container mt={"80px"} mb={"40px"}>

            <Stack p={5} bg={"white"} rounded={'xl'}>
                <Text fontWeight={"bold"} fontSize={"xl"} color={"black"}>Projects</Text>
                <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"}>Architects Design Houses</Text>

                {/* Use SimpleGrid for easy responsive columns */}
                <SimpleGrid gridTemplateColumns={{ base: 'repeat(1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4} my={4}>
                    {/* 1. Only map the first 3 items to keep the 4th slot open */}
                    {/* First 3 staxx */}
                    {data.slice(0, 3).map((item, index) => (
                        <React.Fragment key={item.id}>
                            <Stack
                                key={index}
                                align={"flex-start"}
                                gap={4}
                                bg={"white"}
                                p={5}
                                rounded={"xl"}
                                justify={"space-between"}
                                h={"full"}
                            >
                                <Image
                                    src={item.image}
                                    w={"full"}
                                    h={"200px"}
                                    objectFit="cover"
                                    borderRadius="md"
                                    alt={item.name1}
                                    transition="transform 0.2s linear"
                                    _hover={{ transform: "scale(1.02)" }}
                                />
                                <Stack gap={1}>
                                    <Text fontSize={"sm"} color={"grey"}>{item.name1}</Text>
                                    <Text fontSize={"xl"} color={"black"} fontWeight={'bold'} >
                                        {item.name2}
                                    </Text>
                                </Stack>
                                <Text fontSize={"sm"} color={"grey"} minH={'60px'}>
                                    {item.detail}
                                </Text>
                                <Box w="full" mt="auto">
                                    <Button border={"1px teal solid"} bg={'white'} color={'green'} _hover={{ bg: 'teal.50' }} w={'full'} focusRing={'none'}
                                        onClick={() => setOpenDialogId(item.id)}
                                    >
                                        Edit
                                    </Button>
                                </Box>
                            </Stack>

                            {/* Dialog Box for Editing profile */}
                            
                            <Dialog.Root
                                open={openDialogId === item.id}
                                onOpenChange={(details) =>
                                    setOpenDialogId(details.open ? item.id : null)
                                }
                                placement="top"
                                motionPreset="slide-in-bottom"
                            >
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content bg="gray.800" color="white">
                                        <Dialog.Header>
                                            <Dialog.Title fontSize="xl">Edit Project</Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <EditUserForm
                                                profcard={item}
                                                onSave={handleSave}
                                                onClose={() => setOpenDialogId(null)}
                                            />
                                        </Dialog.Body>
                                        <Dialog.CloseTrigger />
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Dialog.Root>

                        </React.Fragment>
                    ))}

                    {/* 2. The Custom 4th Box (Stays at the 4th place) */}
                    <Stack
                        align={"center"}
                        justify={"center"}
                        border={"2px dashed"}
                        borderColor={"gray.800"}
                        rounded={"xl"}
                        p={5}
                        transition="all 0.2s"
                        cursor="pointer"
                        _hover={{ bg: "gray.50", borderColor: "teal.300" }}
                    >
                        <Text color={'black'} fontSize={'4xl'} lineHeight="1">+</Text>
                        <Button color={'black'} bg={'#e6e1e1'} fontSize={'md'} fontWeight="bold" textAlign="center"
                            _hover={{ bg: 'black', color: 'white' }}
                        >
                            Create a New Project
                        </Button>
                    </Stack>
                </SimpleGrid>
            </Stack>
        </Container>
    )
}

export default ProfCard