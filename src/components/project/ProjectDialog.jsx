import { useState } from "react";
import { Dialog, DialogContent, CircularProgress } from "@mui/material";
import CreateProject from "./CreateProject";

const backdropStyle = {
    backdrop: {
        style: { backgroundColor: "rgba(0, 0, 0, 0.700)" }
    }
}

function ProjectDialog({ openDialog, setOpenDialog, dialogType, onProjectCreated, idWorkbook }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpenDialog(false)
        setTimeout(() => {
            setError(null)
        }, 300)
    }

    const renderContent = () => {
        switch (dialogType) {
            case "new":
                return <CreateProject
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    onProjectCreated={onProjectCreated}
                    idWorkbook = {idWorkbook} />;
            case "settings":
                return <SettingsProject />;
            default:
                return null;
        }
    };

    return (
        <>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                maxWidth={"xs"}
                fullWidth={true}
                slotProps={backdropStyle}
            >


                <DialogContent>{renderContent()}</DialogContent>


                {error !== null && (
                    <p className="text-red-600">{error}</p>
                )}
                <button
                    disabled={loading}
                >
                    {loading && <CircularProgress color="warning" thickness={8} size={20} />}
                </button>


            </Dialog>

        </>
    );

}

export default ProjectDialog;   