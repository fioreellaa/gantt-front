import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useAccountStore } from "../../store/useAccountStore"; 

function ProjectOptions({ workbook_name, projectName }) {
    const account = useAccountStore(state => state.account);
    const unsetCurrent = useAccountStore(state => state.unsetCurrent);

    const username = account?.username || "Invitado";

    return (
        
        <>
            <div className="p-4 bg-white shadow-md rounded-md">
                <div className="flex items-center justify-between gap-8">

                    <div className="text-lg font-semibold text-gray-800 whitespace-nowrap">
                        {workbook_name ? `${workbook_name} : ${projectName}` : "Selecciona un proyecto"}
                    </div>

                    <div className="text-sm text-gray-600 whitespace-nowrap">
                        Bienvenido, <span className="font-medium text-gray-800">{username}</span>
                    </div>


                    <button
                        onClick={unsetCurrent}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded transition duration-200"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>

            <div className="mx-2 my-4">
                <ul>
                    <li className="gantt-view">
                        <AccountTreeIcon className="text-gray-600 mr-3" />
                        <span>Gantt</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ProjectOptions;