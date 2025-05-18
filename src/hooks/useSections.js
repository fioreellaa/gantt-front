import { getSections, getSectionsByProject, saveSection } from "../services/sectionCalls";

export const useSections = () => {

    return {
        getSections: async () => {
            const [data, error] = await getSections()
            if (error) {
                console.log(error);
                return []
            }
            return [...data]
        },

        getSectionsByProject: async (id_project) => {
            const [data, error] = await getSectionsByProject(id_project)
            if (error) {
                console.log(error);
                return []
            }
            return [...data]
        },

        saveSection: async (body) => {

            const json = {
                id_project: {
                    id_project: body.id_project.id_project
                },
                name_section: body.name_section
            }

            const [data, error] = await saveSection(json)

            if (error) {
                console.log(error, json);
                return false;
            } else if (data.id_section > 0) {
                console.log("Section created successfully:", data);
                return true;
            }
            return true;
        }
    }
}