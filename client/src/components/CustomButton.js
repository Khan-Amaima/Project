import React from 'react'
import { Box, Button } from '@mui/material';
import AppColors from '../constants/AppColors';

function CustomButton({ prefixIcon: PrefixIcon, text, buttonStyle, onTap }) {
    return (
        <Button
            startIcon={PrefixIcon && <PrefixIcon style={{ width: 24, height: 24 }} />}
            sx={{
                fontSize: { xs: '10px', sm: '11px', md: '12px', lg: '13px', xl: '14px' }, paddingX: 2, paddingY: 1, display: 'flex',
                justifyContent: 'start', ...buttonStyle,
                '&:hover': {
                    backgroundColor: AppColors.tint, // Define your custom hover background color
                },
            }}
            onClick={onTap}
        >
            {text}
        </Button>
    )
}

export default CustomButton