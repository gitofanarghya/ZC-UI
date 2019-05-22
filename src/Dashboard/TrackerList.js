import React, {Fragment} from 'react'
import { Typography, Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import { appService } from '../App/app.services';

const styles = theme => ({
    root: {
        height: '100%', width: '100%', padding: 24
    }
})

class TrackerList extends React.Component {

    componentDidMount = () => {
        if(this.props.commissioningData) {
            this.props.getCurrentTrackerInfo(this.props.commissioningData[0].trackerID)
        }
    }

    render() {
        const {classes, commissioningData} = this.props

        return (
            <Fragment>
                <Grid container direction='column' className={classes.root}>
                    <Typography variant='h5'>
                        Tracker List
                    </Typography>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell >TrackerID</TableCell>
                            <TableCell >Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {commissioningData && commissioningData.map(n => {
                                return (
                                <TableRow
                                    hover
                                    //className={classNames(n.trackerID === selectedTrackerID ? classes.selected : classes.row, classes.tableRow)}
                                    key={n.trackerID}
                                    onClick={() => this.props.getCurrentTrackerInfo(n.trackerID)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <TableCell>
                                        {n.trackerID}
                                    </TableCell>
                                    <TableCell>Reachable</TableCell>
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
    const { commissioningData } = state.app

    return {
        commissioningData
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


const connectedTrackerList = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrackerList))
export {connectedTrackerList as TrackerList}