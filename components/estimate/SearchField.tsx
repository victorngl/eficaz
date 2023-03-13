import React from "react";
import {
  InputAdornment,
  TextField,

} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchField({ onChange }) {
    return (
    <TextField
        sx={{
            backgroundColor: 'white',
        }}
        size="small"
        variant="outlined"
        onChange={onChange}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
        }}
    />
    )
}

export default SearchField;