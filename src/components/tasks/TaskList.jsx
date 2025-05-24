import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { Divider } from "@mui/material";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useState, useEffect } from "react";
import { getSections, getSectionsByProject, saveSection } from "../../services/sectionCalls";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { getTasksBySection, saveTask } from "../../services/taskCalls";
import EditIcon from '@mui/icons-material/Edit';



function TaskList({ project, filters, setFilters, collapsedSections, setCollapsedSections }) {

    const [sections, setSections] = useState([]);
    const [tasksBySection, setTasksBySection] = useState({});

    const loadSections = async () => {
        const [data, error] = await getSectionsByProject(project.id_project);
        if (error) {
            console.error("Error fetching sections:", error);
            return;
        }
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

    return (
        <>
            {sections.length === 0 ? (

                <div className="my-3">
                    <div className="ml-10 mt-2 transition-all duration-300 ease-in-out overflow-hidden max-h-40 opacity-100">
                        <span className="ml-2 text-sm text-gray-400 italic">No tasks</span>

                        <div className="flex gap-4 mt-2">
                            {inputVisibleFor ? (
                                <input
                                    type="text"
                                    autoFocus
                                    className="border-b px-2 py-1 text-sm w-full outline-none focus:ring-0"
                                    placeholder={inputVisibleFor === 'task' ? "New task name" : "New section name"}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleCreateInput();
                                        else if (e.key === "Escape") {
                                            setInputValue("");
                                            setInputVisibleFor(null);
                                        }
                                    }}
                                />
                            ) : (
                                <>
                                    <button
                                        className="bg-sky-500 text-white text-xs px-2 py-1 rounded hover:bg-sky-600 flex gap-2"
                                        onClick={() => {
                                            setInputVisibleFor("task");
                                        }}
                                    >
                                        <AddRoundedIcon style={{ fontSize: '1rem' }} /> Add task
                                    </button>
                                    <button
                                        className="border border-sky-500 text-sky-500 text-xs px-2 py-1 rounded hover:border-sky-600 hover:text-sky-600 flex gap-2"
                                        onClick={() => {
                                            setInputVisibleFor("section");
                                        }}
                                    >
                                        <AddRoundedIcon style={{ fontSize: '1rem' }} /> Add section
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                (() => {
                    let index = 0;
                    return sections.map((section) => (
                        <div className="my-3 justify-between items-center " key={section.id_section}>
                            <div className='flex gap-2 ml-10'>
                                <KeyboardArrowUpRoundedIcon
                                    className={`text-blue-500 transition-transform duration-300 cursor-pointer ${collapsedSections[section.id_section] ? 'rotate-180' : ''}`}
                                    onClick={() => toggleCollapse(section.id_section)}
                                    style={{ fontSize: '1rem' }}
                                />
                                <h1 className='text-sm font-bold text-gray-500'>{section.name_section}</h1>

                                <EditIcon
                                    className='text-gray-500 cursor-pointer hover:text-blue-500'
                                    style={{ fontSize: '1rem' }}
                                />
                            </div>
                            <Divider sx={{ borderBottomWidth: 2 }} />

                            <div
                                className={`ml-10 transition-all duration-300 ease-in-out overflow-hidden ${collapsedSections[section.id_section] ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'}`}
                            >

                                <div className="text-gray-500 gap-4 text-sm">

                                    <div>
                                        <div className="flex flex-col ">

                                            {tasksBySection[section.id_section]?.length > 0 ? (
                                                tasksBySection[section.id_section].map((task) => {
                                                    index++;
                                                    return (
                                                        <div key={task.id_task} className='grid grid-cols-[0.2fr_2.3fr_1fr_1fr_1fr_1fr] items-center border-b py-2'>
                                                            
                                                                <span className='text-sm text-gray-700 border-b' style={{ borderBottom: 'none' }}>{index}</span>
                                                                <div className="flex items-center">
                                                                    <CheckCircleOutlineRoundedIcon style={{ fontSize: '1.4rem' }} />
                                                                    <span className="ml-2 text-sm text-gray-700 ">{task.name_task}</span>

                                                                </div>
                                                                <span className="ml-2 text-sm text-gray-400 italic">{task.asignee ? task.asignee : "-"}</span>
                                                                <span className="ml-2 text-sm text-gray-400 italic">{task.start_date ? task.start_date : "-"}</span>
                                                                <span className="ml-2 text-sm text-gray-400 italic">{task.end_date ? task.end_date : "-"}</span>
                                                                <span className="ml-2 text-sm text-gray-400 italic">{task.state ? task.state : "-"}</span>

                                                            
                                                            <Divider />
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <span className="ml-2 text-sm text-gray-400 italic">No tasks</span>
                                            )}
                                        </div>

                                        {/**/}
                                        <div className="flex gap-4 mt-2 mb-2 ">
                                            {inputVisibleFor && activeSectionId === section.id_section ? (
                                                <input
                                                    type="text"
                                                    autoFocus
                                                    className="border-b px-2 py-1 text-sm w-full outline-none focus:ring-0"
                                                    placeholder={inputVisibleFor === 'task' ? "New task name" : "New section name"}
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") handleCreateInput();
                                                        else if (e.key === "Escape") {
                                                            setInputValue("");
                                                            setInputVisibleFor(null);
                                                            setActiveSectionId(null);
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    <button
                                                        className="bg-sky-500 text-white text-xs px-2 py-1 rounded hover:bg-sky-600 flex gap-2"
                                                        onClick={() => {
                                                            setInputVisibleFor("task");
                                                            setActiveSectionId(section.id_section);
                                                            setInputValue("");
                                                        }}
                                                    >
                                                        <AddRoundedIcon style={{ fontSize: '1rem' }} /> Add task
                                                    </button>
                                                    <button
                                                        className="border border-sky-500 text-sky-500 text-xs px-2 py-1 rounded hover:border-sky-600 hover:text-sky-600 flex gap-2"
                                                        onClick={() => {
                                                            setInputVisibleFor("section");
                                                            setActiveSectionId(section.id_section);
                                                            setInputValue("");
                                                        }}
                                                    >
                                                        <AddRoundedIcon style={{ fontSize: '1rem' }} /> Add section
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        {/**/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                })())}

        </>
    )
}
export default TaskList;