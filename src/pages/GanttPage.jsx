import { Divider } from "@mui/material";
import ProjectOptions from "../components/layout/ProjectOptions";
import TaskFilters from "../components/tasks/TaskFilters";
import Hamburguesa from "../components/dashboard/Hamburguesa";
import { useEffect, useState } from "react";
import TaskList from "../components/tasks/TaskList";
import GanttItem from "../components/gantt/ganttItem";
import "wx-react-gantt/dist/gantt.css";
import { defaultEditorShape } from "wx-react-gantt";


function GanttPage() {

    const [options, setOptions] = useState({
        workbook: "",
        workbook_name: "",
        project: "",
        projectName: ""
    });

    


    return (
        <>

            <div className="flex w-full">
                <Hamburguesa options={options} setOptions={setOptions}></Hamburguesa>

                <div className="w-full px-6">
                    <ProjectOptions workbook_name={options.workbook_name} projectName={options.projectName}></ProjectOptions>

                    
                    <GanttItem
                      project={options.project}
                        
                    ></GanttItem>

                </div>
            </div>
        </>
    )
}

export default GanttPage;