import React, { useState } from 'react';
import {
    Stack,
    Text,
    Image,
    Box,
    Button
} from "@chakra-ui/react";
import { DataTable } from "../DataTable";
import type { Column } from "../DataTable";

interface ConvoProps {
    id: number;
    image: string;
    name: string;
    convo: string;
}

const ConvoData: ConvoProps[] = [
    {
        id: 1,
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        name: "Esthera Jackson",
        convo: "Hey hows it going?"
    },
    {
        id: 2,
        image: "https://randomuser.me/api/portraits/women/15.jpg",
        name: "Alexa Liras",
        convo: "Give me money bro"
    },
    {
        id: 3,
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        name: "Laurent Michael",
        convo: "Is the project done?"
    },
    {
        id: 4,
        image: "https://randomuser.me/api/portraits/men/12.jpg",
        name: "Freduardo Hill",
        convo: "Where you at bro?"
    }
];

const ProfConvo: React.FC = () => {

    const columns: Column<ConvoProps>[] = [

        {
            header: "",
            accessor: "name",
            render: (user) => (
                <Box display="flex" alignItems="center" gap={3}>
                    <Image src={user.image} alt={user.name} boxSize="40px" borderRadius="full" />
                    <Stack gap={0}>
                        <Text fontWeight="bold" lineHeight="short">{user.name}</Text>
                        <Text fontSize="sm" color="gray.500" lineHeight="short">{user.convo}</Text>
                    </Stack>
                </Box>
            ),
        },

        {
            header: "",
            accessor: "actions",
            render: () => (<Button bg="transparent" color={"teal"} focusRing={"none"}>REPLY</Button>),
        },

    ]

    return (
        <Stack alignContent={"flex-start"} gap={2} bg={"white"} p={5} rounded={"xl"} flex={1}>
            <Text fontWeight={"medium"} color={"black"} fontSize={"xl"}>Conversations</Text>
            <DataTable
                columns={columns}
                data={ConvoData}
                styles={{
                    cell: { background: "white", fontSize: "sm", color: "black" },
                }}
                showHeader={false}
            />
        </Stack>
    )
}

export default ProfConvo