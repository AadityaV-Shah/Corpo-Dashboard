import { useState } from "react";

export function useDialog() {

    const [dialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);
    const toggleDialog = () => setDialogOpen(prev => !prev);

    return { dialogOpen, openDialog, closeDialog, toggleDialog };
}
