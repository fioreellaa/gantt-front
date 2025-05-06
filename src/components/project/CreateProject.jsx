import { TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useProjects } from "../../hooks/useProjects";

function CreateProject ({openDialog, setOpenDialog, onProjectCreated, idWorkbook}){

    const [projectName, setProjectName] = useState("");
    const { saveProject } = useProjects();

    const handleCreate = async () => {
        if (!projectName.trim()) {
            alert("El nombre no puede estar vacío.");
            return;
        }
        console.log("Enviando project_name:", projectName, "idWorkbook:", idWorkbook);

        const success = await saveProject({ idWorkbook, projectName });

        if (!success) {
            console.error("Error al crear proyecto");
        } else {
            console.log("Proyecto creado con éxito!");
            setProjectName("");
            setOpenDialog(false);
            if (typeof onProjectCreated === "function") {
                onProjectCreated(); 
            }
        }
    };

    return (
        <>
        <div>
                <h1 className="text-xl py-8 px-4">New Project</h1>
                <Divider></Divider>
                <div className="flex flex-col  justify-center p-4">


                    <h1 className="font-bold">Project name:</h1>
                    <TextField
                        className="pb-4"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)
                            
                        }
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

export default CreateProject;