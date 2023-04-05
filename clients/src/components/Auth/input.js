import React from 'react'
import { TextField, Grid} from '@material-ui/core'


const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassoword }) => {

    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
            ></TextField>
        </Grid>
    )
}

export default Input