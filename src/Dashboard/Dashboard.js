import React from 'react'
import { Grid, Paper, Button } from '@material-ui/core';
import { TrackerList } from './TrackerList'
import { TrackerDetails } from './TrackerDetails';
import {withStyles} from '@material-ui/core/styles'
import { appService } from '../App/app.services';
import {connect} from 'react-redux'

const styles = theme => ({
    root: {
        flexWrap: 'wrap',
        [theme.breakpoints.up('md')]: {
            height: '100%',
        }
    },
    trackerList: {
        width: '100%',
        padding: 10,
        [theme.breakpoints.up('md')]: {
            minHeight: '100%', width: '50%'
        }
    },
    trackerDetails: {
        width: '100%',
        padding: 10,
        [theme.breakpoints.up('md')]: {
            minHeight: '100%', width: '50%'
        }
    }
})

const Initializing = (props) => 
    <div 
        style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#54aab3', color: 'white'}}>
            <p style={{margin: 10}}>No static data found.  </p>
            <Button variant='contained' style={{margin: 10}} color='primary' onClick={() => props.scan()}>Add trackers</Button>
            <Button variant='contained' style={{margin: 10}} color='primary' onClick={() => props.getCommissioningData()}>Refresh static data</Button>
    </div>


const Fetching = () => 
    <div 
        style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#54aab3', color: 'white'}}>
            FETCHING...
    </div>



class Dashboard extends React.Component {

    state = {
    }

    getCommissioningData = () => {
        this.props.getCommissioningData()
    }

    scan = () => {
        this.props.scan()
    }

    render() {
        const { classes, commissioningData, fetchingCommissioningData } = this.props
        return ( fetchingCommissioningData ? <Fetching /> : commissioningData === null ? <Initializing scan={() => this.scan()} getCommissioningData={() => this.getCommissioningData()}/> :
            <Grid container direction="column" className={classes.root}>
                <Grid item className={classes.trackerList}>
                    <Paper style={{height: '100%'}}>
                        <TrackerList />
                    </Paper>
                </Grid>
                <Grid item className={classes.trackerDetails}>
                    <Paper style={{height: '100%'}}>
                        <TrackerDetails />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    const { commissioningData, fetchingCommissioningData } = state.app

    return {
        commissioningData,
        fetchingCommissioningData
    }
}

const mapDispatchToProps = (dispatch) => ({
    scan : () => {
        dispatch({type: 'SCAN'})
    },
    getCommissioningData: () => {
        dispatch({type: 'GET_COMMISSIONING_DATA_REQUEST'})
        appService.getCommissioningData()
            .then(json => {
                dispatch({type: 'GET_COMMISSIONING_DATA_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_COMMISSIONING_DATA_FAILURE', error})
            })
    }
})


const connectedDashboard = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))
export {connectedDashboard as Dashboard}