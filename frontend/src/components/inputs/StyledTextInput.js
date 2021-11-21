import React from 'react'
import {
    makeStyles
  } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { capitalize } from '../../utils/extraFunctions';
import { useField } from 'formik';

const useStyles = makeStyles((theme) => ({
    root: {
        '& label.Mui-focused': {
            color: 'var(--main-color)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'var(--main-color)',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'var(--main-color)',
        },
        '&:hover .MuiInput-underline:before': {
            borderBottomColor: 'var(--main-color)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'var(--main-color)',
                borderRadius: "2px"
            },
            '&:hover fieldset': {
                borderWidth: "2px",
                borderColor: "var(--main-color)",
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--main-color)',
            },
        },
        '& label': {
            fontWeight: "200"
        },
        '& .Mui-error': {
            fontWeight: "200"
        }
    },
}));

function StyledTextInput({helperText, ...props}) {
    const classes = useStyles();
    const [field, meta] = useField(props);

    return (
        <TextField 
            className={classes.root} 
            helperText={meta.touched && meta.error && capitalize(meta.error)}
            error={meta.touched && !!meta.error}
            {...field}  
            {...props}
        />
    )
}

export default StyledTextInput