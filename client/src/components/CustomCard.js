import React from "react";
import { Typography, Card, CardMedia, Container, Avatar, Box } from "@mui/material";
import AppColors from "../constants/AppColors";
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";
import LazyThumbnail from "./LazyThumbnail";

function CustomCard(props) {
    const { thumbnail, title, description, user, id } = props;
    const navigate = useNavigate();
    return (
        <Card sx={{maxWidth: 260, maxHeight: 250, marginRight: '10px', marginBottom: '1px',}} style={{ boxShadow: 'none' }}>
            <CardActionArea onClick={()=>{navigate(`/itemDetail/${id}`)}}style={{justifyContent:"center",alignItems:"center",display:"flex",flexDirection:"column"}}>
                <LazyThumbnail item={thumbnail} height={140} width={"auto"}/>
                <Container style={{ display: 'flex', justifyContent: 'start', alignItems: 'start', padding: 0, margin: 0, marginTop: '10px', }}>
                    <Avatar sx={{ bgcolor: AppColors.tertiary, marginRight: '10px', width: 30, height: 30 }}>{user.username[0]}</Avatar>
                    <Box>
                        <Typography style={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: '600', color: title ? AppColors.tertiary : AppColors.secondary }}>
                            {title || 'Title not added.'}
                        </Typography>
                        <Typography style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', color: AppColors.secondary }}>
                            {description || 'Description not added.'}
                        </Typography>
                    </Box>
                </Container>
            </CardActionArea>
        </Card>
    );
}
export default CustomCard;