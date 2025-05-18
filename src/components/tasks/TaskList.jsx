import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { Divider } from "@mui/material";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useState, useEffect } from "react";
import { getSections, getSectionsByProject, saveSection } from "../../services/sectionCalls";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { getTasksBySection, saveTask } from "../../services/taskCalls";

const index = 0;


function TaskList({ project, filters, setFilters, collapsedSections, setCollapsedSections }) {

    const [sections, setSections] = useState([]);
    const [tasksBySection, setTasksBySection] = useState({});

    const loadSections = async () => {
        const [data, error] = await getSectionsByProject(project.id_project);
        if (error) {
            console.error("Error fetching sections:", error);
            return;
        }
        const collapsedMap = {};
        data.forEach(section => {
            collapsedMap[section.id_section] = false;
            setCollapsedSections(collapsedMap);

        })
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
    }

    const [activeSectionId, setActiveSectionId] = useState(null);
    const [newSectionName, setNewSectionName] = useState("");


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

    const handleCreate = async () => {
        if (!newSectionName.trim()) {
            alert("El nombre no puede estar vacío.");
            return;
        }

        const success = await saveSection({
            id_project: { id_project: project.id_project },
            name_section: newSectionName
        });

        if (!success) {
            console.error("Error al crear la sección");
        } else {
            console.log("Seccion creada con éxito!");
            setNewSectionName("");
            setActiveSectionId(null);
            loadSections();
        }
    }

    //TASKS
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [newTaskName, setNewTaskName] = useState("");
    
    const handleCreateTask = async () => {
        if (!newTaskName.trim()) {
            alert("El nombre no puede estar vacío.");
            return;
        }

        const success = await saveTask({
            id_section: { id_section: activeTaskId },
            name_task: newTaskName
        });

        if (!success) {
            console.error("Error al crear la tarea");
        } else {
            console.log("Tarea creada con éxito!");
            setNewTaskName("");
            setActiveTaskId(null);
            loadSections();
        }
    
    }

    return (
        <>
            {sections.length === 0 ? (

                <div className="my-3">
                    <div className='flex gap-2 ml-10'>
                        <KeyboardArrowUpRoundedIcon
                            className={`text-blue-500 transition-transform duration-300 cursor-pointer ''}`}
                            style={{ fontSize: '1rem' }}
                        />
                        <h1 className='text-sm font-bold text-gray-500'>Section 1</h1>
                    </div>
                    <div
                        className={`ml-10 mt-2 transition-all duration-300 ease-in-out overflow-hidden  'max-h-40 opacity-100'}`}
                    >
                        <Divider />
                        <div className='flex gap-4 mt-2 ' >
                            <button className="bg-sky-500 text-white text-xs px-2 py-1 rounded hover:bg-sky-600 flex gap-2">
                                <AddRoundedIcon style={{ fontSize: '1rem' }}> </AddRoundedIcon> Add task
                            </button>
                            <button className="border border-sky-500 text-sky-500 text-xs px-2 py-1 rounded hover:border-sky-600 hover:text-sky-600 flex gap-2">
                                <AddRoundedIcon style={{ fontSize: '1rem' }}> </AddRoundedIcon> Add Section

                            </button>
                        </div>

                    </div>
                </div>
            ) : (
                sections.map((section) => (
                    <div className="my-3" key={section.id_section}>
                        <div className='flex gap-2 ml-10'>
                            <KeyboardArrowUpRoundedIcon
                                className={`text-blue-500 transition-transform duration-300 cursor-pointer ${collapsedSections[section.id_section] ? 'rotate-180' : ''}`}
                                onClick={() => toggleCollapse(section.id_section)}
                                style={{ fontSize: '1rem' }}
                            />
                            <h1 className='text-sm font-bold text-gray-500'>{section.name_section}</h1>
                        </div>
                        <Divider sx={{ borderBottomWidth: 2 }} />

                        <div
                            className={`ml-10 transition-all duration-300 ease-in-out overflow-hidden ${collapsedSections[section.id_section] ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'}`}
                        >

                            <div className="flex text-gray-500 gap-4 text-sm">

                                <div>
                                    <div className="flex flex-col ">
                                        {tasksBySection[section.id_section]?.length > 0 ? (
                                            tasksBySection[section.id_section].map((task, index) => (
                                                <div key={task.id_task}>
                                                    <div className="flex items-center pb-2 gap-4">
                                                        <span className=''>{index + 1}</span>
                                                        <div className="flex items-center pt-2">
                                                            <CheckCircleOutlineRoundedIcon style={{ fontSize: '1.4rem' }} />
                                                            <span className="ml-2 text-sm text-gray-700">{task.name_task}</span>
                                                        </div>

                                                    </div>
                                                    <Divider />
                                                </div>


                                            ))
                                        ) : (
                                            <span className="ml-2 text-sm text-gray-400 italic">No tasks</span>
                                        )}
                                    </div>

                                    <div className='flex gap-4 mt-2 ' >
                                        {activeSectionId === section.id_section ? (
                                            <input
                                                type="text"
                                                autoFocus
                                                className="mt-2 border-b px-2 py-1 text-sm w-full outline-none focus:ring-0 focus:outline-none"
                                                placeholder="New Section Name"
                                                value={newSectionName}
                                                onChange={(e) => setNewSectionName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        if (newSectionName.trim()) {
                                                            handleCreate();
                                                        }
                                                    } else if (e.key === 'Escape') {
                                                        setNewSectionName("");
                                                        setActiveSectionId(null);

                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className='flex gap-4 mt-2 ml-10'>
                                                <button
                                                    className="bg-sky-500 text-white text-xs px-2 py-1 rounded hover:bg-sky-600 flex gap-2"
                                                    onClick={() => setActiveTaskId(task.id_task)}
                                                >
                                                    <AddRoundedIcon style={{ fontSize: '1rem' }} /> Add task
                                                </button>
                                                <button
                                                    className="border border-sky-500 text-sky-500 text-xs px-2 py-1 rounded hover:border-sky-600 hover:text-sky-600 flex gap-2"
                                                    onClick={() => setActiveSectionId(section.id_section)}
                                                >
                                                    <AddRoundedIcon style={{ fontSize: '1rem' }} /> Add Section
                                                </button>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )))}

        </>
    )
}
export default TaskList;