import { Divider, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { getProjects } from "../../services/projectCalls";
import { useEffect, useState } from "react";
import { useWorkbook } from "../../hooks/useWorkbook";

function SettingsWorkbook({ openDialog, setOpenDialog, currentWorkbookId, workbookName, onWorkbookEdited, setOptions }) {

  const [projects, setProjects] = useState([]);
  const [workbookNewName, setWorkbookNewName] = useState(workbookName || "");

  const loadProjects = async () => {
    const [data, error] = await getProjects();
    if (error) {
      console.error("Error fetching projects:", error);
      return;
    }
    const filtered = data.filter(
      (projects) =>
        projects.id_workbook === currentWorkbookId && projects.state === 1
    );
    setProjects(filtered);
  };

  useEffect(() => {
    if (currentWorkbookId) {
      //console.log("Using workbook ID:", currentWorkbookId); 
      loadProjects();
    }
  }, [currentWorkbookId]);

  useEffect(() => {
    setWorkbookNewName(workbookName || "");
        onWorkbookEdited(workbookNewName); 

  }, [workbookName]);

  const { updateWorkbook } = useWorkbook()

  const handleEditWorkbook = async () => {
    const [data, error] = await updateWorkbook({ currentWorkbookId, workbookName: workbookNewName });

    if (error) {
      console.error("Error al editar workbook:", error);
      alert("No se pudo editar el nombre del workbook");
      return;
    }

    onWorkbookEdited(workbookNewName);
    
    setOptions(prev => ({
    ...prev,
    workbook_name: workbookNewName,
    workbook: {
      ...prev.workbook,
      workbook_name: workbookNewName,
    },
  }));
  };


  return (
    <>

      <div className="max-w-xl mx-auto  border rounded-2xl shadow-lg p-6 bg-white space-y-6">
        Workbook
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Project name</h1>
        </div>

        {/* TextField + Edit button */}
        <div className="flex items-end gap-4">
          <TextField
            className="flex-1"
            //label="Enter workbook name"
            variant="outlined"
            value={workbookNewName}
            onChange={(e) => setWorkbookNewName(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-400 transition"
            onClick={handleEditWorkbook}>
            Edit
          </button>
        </div>

        {/* Lista de proyectos */}
        <div className="space-y-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm"
            >
              <span className="text-gray-800 font-medium">{project.name_project}</span>
              <div className="flex gap-2">
                <button
                /*onClick={() => handleConfig(project)}
                className="text-blue-500 hover:text-blue-700"*/
                >
                  <SettingsIcon size={20} />
                </button>
                <button
                /*onClick={() => handleDelete(project)}
                className="text-red-500 hover:text-red-700"*/
                >
                  <DeleteIcon size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cierre */}
        <div className="flex justify-end pt-2">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            onClick={() => setOpenDialog(false)}
          >
            Close
          </button>
        </div>
      </div>


    </>
  );
}

export default SettingsWorkbook;