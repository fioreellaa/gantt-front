import { TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useWorkbook } from "../../hooks/useWorkbook";

function CreateWorkbook({openDialog, setOpenDialog, onWorkbookCreated}) {

    const [workbookName, setWorkbookName] = useState("");
    const { saveWorkbook } = useWorkbook();

    const handleCreate = async () => {
        if (!workbookName.trim()) {
            alert("El nombre no puede estar vacío.");
            return;
        }
        console.log("Enviando workbook_name:", workbookName); 

        const success = await saveWorkbook({ workbookName });

        if (!success) {
            console.error("Error al crear workbook");
        } else {
            console.log("Workbook creado con éxito!");
            setWorkbookName("");
            setOpenDialog(false);
            if (typeof onWorkbookCreated === "function") {
                onWorkbookCreated(); 
            }
        }
    };

    return (
        <>
            <div>
                <h1 className="text-xl py-8 px-4">Create Worbook</h1>
                <Divider></Divider>
                <div className="flex flex-col  justify-center p-4">


                    <h1 className="font-bold">Workbook name:</h1>
                    <TextField
                        className="pb-4"
                        value={workbookName}
                        onChange={(e) => setWorkbookName(e.target.value)}
                    >

                    </TextField>



                </div>
                <Divider></Divider>
                <div className="flex justify-end pb-4 pr-4">
                    <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-400"
                    onClick={() => setOpenDialog(false)}
                    >
                        Cancel
                    </button>

                    <button className="bg-green-500 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-green-400"
                    onClick={handleCreate}>
                        Create
                        
                    </button>
                </div>
            </div>
        </>
    );
}

export default CreateWorkbook;