import AddBoxIcon from '@mui/icons-material/AddBox';
import { useEffect, useState } from 'react';
import { getProjectsByWorkbook } from '../../services/projectCalls';
import ProjectDialog from '../project/ProjectDialog';
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentIcon from '@mui/icons-material/Assignment';

const iconToTextfield = {
    input: {
        endAdornment: (
            <InputAdornment position="end">
                <SearchIcon />
            </InputAdornment>
        )
    }
}
function ProjectDash({ options }) {

    const [project, setProject] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState(null);

    const [search, setSearch] = useState('');

    const handleOpenDialog = (type) => {
        setDialogType(type);
        setOpenDialog(true);
    };

    const loadProjects = async () => {
        const [data, error] = await getProjectsByWorkbook(options.workbook?.id_workbook);
        if (error) {
            console.error("Error fetching projects:", error);
            return;
        }
        setProject(data);
    };

    const filteredProjects = project.filter(p =>
        p.name_project.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (options.workbook?.id_workbook) {
            loadProjects();
        }
    }, [options.workbook?.id_workbook]);


    return (
        <>
            <div className="project-dash border p-2">
                <div className='flex justify-between items-center px-2 mx-2"'>

                    <div className='text-xxl font-bold'>
                        PROJETCS
                    </div>
                    <div className='flex justify-end p2 m-2'>
                        <AddBoxIcon
                            className='text-xxl text-blue-400 font-bold cursor-pointer hover:text-blue-500'
                            onClick={() => handleOpenDialog("new")}
                        />
                    </div>

                </div>
                <TextField
                    className="w-full border p-2 "
                    label="Search projects"
                    value={search}
                    slotProps={iconToTextfield}
                    onChange={(c) => setSearch(c.target.value)}
                    InputProps={iconToTextfield.input}

                />
                <div className="project-list mt-4">
                    {filteredProjects.length === 0 ? (
                        <p className="text-gray-500">No projects found.</p>
                    ) : (
                        filteredProjects.map((p) => (
                            <div key={p.id_project} className="p-2 my-2 flex hover:text-blue-500 cursor-pointer" onClick={() => handleOpenDialog("settings")}>
                                <AssignmentIcon className="text-xxl mr-3 text-blue-400 " />
                                <h3 className="text-xxl">{p.name_project}</h3>
                            </div>
                        ))
                    )}
                </div>



            </div>

            <ProjectDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                dialogType={dialogType}
                onProjectCreated={loadProjects}
                idWorkbook={options.workbook?.id_workbook}
            />
        </>

    );
}

export default ProjectDash;