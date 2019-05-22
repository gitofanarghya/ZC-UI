import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Typography, Grid } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import { appService } from '../App/app.services';

const styles = theme => ({
    root: {
        height: '100%', width: '100%', padding: 24, flexWrap: 'nowrap'
    }
})

const noCurrentTrackerInfo = () =>
    <div 
        style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#54aab3', color: 'white'}}>
            No Info Found For Selected Tracker...
    </div>

class TrackerDetails extends React.Component {

    state = {

    }

    render() {
        const { classes, currentTrackerInfo } = this.props
        
        return (currentTrackerInfo === null ? <noCurrentTrackerInfo /> :
                <Grid container direction='column' className={classes.root}>
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


function mapStateToProps(state) {
    const { currentTrackerInfo } = state.app

    return {
        currentTrackerInfo
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCurrentTrackerInfo : (trackerID) => {
        dispatch({type: 'GET_CURRENT_TRACKER_INFO_REQUEST'})
        appService.getCurrentTrackerInfo(trackerID)
            .then(json => {
                dispatch({type: 'GET_CURRENT_TRACKER_INFO_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_CURRENT_TRACKER_INFO_FAILURE'})
            })
    }
})


const connectedTrackerDetails = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrackerDetails))
export {connectedTrackerDetails as TrackerDetails}