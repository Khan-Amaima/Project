import React from "react";
import { Typography, Card, CardMedia, Container, Avatar, Box } from "@mui/material";
import AppColors from "../constants/AppColors";

function CustomCard(props) {
    const { image, headline, description } = props;
    return (
        <Card sx={{ maxWidth: 260, maxHeight: 250, marginRight: '10px', marginBottom: '1px' }} style={{ boxShadow: 'none' }}>
            <CardMedia
                sx={{ height: 140, borderRadius: '8px' }}
                image={image} title={headline}
            />
            <Container style={{ display: 'flex', justifyContent: 'start', alignItems: 'start', padding: 0, margin: 0, marginTop: '10px', }}>
                <Avatar sx={{ bgcolor: AppColors.tertiary, marginRight: '10px', width: 30, height: 30 }}>N</Avatar>
                <Box>
                    <Typography style={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: '600', color: AppColors.tertiary }}>
                        {headline}
                    </Typography>
                    <Typography style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', color: AppColors.secondary }}>
                        {description}
                    </Typography>
                </Box>
            </Container>
        </Card>
    );
}
export default CustomCard;