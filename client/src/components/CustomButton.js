import React from 'react'
import { Button } from '@mui/material';

function CustomButton({ prefixIcon: PrefixIcon, text, buttonStyle, onTap }) {
    return (
        <Button
            startIcon={<PrefixIcon style={{ width: 24, height: 24 }} />}
            sx={{...buttonStyle, fontSize: { md: '10px', xl: '14px' }, paddingX : 2, paddingY: 1 }}
            onClick={onTap}
        >
            {text}
        </Button>
    )
}

export default CustomButton