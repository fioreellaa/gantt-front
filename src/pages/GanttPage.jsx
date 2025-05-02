import { Divider } from "@mui/material";
import ProjectOptions from "../components/layout/ProjectOptions";
import TaskFilters from "../components/tasks/TaskFilters";
import Hamburguesa from "../components/dashboard/Hamburguesa";
import { useEffect, useState } from "react";

function GanttPage() {

    const [options, setOptions] = useState({
            workbook: "",
            projectName: ""
        });

    /*useEffect(() => {
        const fetching = async () => {
            //const result = await getCitas()
            setTotalCitas([...result])
            setCitas([...result])
            setLoading(false)
        }
        fetching()
    }, []);*/

   

    return (
        <>

            <div className="flex gap-4 w-full justify-center">
                <Hamburguesa options={options} setOptions={setOptions}></Hamburguesa>
                <div className="w-1/2 mx-auto">
                    <ProjectOptions  projectName={options.projectName}></ProjectOptions>

                    <Divider className="pb-3"></Divider>

                    <TaskFilters className></TaskFilters>
                    <Divider></Divider>


                </div>
                <div className="w-1/2 mx-auto">
                    <h1>GANTT</h1>


                </div>
            </div>
        </>
    )
}

export default GanttPage;