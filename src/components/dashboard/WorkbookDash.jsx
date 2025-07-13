import { useEffect, useState } from "react";
import { TextField, MenuItem, Divider } from "@mui/material";
import { getWorkbooks } from "../../services/workbookCalls";
import WorkbookDialog from "../workbook/WorkbookDialog";

function DashOptions({ options, setOptions }) {
    const [workbook, setWorkbook] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState(null);
    

    const handleOpenDialog = (type) => {
        setDialogType(type);
        setOpenDialog(true);
    };

    const loadWorkbooks = async () => {
        const [data, error] = await getWorkbooks();
        if (error) {
            console.error("Error fetching workbooks:", error);
            return;
        }
        setWorkbook(data);
    };

    const handleTypeSelect = (e) => {
        const selectedId = e.target.value;
        const selected = workbook.find(w => w.id_workbook === selectedId);
        setOptions(prev => ({
            ...prev,
            workbook: selected || {},
            workbook_name: selected?.workbook_name,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                loadWorkbooks();
                //console.log("workbooks:", workbook);

            } catch (error) {
                console.error("Error fetching workbooks:", error);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <div className="dash-options border p-2 ">
                <TextField
                    label="Worbook"
                    className="w-full "
                    select
                    onChange={handleTypeSelect}
                    value={options.workbook?.id_workbook || ""}
                >
                    {workbook.map(w => (
                        <MenuItem key={w.id_workbook} value={w.id_workbook}>
                            {w.workbook_name}
                        </MenuItem>
                    ))}
                    <Divider></Divider>
                    <MenuItem value="" onClick={() => handleOpenDialog("new")} >+ New Workbook</MenuItem>
                </TextField>
                <button className="w-full bg-gray-300 text-gray-500 px-4 py-2 mt-2 rounded hover:bg-gray-200"
                    onClick={() => handleOpenDialog("settings")}
                >
                    Settings

                </button>

            </div>
            
            <WorkbookDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                dialogType={dialogType}
                onWorkbookCreated={loadWorkbooks}
                selectedWorkbookId={options.workbook?.id_workbook}
                workbookName={options.workbook_name}
                setOptions={setOptions}
            ></WorkbookDialog>
        </>
    )
}

export default DashOptions;