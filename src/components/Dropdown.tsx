import {
    Button, Menu, Portal,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";

// --- Reusable dropdown for role/department fields ---
export const FieldMenu = ({
    value,
    onChange,
    placeholder,
    options,
}: {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
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