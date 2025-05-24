import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const iconToTextfield = {
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      )
    }
}

function TaskFilters({filters, setFilters, collapsedSections, setCollapsedSections}) {

    const handleExpand = () => {
        const updated = {};
        Object.keys(collapsedSections).forEach(id => {
            updated[id] = false;
        });
        setCollapsedSections(updated)
    }

    const handleCollapse = () => {
        const updated = {};
        Object.keys(collapsedSections).forEach(id => {
            updated[id] = true;
        });
        setCollapsedSections(updated);
    }

    return(
        <>
            <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] gap-4 items-center'>
                <div className='flex items-center gap-2 border-r p-2'>
                    <AddBoxIcon onClick={handleExpand} className="cursor-pointer hover:text-blue-500"/> 
                    <IndeterminateCheckBoxIcon onClick={handleCollapse} className="cursor-pointer hover:text-blue-500" />
                </div> 
                <div className="p-2"> 
                    <TextField
                    className="w-full"
                    label="Buscar tarea"
                    value= ""
                    
                    slotProps={iconToTextfield}
                    onChange={(c) => setFilters((prev) => ({
                    ...prev,
                    search: c.target.value
                    }))}
                />
                </div>
                <div className="text-sm flex items-center gap-2 border-r p-2">   
                    <span className='text-sm'>ASSIGNEE</span>  
                    <FilterAltIcon className='text-xs text-gray-300'/>
                </div>
                <div className="text-sm flex items-center gap-2 border-r p-2 ">   
                    <span className='text-sm'>START</span>  
                    <FilterAltIcon className='text-gray-300'/>
                </div>
                <div className="text-sm flex items-center gap-2 border-r p-2">   
                    <span className='text-sm'>DUE</span>  
                    <FilterAltIcon className='text-gray-300'/>
                </div>
                <div className="text-sm flex items-center gap-2 border-r p-2">   
                    <span className='text-sm'>STATUS</span>  
                    <FilterAltIcon className='text-gray-300'/>
                </div>
            </div>
        </>
    )
}
export default TaskFilters;