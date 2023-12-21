import React from 'react'
import { Box, Button } from '@mui/material';

function CustomButton({ prefixIcon: PrefixIcon, text, buttonStyle, onTap }) {
    return (
        <Button
            startIcon={PrefixIcon && <PrefixIcon style={{ width: 24, height: 24 }} />}
            sx={{...buttonStyle, fontSize: { xs: '10px' ,sm: '11px',md: '12px', lg: '13px',xl: '14px' }, paddingX : 2, paddingY: 1 }}
            onClick={onTap}
        >
            {text}
        </Button>
    )
}

export default CustomButton