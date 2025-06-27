import { Gantt } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import React, { useRef, useEffect, useState } from "react";
import "wx-react-gantt/dist/gantt.css";
import { defaultEditorShape } from "wx-react-gantt";
import { Willow } from "wx-react-gantt";
import { getTasksByProject } from "../../services/taskCalls";
import { saveTask } from "../../services/taskCalls";
import { BASE_URL } from "../../constants/services";
import { RestDataProvider } from "wx-gantt-data-provider";


function GanttItem({ project }) {

  const [tasks, setTasks] = useState([]);
  const [links, setLinks] = useState([]);

  const columns = [
    {
      id: "text",
      header: "Task name",
      flexgrow: 5
    },
    {
      id: "start",
      header: "Start date",
      flexgrow: 2,
      align: "center",
    },
    {
      id: "end",
      header: "End date",
      align: "center",
      flexgrow: 2,
    },
    {
      id: "state",
      header: "Status",
      flexgrow: 2,
      align: "center",
      template: (state) => {
        const statusMap = {
          1: "Not Started",
          2: "Started",
          3: "In Progress",
          4: "Finished",
          5: "Approval requested",
          6: "Approved",
          7: "Rejected",

        };
        return statusMap[state] || "Unknown";
      }
    },
    {
      id: "action",
      header: "",
      width: 50,
      align: "center",
    },

  ];

  const customBox = {
    key: "state",
    type: "select",
    label: "Status",

    options: [
      { id: 1, label: "Not Started" },
      { id: 2, label: "Started" },
      { id: 3, label: "In Progress" },
      { id: 4, label: "Finished" },
      { id: 5, label: "Approval requested" },
      { id: 6, label: "Approved" },
      { id: 7, label: "Rejected" },
      { id: 0, label: "Unknown" }
    ],
    config: {
      searchable: true,
      multiple: false
    }

  };

  const editorShape = [
    ...defaultEditorShape,
    customBox
  ];

  const scales = [
    { unit: "month", step: 1, format: "MMMM yyyy" },
    { unit: "day", step: 1, format: "d" },
  ];

  const loadTasksAndLinks = async () => {
    const [data, error] = await getTasksByProject(project.id_project);
    console.log("Tasks and links data:", data);
    if (error) {
      console.error("Error fetching sections with tasks:", error);
      return;
    }

    const transformedTasks = (data || []).map((task) => ({
      id: task.id_task,
      text: task.name_task,
      start: task.start_date,
      end: task.end_date,
      progress: task.progress ?? 0,
      state: task.state ?? 1,
      type: task.type === 1
        ? "summary"
        : task.type === 2
          ? "task"
          : task.type === 3
            ? "milestone"
            : "task",
      parent: task.parent_id ?? null
    }));

    let links = [];
    try {
      const res = await fetch(`${BASE_URL}/links`);
      const linksData = await res.json();

      links = (linksData || []).map((link) => ({
        id: link.id_link,
        source: link.source,
        target: link.target,
        type: link.type ?? "1",
      }));

    } catch (err) {
      console.error("Error fetching links:", err);
    }

    setTasks(transformedTasks);
    setLinks(links);

  };


  useEffect(() => {
    try {
      if (project && project.id_project) {
        loadTasksAndLinks();
      }
    } catch (error) {
      console.error("Error loading tasks and links:", error);
    }
  }, [project]);


  //const server = new RestDataProvider(`${BASE_URL}`);
const apiRef = useRef(null);

useEffect(() => {
  if (!apiRef.current) return;

  const server = new CustomDataProvider(`${BASE_URL}`);
  server.setApiRef(apiRef);
  server.setTasks(tasks);
  server.setLinks(links);

  apiRef.current.setDataProvider(server);
}, [apiRef.current, tasks, links]);
  /*useEffect(() => {
    // Cargar datos del backend
    server.getData().then((data) => {
      setTasks(data.tasks || []);
      setLinks(data.links || []);
    });
  }, [project]);

  /*useEffect(() => {
     if (!apiRef.current) return;
 
     const handleAddTask = async (task) => {
       console.log("Gantt lanzó add-task:", task);
       const parentId = task.parent;
       const sectionId = ganttSectionMap[parentId]; 
       if (!sectionId) {
         console.warn("No se pudo encontrar sección para", task);
         return;
       }
 
       const [savedTask, error] = await saveTask({
         name_task: task.text,
         start_date: task.start,
         end_date: task.end,
         progress: task.progress ?? 0,
         state: task.state ?? 1,
         id_section: sectionId,
       });
 
       if (error) {
         console.error("Error guardando tarea:", error);
         return;
       }
 
       apiRef.current.updateTask({
         ...task,
         id: savedTask.id_task,
       });
     };
 
     apiRef.current.on("add-task", handleAddTask);
 
     return () => {
       apiRef.current.off("add-task", handleAddTask);
     };
   }, [ganttSectionMap]);*/




  return (
    <>
      <Willow>
        <Gantt
          onInit={(instance) => apiRef.current = instance}
          tasks={tasks}
          scales={scales}
          columns={columns}
          editorShape={editorShape}
          links={links}
          onAddTask={async (task) => {
           
            if (!task.text || !task.start || !task.end || !project?.id_project) {
              console.warn(" Datos de la tarea incompletos:", {
                text: task.text,
                start: task.start,
                end: task.end,
                project: project?.id_project,
              });
              return null; 
            }

            console.log("Nueva tarea creada desde el Gantt:", task);

            const body = {
              name_task: task.text,
              start_date: task.start,
              end_date: task.end,
              progress: task.progress ?? 0,
              duration: task.duration ?? 0,
              state: task.state ?? 1,
              parent_task: task.parent ? { id_task: task.parent } : null,
              project: project.id_project,
            };

            const [savedTask, error] = await saveTask(body);

            if (error) {
              console.error("Error guardando tarea:", error);
              return;
            }

            return {
              ...task,
              id: savedTask.id_task,
            };
          }}


          editable={true}
        />

      </Willow>
    </>

  );
}

export default GanttItem;