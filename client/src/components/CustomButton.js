import React from 'react'
import { Button } from '@mui/material';

function CustomButton({ prefixIcon: PrefixIcon, text, buttonStyle, onTap }) {
    return (
        <Button
            variant="contained"
            startIcon={<PrefixIcon style={{ width: 24, height: 24 }} />}
            sx={[buttonStyle, {fontSize : {md : '10px', xl : '14px'}}]}
            onClick={onTap}
        >
            {text}
        </Button>
    )
}

export default CustomButton