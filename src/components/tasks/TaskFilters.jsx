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

function TaskFilters({filters, setFilters}){
    return(
        <>
            <div className='flex gap-4 items-center'>
                <div className='my-1 border-r h-auto p-2 flex items-center gap-2 w-fit'>
                    <AddBoxIcon/> 
                    <IndeterminateCheckBoxIcon/>
                </div> 
                <div className="w-2/5"> 
                    <TextField
                    className="w-full dark:invert dark:hue-rotate-180"
                    label="Buscar tarea"
                    value= ""
                    
                    slotProps={iconToTextfield}
                    onChange={(c) => setFilters((prev) => ({
                    ...prev,
                    search: c.target.value
                    }))}
                />
                </div>
                <div className="w-1/5 my-1 border-r h-auto p-2 flex items-center gap-2 ">   
                    <span className='text-sm'>ASSIGNEE</span>  
                    <FilterAltIcon className='text-xs text-gray-300'/>
                </div>
                <div className="w-1/5 my-1 border-r h-auto p-2 flex items-center gap-2 ">   
                    <span className='text-sm'>START</span>  
                    <FilterAltIcon className='text-gray-300'/>
                </div>
                <div className="w-1/5 my-1 border-r h-auto p-2 flex items-center gap-2 ">   
                    <span className='text-sm'>DUE</span>  
                    <FilterAltIcon className='text-gray-300'/>
                </div>
                <div className="w-1/5 my-1 border-r h-auto p-2 flex items-center gap-2 ">   
                    <span className='text-sm'>STATUS</span>  
                    <FilterAltIcon className='text-gray-300'/>
                </div>
            </div>
        </>
    )
}
export default TaskFilters;