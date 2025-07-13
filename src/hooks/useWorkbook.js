import { getWorkbooks, saveWorkbook, updateWorkbook } from "../services/workbookCalls";

export const useWorkbook = () => {

    return {
        getWorkbooks: async () => {
           const [data, error] = await getWorkbooks()
           if(error){
            //console.log(error);
            return []
           }
           return [...data]
        },

        saveWorkbook: async (body) => {

            const json = {
                workbook_name: body.workbookName
            }
 
            const [data, error] = await saveWorkbook(json)
        
            if(error){
                console.log(error);
                return false;
            }else if(data.id_workbook > 0){
                return true;
            }
            return true;
        },

        updateWorkbook: async (body) => {
            const json = {
                id_workbook: body.currentWorkbookId,
                workbook_name: body.workbookName
            }
            const [data, error] = await updateWorkbook(json)
        
            return [data, error];
        }
    }
}