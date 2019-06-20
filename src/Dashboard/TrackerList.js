import React, {Fragment} from 'react'
import { Typography, Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        width: '100%', padding: 24
    },
    selected: {
        backgroundColor: '#54aab3 !important'
    }
})

class TrackerList extends React.Component {

    render() {
        const {classes, commissioningData, currentTracker, roverStatus} = this.props

        return (
            <Fragment>
                <Grid container direction='column' className={classes.root}>
                    <Typography variant='h5'>
                        Tracker List
                    </Typography>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell >deviceID</TableCell>
                            <TableCell >Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {commissioningData && commissioningData.map(n => {
                                return (
                                <TableRow
                                    hover
                                    //className={[n.deviceID === currentTracker ? classes.selected : classes.row, classes.tableRow]}
                                    key={n.deviceID}
                                    onClick={() => this.props.setCurrentTracker(n.deviceID)}
                                    style={{cursor: 'pointer'}}
                                    selected={n.deviceID === currentTracker}
                                    classes={{selected: classes.selected}}
                                >
                                    <TableCell style={n.deviceID === currentTracker ? {color: 'white'} : {}}>
                                        {n.deviceID}
                                    </TableCell>
                                    <TableCell style={n.deviceID === currentTracker ? {color: 'white'} : {}}>
                                        {roverStatus[n.deviceID]}
                                    </TableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Grid>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { commissioningData, currentTracker, roverStatus } = state.app

    return {
        commissioningData,
        currentTracker,
        roverStatus
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentTracker: (deviceID) => {
        dispatch({type: 'SET_CURRENT_TRACKER', deviceID})
    }
})


const connectedTrackerList = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrackerList))
export {connectedTrackerList as TrackerList}