import { duration } from "@mui/material";
import { getTasks, getTasksByProject, saveTask } from "../services/taskCalls";

export const useSections = () => {

    return {
        getTasks: async () => {
            const [data, error] = await getTasks()
            if (error) {
                //console.log(error);
                return []
            }
            return [...data]
        },

        getTasksByProject: async (id_project) => {
            const [data, error] = await getTasksByProject(id_project)
            //console.log("Tasks by project:", data);
            if (error) {
                console.log(error);
                return []
            }
            return [...data]
        },

        saveTask: async (body) => {

            const json = {
                project: body.project,
                parentTask: body.parentTask,
                name_task: body.name_task,
                description_task: body.description_task ?? "",
                duration: body.duration ?? 0,
                start_date: body.start_date,
                end_date: body.end_date,
                progress: body.progress ?? 0,
                state: body.state ?? 1,
                type: body.type // 1: summary, 2: task, 3: milestone
            };

            const [data, error] = await saveTask(json)

            if (error) {
                //console.error("Error al guardar tarea:", error, json);
                return [null, error];
            }

            if (data?.id_task > 0) {
                //console.log("Task created successfully:", data);
                return [data, null]; 
            }

            return [null, "Error desconocido"];
        }
    }
}