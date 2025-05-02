import { getWorkbooks, saveWorkbook } from "../services/workbookCalls";

export const useWorkbook = () => {

    return {
        getWorkbooks: async () => {
           const [data, error] = await getWorkbooks()
           if(error){
            console.log(error);
            return []
           }
           return [...data]
        },

        saveWorkbook: async (body) => {

            const json = {
                workbook_name: body.workbookName
            }
 
            const [data, error] = await saveWorkbook(JSON.stringify(json))
        
            if(error){
                console.log(error);
                return false;
            }else if(data.id_workbook > 0){
                console.log("Workbook created successfully:", data);
                return true;
            }
            return true;
        }
    }
}