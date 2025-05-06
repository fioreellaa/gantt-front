import { getProjects, saveProject, getProjectsByWorkbook } from "../services/projectCalls";

export const useProjects = () => {

    return {
        getProjects: async () => {
           const [data, error] = await getProjects()
           if(error){
            console.log(error);
            return []
           }
           return [...data]
        },

        getProjectsByWorkbook: async (idWorkbook) => {
            const [data, error] = await getProjectsByWorkbook(idWorkbook)
            if(error){
                console.log(error);
                return []
            }
            return [...data]
        },

        saveProject: async (body) => {

            const json = {
                id_workbook: {
                    id_workbook: body.idWorkbook
                },
                name_project: body.projectName
            }
 
            const [data, error] = await saveProject(JSON.stringify(json))
        
            if(error){
                console.log(error);
                return false;
            }else if(data.id_project > 0){
                console.log("Project created successfully:", data);
                return true;
            }
            return true;
        }
    }
}