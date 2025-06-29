import { Gantt } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import React, { useRef, useEffect, useState } from "react";
import "wx-react-gantt/dist/gantt.css";
import { defaultEditorShape } from "wx-react-gantt";
import { Willow } from "wx-react-gantt";
import { getTasksByProject } from "../../services/taskCalls";
import { saveTask } from "../../services/taskCalls";
import { BASE_URL } from "../../constants/services";
import { useCallback } from "react";
import { RestDataProvider } from "wx-gantt-data-provider";

const dayDiff = (next, prev) => {
  const d = (next - prev) / 1000 / 60 / 60 / 24;
  return Math.ceil(Math.abs(d));
};


function GanttItem({ project }) {

  const [tasks, setTasks] = useState([]);
  const [links, setLinks] = useState([]);
  const gApiRef = useRef();

  console.log("Proyecto seleccionado:", project);


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
      parent: task.parent_id ?? null,
      duration: task.duration ?? dayDiff(task.end_date, task.start_date)
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


  const handleAddTask = async ({ task }) => {
    console.log("Tarea recibida:", task);

    if (!task?.text || !task?.start || !task?.end || !project?.id_project) {
      console.warn("Datos incompletos para guardar:", { task, project });
      return null;
    }

    const body = {
      name_task: task.text,
      description_task: task.description_task ?? "",
      start_date: task.start,
      end_date: task.end,
      duration: task.duration ?? dayDiff(new Date(task.end), new Date(task.start)),
      progress: task.progress ?? 0,
      state: task.state ?? 1,
      parent_task: task.parent ? { id_task: task.parent } : null,
      project: { id_project: project.id_project },
    };

    const [savedTask, error] = await saveTask(body);

    if (error || !savedTask?.id_task) {
      console.error(" Error al guardar tarea:", error, body);
      return null;
    }

    return {
      ...task,
      id: savedTask.id_task,
    };
  };

  const handleUpdateTask = async ({ id, task }) => {
  console.log("Editando tarea:", id, task);

  if (!task?.text || !task?.start || !task?.end || !project?.id_project) {
    console.warn("Datos incompletos al editar:", { id, task, project });
    return null;
  }

  const body = {
    id_task: id,
    name_task: task.text,
    description_task: task.description_task ?? "",
    start_date: task.start,
    end_date: task.end,
    duration: task.duration ?? dayDiff(new Date(task.end), new Date(task.start)),
    progress: task.progress ?? 0,
    state: task.state ?? 1,
    parent_task: task.parent ? { id_task: task.parent } : null,
    project: { id_project: project.id_project },
  };

  const [updatedTask, error] = await saveTask(body); 

  if (error || !updatedTask?.id_task) {
    console.error("Error al actualizar tarea:", error);
    return null;
  }

  return {
    ...task,
    id: updatedTask.id_task,
  };
};



  return (
    <>
      <Willow>
        <Gantt
          //onInit={init}
          tasks={tasks}
          scales={scales}
          columns={columns}
          editorShape={editorShape}
          links={links}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          editable={true}
        />

      </Willow>
    </>

  );
}

export default GanttItem;