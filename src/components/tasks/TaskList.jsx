import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { Divider } from "@mui/material";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useState, useEffect } from "react";
import { getSections, getSectionsByProject, saveSection } from "../../services/sectionCalls";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditIcon from '@mui/icons-material/Edit';


function TaskList({ project, filters, setFilters, collapsedSections, setCollapsedSections, setTaskSections }) {
/*
    const [sections, setSections] = useState([]);
    const [tasksBySection, setTasksBySection] = useState({});

    const loadSections = async () => {
        const [data, error] = await getSectionsByProject(project.id_project);
        if (error) {
            console.error("Error fetching sections:", error);
            return;
        }
        /*
        setCollapsedSections(prevState => {
            const updatedMap = { ...prevState };
            data.forEach(section => {
                if (!(section.id_section in updatedMap)) {
                    updatedMap[section.id_section] = false;
                }
            });
            return updatedMap;
        });
        setSections(data);
        await loadTasks(data);
    }

    const loadTasks = async (sectionsList) => {
        const tasksMap = {};

        for (const section of sectionsList) {
            const [tasks, error] = await getTasksBySection(section.id_section);
            if (!error) {
                tasksMap[section.id_section] = tasks;
            } else {
                console.error(`Error loading tasks for section ${section.id_section}:`, error);
            }
        }

        setTasksBySection(tasksMap);

        const sectionsWithTasks = sectionsList.map(section => ({
            ...section,
            tasks: tasksMap[section.id_section] || []
        }));

        setTaskSections(sectionsWithTasks);
    }

    const [activeSectionId, setActiveSectionId] = useState(null);

    useEffect(() => {
        if (project && project.id_project) {
            loadSections();
        } else {
            console.warn("No project selected, skipping section fetch.");
        }
    }, [project]);

    const toggleCollapse = (sectionId) => {
        setCollapsedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }))
    }

    //INPUT 
    const [inputVisibleFor, setInputVisibleFor] = useState(null);
    const [inputValue, setInputValue] = useState("");


    const handleCreateInput = async () => {
        if (!inputValue.trim()) return alert("El nombre no puede estar vacío.");

        if (inputVisibleFor === "task") {
            const success = await saveTask({
                id_section: { id_section: activeSectionId },
                name_task: inputValue
            });

            if (!success) return console.error("Error al crear la tarea");
        } else if (inputVisibleFor === "section") {
            const success = await saveSection({
                id_project: { id_project: project.id_project },
                name_section: inputValue
            });

            if (!success) return console.error("Error al crear la sección");
        }

        // Limpiar
        setInputValue("");
        setInputVisibleFor(null);
        setActiveSectionId(null);
        await loadSections();
    };
*/
    return (
        <>
            
            

        </>
    )
}
export default TaskList;