import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Typography, Grid, IconButton } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import { appService } from '../App/app.services';
import Refresh from '@material-ui/icons/Refresh'

const styles = theme => ({
    root: {
        height: '100%', width: '100%', padding: 24, flexWrap: 'nowrap'
    },
    header: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    }
})

const NoCurrentTrackerInfo = () =>
    <div 
        style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#54aab3', color: 'white'}}>
            No Info Found For Selected Tracker.
    </div>

class TrackerDetails extends React.Component {

    timer = null

    state = {

    }

    componentDidMount = () => {
        this.refresh()
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.currentTracker !== this.props.currentTracker) {
            this.props.getCurrentTrackerInfo(nextProps.currentTracker)
        }
    }

    refresh = (c = true) => {
        this.props.getCurrentTrackerInfo(this.props.currentTracker)

        if(c) {
            this.timer = setTimeout(this.refresh, 30000)
        }
    }

    componentWillUnmount = () => {
        clearTimeout(this.timer)
    }

    render() {
        const { classes, currentTrackerInfo } = this.props

        return (currentTrackerInfo === null ? <NoCurrentTrackerInfo /> :
                <Grid container direction='column' className={classes.root}>
                    <div className={classes.header}>
                    <Typography variant='h5' style={{height: '48px'}}>
                        Tracker Details
                    </Typography>
                    <IconButton className={classes.button} aria-label="Refresh" onClick={() => this.props.getCurrentTrackerInfo(this.props.currentTracker)}>
                        <Refresh />
                    </IconButton>
                    </div>
                    <div 
                        className={currentTrackerInfo.currentAngle !== '--' && (currentTrackerInfo.currentAngle > 58 ? 'angle60' :
                        currentTrackerInfo.currentAngle > 56 ? 'angle58' :
                        currentTrackerInfo.currentAngle > 54 ? 'angle56' :
                        currentTrackerInfo.currentAngle > 52 ? 'angle54' :
                        currentTrackerInfo.currentAngle > 50 ? 'angle52' :
                        currentTrackerInfo.currentAngle > 48 ? 'angle50' :
                        currentTrackerInfo.currentAngle > 46 ? 'angle48' :
                        currentTrackerInfo.currentAngle > 44 ? 'angle46' :
                        currentTrackerInfo.currentAngle > 42 ? 'angle44' :
                        currentTrackerInfo.currentAngle > 40 ? 'angle42' :
                        currentTrackerInfo.currentAngle > 38 ? 'angle40' :
                        currentTrackerInfo.currentAngle > 36 ? 'angle38' :
                        currentTrackerInfo.currentAngle > 34 ? 'angle36' :
                        currentTrackerInfo.currentAngle > 32 ? 'angle34' :
                        currentTrackerInfo.currentAngle > 30 ? 'angle32' :
                        currentTrackerInfo.currentAngle > 28 ? 'angle30' :
                        currentTrackerInfo.currentAngle > 26 ? 'angle28' :
                        currentTrackerInfo.currentAngle > 24 ? 'angle26' :
                        currentTrackerInfo.currentAngle > 22 ? 'angle24' :
                        currentTrackerInfo.currentAngle > 20 ? 'angle22' :
                        currentTrackerInfo.currentAngle > 18 ? 'angle20' :
                        currentTrackerInfo.currentAngle > 16 ? 'angle18' :
                        currentTrackerInfo.currentAngle > 14 ? 'angle16' :
                        currentTrackerInfo.currentAngle > 12 ? 'angle14' :
                        currentTrackerInfo.currentAngle > 10 ? 'angle12' :
                        currentTrackerInfo.currentAngle > 8 ? 'angle10' :
                        currentTrackerInfo.currentAngle > 6 ? 'angle8' :
                        currentTrackerInfo.currentAngle > 4 ? 'angle6' :
                        currentTrackerInfo.currentAngle > 2 ? 'angle4' :
                        currentTrackerInfo.currentAngle > 0 ? 'angle2' :
                        currentTrackerInfo.currentAngle > -2 ? 'angle0' :
                        currentTrackerInfo.currentAngle > -4 ? 'angle_2' :
                        currentTrackerInfo.currentAngle > -6 ? 'angle_4' :
                        currentTrackerInfo.currentAngle > -8 ? 'angle_6' :
                        currentTrackerInfo.currentAngle > -10 ? 'angle_8' :
                        currentTrackerInfo.currentAngle > -12 ? 'angle_10' :
                        currentTrackerInfo.currentAngle > -14 ? 'angle_12' :
                        currentTrackerInfo.currentAngle > -16 ? 'angle_14' :
                        currentTrackerInfo.currentAngle > -18 ? 'angle_16' :
                        currentTrackerInfo.currentAngle > -20 ? 'angle_18' :
                        currentTrackerInfo.currentAngle > -22 ? 'angle_20' :
                        currentTrackerInfo.currentAngle > -24 ? 'angle_22' :
                        currentTrackerInfo.currentAngle > -26 ? 'angle_24' :
                        currentTrackerInfo.currentAngle > -28 ? 'angle_26' :
                        currentTrackerInfo.currentAngle > -30 ? 'angle_28' :
                        currentTrackerInfo.currentAngle > -32 ? 'angle_30' :
                        currentTrackerInfo.currentAngle > -34 ? 'angle_32' :
                        currentTrackerInfo.currentAngle > -36 ? 'angle_34' :
                        currentTrackerInfo.currentAngle > -38 ? 'angle_36' :
                        currentTrackerInfo.currentAngle > -40 ? 'angle_38' :
                        currentTrackerInfo.currentAngle > -42 ? 'angle_40' :
                        currentTrackerInfo.currentAngle > -44 ? 'angle_42' :
                        currentTrackerInfo.currentAngle > -46 ? 'angle_44' :
                        currentTrackerInfo.currentAngle > -48 ? 'angle_46' :
                        currentTrackerInfo.currentAngle > -50 ? 'angle_48' :
                        currentTrackerInfo.currentAngle > -52 ? 'angle_50' :
                        currentTrackerInfo.currentAngle > -54 ? 'angle_52' :
                        currentTrackerInfo.currentAngle > -56 ? 'angle_54' :
                        currentTrackerInfo.currentAngle > -58 ? 'angle_56' :
                        currentTrackerInfo.currentAngle > -60 ? 'angle_58' :
                        'angle_60')} 
                        style={{width: '100%', height: '150px', marginTop: 5}}>
                            {currentTrackerInfo.currentAngle === '--' && <div 
                                style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#54aab3', color: 'white'}}>
                                    No Current Angle Data Found.
                            </div>}
                        </div>
                    {currentTrackerInfo.currentAngle !== '--' && <Typography variant='h5' style={{textAlign: 'center', height: 48, marginTop: 5}}>
                        Angle = {currentTrackerInfo.currentAngle}
                    </Typography>}
                    <div style={{height: 'calc(100% - 246px)', width: '100%', overflow: 'auto'}}>
                    <Table padding='none'>
                        <TableBody>
                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                Tracker ID
                                </Typography>
                            </TableCell>
                            <TableCell>{currentTrackerInfo.trackerID}</TableCell>
                        </TableRow>

                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                Device ID
                                </Typography>
                            </TableCell>
                            <TableCell>{currentTrackerInfo.deviceID}</TableCell>
                        </TableRow>

                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                Mac ID 
                                </Typography>
                            </TableCell>
                            <TableCell>{currentTrackerInfo.macID}</TableCell>
                        </TableRow>

                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                Current Mode
                                </Typography>
                            </TableCell>
                            <TableCell>{currentTrackerInfo.currentMode}</TableCell>
                        </TableRow>

                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                    Current Angle
                                </Typography>
                            </TableCell>
                            <TableCell>{currentTrackerInfo.currentAngle}</TableCell>
                        </TableRow>

                        <TableRow style={{cursor: 'pointer'}}>
                            <TableCell>
                                <Typography variant="body1">
                                    Date and Time
                                </Typography>
                            </TableCell>
                            <TableCell>{new Date(currentTrackerInfo.timeStamp).toLocaleDateString('en-US', {timeZone: this.props.timeZone})} -- {new Date(currentTrackerInfo.timeStamp).toLocaleTimeString('en-US', {timeZone:  this.props.timeZone, hour12: false})}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </div>
                </Grid>
        )
    }
} 


function mapStateToProps(state) {
    const { currentTrackerInfo, timeZone, currentTracker } = state.app

    return {
        currentTrackerInfo,
        timeZone,
        currentTracker
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCurrentTrackerInfo : (deviceID) => {
        dispatch({type: 'GET_CURRENT_TRACKER_INFO_REQUEST'})
        appService.getCurrentTrackerInfo(deviceID)
            .then(json => {
                dispatch({type: 'GET_CURRENT_TRACKER_INFO_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_CURRENT_TRACKER_INFO_FAILURE'})
            })
    }
})


const connectedTrackerDetails = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrackerDetails))
export {connectedTrackerDetails as TrackerDetails}