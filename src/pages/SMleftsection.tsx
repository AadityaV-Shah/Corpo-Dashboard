import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FieldMenu } from "../components/Dropdown";
import {
    LayoutDashboard,
    Pencil,
    BanknoteArrowUp,
    BadgeDollarSign,
    User,
    Rocket,
    Info,
} from "lucide-react";

const menuItems = [
    { name: "Home", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Mentors", icon: Pencil, path: "/mentors" },
    { name: "Markets", icon: BanknoteArrowUp, path: "/markets" },
    { name: "Pricing", icon: BadgeDollarSign, path: "/pricing" },
    { name: "Users", icon: User, path: "/userz" },
    { name: "Projects", icon: Rocket, path: "/projects" },
    { name: "About Us", icon: Info, path: "/about" },
];

const allOptions = menuItems.map((item) => item.name);

export default function MyPage() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const currentItem = menuItems.find((item) => item.path === pathname);
    const [value, setValue] = useState(currentItem?.name ?? "");

    // Resetting to placeholder if pathname doesn't match any menu item
    useEffect(() => {
        const matched = menuItems.find((item) => item.path === pathname);
        setValue(matched?.name ?? "");
    }, [pathname]);

    function handleChange(selected: string) {
        setValue(selected);
        const item = menuItems.find((m) => m.name === selected);
        if (item) navigate(item.path);
    }

    return (
        <FieldMenu
            value={value}
            onChange={handleChange}
            placeholder="Menu"
            options={allOptions}
        />
    );
}