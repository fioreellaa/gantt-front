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
/*
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
    }*/

    return(
        <>
            
        </>
    )
}
export default TaskFilters;