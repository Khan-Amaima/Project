import React, { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import AppColors from '../constants/AppColors'
import { deleteIcon, disableSoundIcon, soundIcon } from '../assets/images'
import CustomButton from '../components/CustomButton'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CustomVideoPlayer from './CustomVideoPlayer'
import CustomVideoCarousel from './CustomVideoCarousel'

function CustomTable({ tableData, handleDeleteFile, handleSetPrimarySound }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModal = () => setIsModalOpen(!isModalOpen);
    const [targetVideo, setTargetVideo] = useState();


    const columns = [
        { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
        { id: 'video', label: '', minWidth: 100, align: 'center', width: 120, height: 70 },
        { id: 'sound', label: 'Sound', minWidth: 100, align: 'center', width: 20, height: 20 },
        {
            id: 'size',
            label: 'Size',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'button',
            label: '',
            minWidth: 50,
            align: 'right',
        },
        {
            id: 'deleteIcon',
            label: '',
            minWidth: 50,
            align: 'right',
            width: 20,
            height: 20
        },
    ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '32px' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, color: AppColors.tertiary, fontSize: '16px', fontWeight: 600 }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData
                            .map((item, index) => {
                                let no = index + 1;
                                return (
                                    <TableRow hover role="checkbox" key={no}>
                                        <TableCell onClick={() => {}} align='center'>
                                            {no}
                                        </TableCell>
                                        <TableCell onClick={() => {handleModal(); setTargetVideo(item.video)}}>
                                            <video
                                                width={140}
                                                height={90}
                                                src={item.video}
                                                style={{ borderRadius: '10px' }}
                                            />
                                        </TableCell>
                                        <TableCell onClick={() => {}} align='center' width={'10px'}>
                                            <Box
                                                component="img"
                                                sx={{
                                                    width: 25,
                                                    height: 25,
                                                }}
                                                src={item.sound ? soundIcon : disableSoundIcon}
                                            />
                                        </TableCell>
                                        <TableCell onClick={() => {}} align='center'>
                                            <Typography style={{ size: '16px', fontWeight: 400, color: AppColors.secondary, fontFamily: 'Poppins' }}>
                                                {item.size}
                                            </Typography>
                                        </TableCell>
                                        <TableCell onClick={() => {} }>
                                            <CustomButton onTap={() => handleSetPrimarySound(index)} text={"Primary Audio"} buttonStyle={{
                                                backgroundColor: item.sound ? AppColors.primary : AppColors.white,
                                                border: item.sound ? '' : '1px solid',
                                                fontFamily: 'Poppins',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                color: item.sound ? AppColors.white : AppColors.primary,
                                            }} />
                                        </TableCell>
                                        <TableCell onClick={() => handleDeleteFile(index)} >
                                            <Box
                                                component="img"
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                }}
                                                src={deleteIcon}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                <CustomVideoCarousel isModalOpen={isModalOpen} handleModal={handleModal} videos={tableData}/>
            </TableContainer>
        </Paper>
    )
}

export default CustomTable