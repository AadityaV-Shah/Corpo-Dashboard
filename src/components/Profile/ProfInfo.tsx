import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import {
    Box, Text, Stack, Button, Dialog, HStack, Input, Grid,
    Textarea
} from "@chakra-ui/react";
import { supabase } from '@/api/supabaseAdmin';
import { supabaseApi } from '@/api/supabase';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export interface ProfInfoProps {
    name: string;
    phone: string;
    location: string;
    about: string;
}

// --- Edit Form ---
const EditProfForm = ({
    profile,
    onSave,
    onClose,
}: {
    profile: ProfInfoProps;
    onSave: (data: ProfInfoProps) => void;
    onClose: () => void;
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProfInfoProps>({
        defaultValues: profile,
    });

    const onSubmit = (data: ProfInfoProps) => {
        onSave(data);
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
                    <Text fontWeight="semibold" textAlign="right" mt={2}>Phone</Text>
                    <Stack gap={1}>
                        <Input
                            type='number'
                            {...register("phone", {
                                required: "Phone is required",
                                minLength: { value: 10, message: "Phone number must be 10 digits" },
                                maxLength: {
                                    value: 10, message: "Phone number must be 10 digits"
                                }
                            })}
                            variant="subtle"
                            onChange={(e) => {
                                const onlyValid = e.target.value.replace(/[^0-9+\-\s]/g, "");
                                e.target.value = onlyValid;
                            }}
                        />
                        {errors.phone && <Text color="red.400" fontSize="xs">{errors.phone.message}</Text>}
                    </Stack>
                </Grid>

                <Grid templateColumns="110px 1fr" alignItems="start" gap={4}>
                    <Text fontWeight="semibold" textAlign="right" mt={2}>Location</Text>
                    <Stack gap={1}>
                        <Input {...register("location", { required: "Location is required" })} variant="subtle" />
                        {errors.location && <Text color="red.400" fontSize="xs">{errors.location.message}</Text>}
                    </Stack>
                </Grid>

                <Grid templateColumns="110px 1fr" alignItems="start" gap={4}>
                    <Text fontWeight="semibold" textAlign="right" mt={2}>About</Text>
                    <Stack gap={1}>
                        <Textarea {...register("about", { required: "Description is required" })} variant="subtle" />
                        {errors.about && <Text color="red.400" fontSize="xs">{errors.about.message}</Text>}
                    </Stack>
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
const ProfInfo: React.FC = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const [profile, setProfile] = useState<ProfInfoProps>({ name: "", phone: "", location: "", about: "" });
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            setUserEmail(session.user.email ?? "");
            setUserId(session.user.id);

            const response = await supabaseApi.get(`/admin_profiles?id=eq.${session.user.id}`);
            if (response.data.length > 0) {
                const { name, phone, location, about } = response.data[0];
                setProfile({ name, phone, location, about });
            }
        };
        getUser();
    }, []);

    const handleSave = async (updatedProfile: ProfInfoProps) => {
        if (!userId) return;

        try {
            const { data, error } = await supabase
                .from("admin_profiles")
                .upsert({ id: userId, ...updatedProfile }, { onConflict: "id" }) //onConflict decides which column to use to decide whether a row already exists.
                .select();

            if (error) throw error;

            if (data && data.length > 0) {
                const { name, phone, location, about } = data[0];
                setProfile({ name, phone, location, about });
                window.location.reload()
            } else {
                setProfile(updatedProfile);
            }
        } catch (error: any) {
            console.error("Error updating profile:", error.message);
            alert(`Failed to save changes: ${error.message}`);
        }
    };

    return (
        <Stack alignContent="flex-start" gap={5} bg="white" p={5} rounded="xl" flex={1} overflow="hidden">
            <Text fontWeight="medium" color="black" fontSize="xl">Profile Information</Text>

            <Stack alignContent={"flex-start"} gap={5}>
                <Text fontWeight={"medium"} color={"grey"} fontSize={"sm"} lineHeight={"tall"} wordBreak={"break-word"}>
                    {profile.about || "—"}
                </Text>

                <Grid templateColumns={"max-content 1fr"} gap={3} rowGap={5}>
                    <Text color={"black"} fontWeight={"medium"}>Full Name:</Text>
                    <Text color={"grey"} wordBreak={"break-word"}>{profile.name || "—"}</Text>

                    <Text color={"black"} fontWeight={"medium"}>Phone:</Text>
                    <Text color={"grey"} wordBreak={"break-word"}>{profile.phone || "—"}</Text>

                    <Text color={"black"} fontWeight={"medium"}>Email:</Text>
                    <Text color={"grey"} wordBreak={"break-word"}>{userEmail || "—"}</Text>

                    <Text color={"black"} fontWeight={"medium"}>Location:</Text>
                    <Text color={"grey"} wordBreak={"break-word"}>{profile.location || "—"}</Text>

                    <Text color={"black"} fontWeight={"medium"}>Socials:</Text>
                    <Box display={"flex"} gap={4} color={"grey"} fontSize={"xl"}>
                        <FaFacebook cursor={"pointer"} />
                        <FaInstagram cursor={"pointer"} />
                        <FaLinkedin cursor={"pointer"} />
                        <FaGithub cursor={"pointer"} />
                    </Box>
                </Grid>
            </Stack>

            <Dialog.Root
                open={dialogOpen}
                onOpenChange={(details) => setDialogOpen(details.open)}
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
                            <Dialog.Title fontSize="xl">Edit Profile</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <EditProfForm
                                profile={profile}
                                onSave={handleSave}
                                onClose={() => setDialogOpen(false)}
                            />
                        </Dialog.Body>
                        <Dialog.CloseTrigger />
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
        </Stack>
    );
};

export default ProfInfo;