import { getProjects, saveProject, getProjectsByWorkbook, updateStateProject, getProjectById, updateProjectName } from "../services/projectCalls";

export const useProjects = () => {

    return {
        getProjects: async () => {
            const [data, error] = await getProjects()
            if (error) {
                console.log(error);
                return []
            }
            return [...data]
        },

        getProjectById: async (idProject) => {
            const [data, error] = await getProjectById(idProject)
            if (error) {
                console.log(error);
                return null
            }
            return data
        },

        getProjectsByWorkbook: async (idWorkbook) => {
            const [data, error] = await getProjectsByWorkbook(idWorkbook)
            if (error) {
                console.log(error);
                return []
            }
            return [...data]
        },

        updateStateProject: async (projectId) => {
            const [data, error] = await updateStateProject(projectId)
            if (error) {
                console.log(error);
                return false
            }
            return true
        },

        updateProjectName: async (body) => {
            const json = {
                id_project: body.id_project,
                name_project: body.projectName,
            }
            const [data, error] = await updateProjectName(json)
            if (error) {
                console.log(error);
                return false;
            } else if (data.id_project > 0) {
                console.log("Project updated successfully:", data);
                return true;
            }
            return true;

        },

        saveProject: async (body) => {

            const json = {
                id_workbook: {
                    id_workbook: body.idWorkbook
                },
                name_project: body.projectName
            }

            const [data, error] = await saveProject(json)

            if (error) {
                console.log(error);
                return false;
            } else if (data.id_project > 0) {
                console.log("Project created successfully:", data);
                return true;
            }
            return true;
        }
    }
}