import { useState } from "react";
import { Dialog, DialogContent, CircularProgress } from "@mui/material";
import CreateWorkbook from "./CreateWorkbook";
import SettingsWorkbook from "./SettingsWorkbook";

const backdropStyle = {
    backdrop: {
        style: { backgroundColor: "rgba(0, 0, 0, 0.700)" }
    }
}

function WorkbookDialog({ openDialog, setOpenDialog, dialogType, onWorkbookCreated }) {
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
                return <CreateWorkbook
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    onWorkbookCreated={onWorkbookCreated}
                />;
            case "settings":
                return <SettingsWorkbook
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    onWorkbookCreated={onWorkbookCreated}
                />;
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
                    {/*cita.estado === "RESERVADA" ? "Marcar como finalizada" : "Archivar"*/}
                    {loading && <CircularProgress color="warning" thickness={8} size={20} />}
                </button>


            </Dialog>

        </>
    );

}

export default WorkbookDialog;   