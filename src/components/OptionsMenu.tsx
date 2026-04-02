import {
    Menu,
    IconButton,
    Icon,
    Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { MdLogout } from "react-icons/md";
import { ChevronDown } from "lucide-react";

export default function OptionsMenu() {
    return (
        <Menu.Root positioning={{ placement: "bottom-end" }}>

            <Menu.Trigger asChild>
                <IconButton
                    aria-label="Options"
                    variant="outline"
                    color="black"
                    rounded={'2xl'}
                    bg="transparent"
                    _hover={{
                        borderColor: "white",
                        bg: "whiteAlpha.100",
                        focusRing: 'none',
                    }}
                    transition="all 0.2s"
                >
                    <Icon as={ChevronDown} boxSize={5} />
                </IconButton>
            </Menu.Trigger>

            <Menu.Positioner>
                <Menu.Content
                    bg="#0c1017"
                    color="white"
                    borderColor="whiteAlpha.200"
                    boxShadow="lg"
                    py={2}
                >

                    {/* Profile */}
                    <Link to="/profile1">
                        <Menu.Item value="profile" _hover={{ bg: "#181e29" }}>
                            <Text>Profile</Text>
                        </Menu.Item>    
                    </Link>

                    <Menu.Item value="account" _hover={{ bg: "#181e29" }}>
                        My account
                    </Menu.Item>

                    <Menu.Separator />

                    <Menu.Item value="add-account" _hover={{ bg: "#181e29" }}>
                        Add another account
                    </Menu.Item>

                    <Menu.Item value="settings" _hover={{ bg: "#181e29" }}>
                        Settings
                    </Menu.Item>

                    <Menu.Separator />

                    {/* Logout */}
                    <Menu.Item
                        value="logout"
                        _hover={{ bg: "#181e29" }}
                        p={0} // Remove padding from Item so the Link fills the space
                    >
                        <Link
                            to="/"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                padding: "0.5rem 0.75rem" // Match your menu's standard padding
                            }}  
                        >
                            <Text>Logout</Text>
                            <Icon as={MdLogout} boxSize={4} ml={4} />
                        </Link>
                    </Menu.Item>

                </Menu.Content>
            </Menu.Positioner>

        </Menu.Root>
    );
}