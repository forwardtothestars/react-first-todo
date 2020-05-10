import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";
import React from "react";

const ComboBox = (props) => {
    let {items, label} = props;
    return (
        <Autocomplete
            id="cbSelectCountry"
            options={items}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        />
    );
}

export default ComboBox;