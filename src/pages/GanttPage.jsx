import { Divider } from "@mui/material";
import ProjectOptions from "../components/layout/ProjectOptions";
import Hamburguesa from "../components/dashboard/Hamburguesa";
import GanttItem from "../components/gantt/ganttItem";
import "wx-react-gantt/dist/gantt.css";
import { useState } from "react";
import { useAccountStore } from "../store/useAccountStore"; 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GanttPage() {

    const [options, setOptions] = useState({
        workbook: "",
        workbook_name: "",
        project: null,
        projectName: "",
    });

    const account = useAccountStore(state => state.account);
    const navigate = useNavigate();

    useEffect(() => {
        if (!account) {
            navigate("/login");
        }
    }, [account]);
    
    return (
        <>

            <div className="flex w-full">
                <Hamburguesa options={options} setOptions={setOptions}></Hamburguesa>

                <div className="w-full px-6">
                    <ProjectOptions workbook_name={options.workbook_name} projectName={options.projectName} ></ProjectOptions>


                    <GanttItem
                        project={options.project}

                    ></GanttItem>

                </div>
            </div>
        </>
    )
}

export default GanttPage;