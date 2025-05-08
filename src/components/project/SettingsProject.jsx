import { use, useState, useEffect } from "react";
import { Divider, TextField } from "@mui/material";
import { useProjects } from "../../hooks/useProjects";



function ProjectSettings({ openDialog, setOpenDialog, onProjectEdited, projectId }) {

    const [projectName, setProjectName] = useState("");
    const { updateStateProject, getProjectById, updateProjectName } = useProjects();
    const [loading, setLoading] = useState(false);


    const handleEdit = async () => {
        if (!projectName.trim()) {
            alert("El nombre no puede estar vacío.");
            return;
        }
        console.log("Enviando project_name:", projectName);

        const success = await updateProjectName({ id_project: projectId, projectName });

        if (!success) {
            console.error("Error al actualizar el proyecto");
        } else {
            console.log("Proyecto actualizado con éxito!");
            setProjectName("");
            setOpenDialog(false);
            if (typeof onProjectEdited === "function") {
                onProjectEdited();
            }
        }
    };

    const handleChange = async () => {
        const success = await updateStateProject(projectId);
        if (!success) {
            console.error("Error al archivar el proyecto");
        } else {
            console.log("Proyecto archivado con éxito!");
            setOpenDialog(false);
            if (typeof onProjectEdited === "function") {
                onProjectEdited();
            }
        }

    }


    useEffect(() => {
        if (!openDialog || !projectId) return;

        const fetchProject = async () => {
            const project = await getProjectById(projectId);
            if (project) {
                setProjectName(project.name_project);
            }
            setLoading(false);

        };
        fetchProject();
    }, [projectId, openDialog]);

    return (
        <>
            <div>
                <h1 className="text-xl py-8 px-4">Project Settings</h1>
                <Divider></Divider>
                <div className="flex flex-col  justify-center p-4">

                    <h1 className="font-bold">Name:</h1>
                    <TextField

                        className="pb-4"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
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
                    <button className="bg-red-500 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-red-400"
                        onClick={handleChange}>
                        Archivar

                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-green-400"
                        onClick={handleEdit}>
                        Guardar

                    </button>
                </div>
            </div>
        </>
    )
}

export default ProjectSettings;