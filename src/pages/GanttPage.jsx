import { Divider } from "@mui/material";
import ProjectOptions from "../components/layout/ProjectOptions";
import TaskFilters from "../components/tasks/TaskFilters";
import Hamburguesa from "../components/dashboard/Hamburguesa";
import { useEffect, useState } from "react";
import TaskList from "../components/tasks/TaskList";

function GanttPage() {

    const [options, setOptions] = useState({
        workbook: "",
        workbook_name: "",
        project: "",
        projectName: ""
    });

    const [filters, setFilters] = useState({});
    const [collapsedSections, setCollapsedSections] = useState({});

    return (
        <>

            <div className="flex w-full">
                <Hamburguesa options={options} setOptions={setOptions}></Hamburguesa>
                <div className="w-1/2 px-6">
                    <ProjectOptions workbook_name={options.workbook_name} projectName={options.projectName}></ProjectOptions>

                    <Divider className="pb-3"></Divider>

                    <TaskFilters
                        filters={filters}
                        setFilters={setFilters}
                        collapsedSections={collapsedSections}
                        setCollapsedSections={setCollapsedSections}
                    />

                    <Divider></Divider>

                    <TaskList
                        project={options.project}
                        filters={filters}
                        setFilters={setFilters}
                        collapsedSections={collapsedSections}
                        setCollapsedSections={setCollapsedSections}
                    />

                </div>
                <div className="w-1/2 px-6">
                    <h1>GANTT</h1>


                </div>
            </div>
        </>
    )
}

export default GanttPage;