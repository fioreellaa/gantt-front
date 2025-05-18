import { getTasks, getTasksBySection, saveTask } from "../services/taskCalls";

export const useSections = () => {

    return {
        getTasks: async () => {
            const [data, error] = await getTasks ()
            if (error) {
                console.log(error);
                return []
            }
            return [...data]
        },

        getTasksBySection: async (id_section) => {
            const [data, error] = await getTasksBySection(id_section)
            if (error) {
                console.log(error);
                return []
            }
            return [...data]
        },

        saveTask: async (body) => {

            const json = {
                id_section: {
                    id_section: body.id_section.id_section
                },
                name_task: body.name_task
            }

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