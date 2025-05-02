import SortIcon from '@mui/icons-material/Sort';

function ProjectOptions({ projectName }) {
    return (
        <>
            <div className="text-xl ">
                {projectName ? `${projectName}` : "Select a project"}
            </div>
            <div className="mx-2 my-4">
                <ul>
                    <li className="gantt-view">
                        <SortIcon className="text-gray-600" />
                        <span>Gantt</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ProjectOptions;