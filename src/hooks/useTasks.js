import { duration } from "@mui/material";
import { getTasks, getTasksByProject, saveTask } from "../services/taskCalls";

export const useSections = () => {

    return {
        getTasks: async () => {
            const [data, error] = await getTasks()
            if (error) {
                console.log(error);
                return []
            }
            return [...data]
        },

        getTasksByProject: async (id_project) => {
            const [data, error] = await getTasksByProject(id_project)
            console.log("Tasks by project:", data);
            if (error) {
                console.log(error);
                return []
            }
            return [...data]
        },

        saveTask: async (body) => {

            const json = {
                project: body.project,
                parentTask: body.parent_task ? { id_task: body.parent_task.id_task } : null,
                name_task: body.name_task,
                description_task: body.description_task ?? "",
                duration: body.duration ?? 0,
                start_date: body.start_date,
                end_date: body.end_date,
                progress: body.progress ?? 0,
                state: body.state ?? 1
            };

            const [data, error] = await saveTask(json)

            if (error) {
                console.log(error, json);
                return false;
            } else if (data.id_task > 0) {
                console.log("Task created successfully:", data);
                return true;
            }
            return true;
        }
    }
}