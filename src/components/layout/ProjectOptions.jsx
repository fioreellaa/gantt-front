import AccountTreeIcon from '@mui/icons-material/AccountTree';

function ProjectOptions({ workbook_name, projectName }) {
    return (
        <>
            <div className="text-xl ">
                {workbook_name ? `${workbook_name} : ${projectName}` : "Select a project"}
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