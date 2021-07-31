import { createTheme } from '@material-ui/core';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#494964'
        },
        background: {
            default: '#f4f5fd'
        }
    },
    shape: {
        borderRadius: 8
    }
    // props:{
    //     MuiIconButton:{
    //         disableRipple: true,
    //     }
    // }
});
