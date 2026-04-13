import React from "react";
import {
    Badge
} from "@chakra-ui/react";

interface BadgeProps {
    notif?: string,
    position?: string,
    top?: string,
    left?: string,
}

const CBadge: React.FC<BadgeProps> = ({ notif, position, top, left }) => {
    return (
        <Badge
            colorPalette={'red'}
            variant="solid"
            px={2}
            fontSize={"2xs"}
            borderRadius="full"
            position={position}
            top={top}
            left={left}
        >
            {notif}
        </Badge>
    );
};

export default CBadge