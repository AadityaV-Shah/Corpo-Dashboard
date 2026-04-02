import { useState, useEffect } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { FaFile } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { supabaseApi } from "@/api/supabase";

interface DashInfoProps {
    t_money: string,
    t_users: string,
    n_clients: string,
    t_sales: string
}

const InfoNumbers: React.FC = () => {

    const [dashInfo, setDashInfo] = useState<DashInfoProps>({
        t_money: "",
        t_users: "",
        n_clients: "",
        t_sales: "",
    });

    useEffect(() => {
        const getInfo = async () => {
            const response = await supabaseApi.get(`/dash_info?id=eq.1`);
            if (response.data.length > 0) {
                const { t_money, t_users, n_clients, t_sales } = response.data[0];
                setDashInfo({ t_money, t_users, n_clients, t_sales });
            }
        };
        getInfo();
    }, []);

    return (
        <Box w={{ base: 'full', lg: 'full' }} h={{ base: 'auto', lg: '100px' }} gap="5" pt="10px" display={"flex"}
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent={{ base: "center", lg: "space-between" }}
            alignItems={{ base: "center", lg: "center" }}>

            <Box w={{ base: '100%', lg: '25%' }} px="5" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                <Stack gap="1">
                    <Text fontSize="14px" fontWeight="medium" color="gray">Todays Money</Text>
                    <Text fontSize="lg" fontWeight="bold">${dashInfo.t_money ? Number(dashInfo.t_money).toLocaleString('en-US') : "—"}</Text>
                </Stack>
                <FaWallet size="30px" color="teal" />
            </Box>
            <Box w={{ base: '100%', lg: '25%' }} px="5" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                <Stack gap="1">
                    <Text fontSize="14px" fontWeight="medium" color="gray">Todays Users</Text>
                    <Text fontSize="lg" fontWeight="bold">{dashInfo.t_users ? Number(dashInfo.t_users).toLocaleString('en-US') : "—"}</Text>
                </Stack>
                <CiGlobe size="30px" color="teal" />
            </Box>
            <Box w={{ base: '100%', lg: '25%' }} px="5" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                <Stack gap="1">
                    <Text fontSize="14px" fontWeight="medium" color="gray">New Clients</Text>
                    <Text fontSize="lg" fontWeight="bold">+{dashInfo.n_clients ? Number(dashInfo.n_clients).toLocaleString('en-US') : "—"}</Text>
                </Stack>
                <FaFile size="30px" color="teal" />
            </Box>
            <Box w={{ base: '100%', lg: '25%' }} px="5" display="flex" py="2" bg="white" color="Black" borderRadius="xl" justifyContent="space-between" alignItems="center">
                <Stack gap="1">
                    <Text fontSize="14px" fontWeight="medium" color="gray">Total Sales</Text>
                    <Text fontSize="lg" fontWeight="bold">${dashInfo.t_sales ? Number(dashInfo.t_sales).toLocaleString('en-US') : "—"}</Text>
                </Stack>
                <FaShoppingCart size="30px" color="teal" />
            </Box>
        </Box>
    );
};

export default InfoNumbers

