import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Typography, Grid } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';


export class TrackerDetails extends React.Component {

    state = {

    }

    render() {
        return (
                <Grid container direction='column' style={{height: '100%', width: '100%', padding: 24, flexWrap: 'nowrap'}}>
                    <Typography variant='h5' style={{height: '48px'}}>
                        Tracker Details
                    </Typography>
                    <div className='angle60' style={{width: '100%', height: '150px', marginTop: 5}}/>
                    <Typography variant='h5' style={{textAlign: 'center', height: 48, marginTop: 5}}>
                        Angle = 60
                    </Typography>
                    <div style={{height: 'calc(100% - 246px)', width: '100%', overflow: 'auto'}}>
                    <Table padding='none'>
                        <TableBody>
                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                Tracker ID
                                </Typography>
                            </TableCell>
                            <TableCell>--</TableCell>
                        </TableRow>

                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                Device ID
                                </Typography>
                            </TableCell>
                            <TableCell>--</TableCell>
                        </TableRow>

                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                Mac ID 
                                </Typography>
                            </TableCell>
                            <TableCell>--</TableCell>
                        </TableRow>

                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                Current Mode
                                </Typography>
                            </TableCell>
                            <TableCell>--</TableCell>
                        </TableRow>

                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                    Current Angle
                                </Typography>
                            </TableCell>
                            <TableCell>--</TableCell>
                        </TableRow>

                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                    Date and Time
                                </Typography>
                            </TableCell>
                            <TableCell>--</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </div>
                </Grid>
        )
    }
} 