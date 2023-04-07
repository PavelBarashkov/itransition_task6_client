import React from "react"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const Autocompletes = ({data, onUserSelect}) => {
    const handleUserSelect = (event, value) => {
        onUserSelect(value);
      };
    return (
        <Autocomplete
            className="bg-white"
            style={{width: 200, borderRadius: 5}}
            options={data}
            getOptionLabel={(user) => user.name}
            renderInput={(params) => <TextField {...params} label='Кому' />}
            onChange={handleUserSelect}
        />
    )
}


