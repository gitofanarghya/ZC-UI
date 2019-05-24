import React, { Fragment } from 'react'
import LeftIcon from '@material-ui/icons/ArrowBack'
import { IconButton, Typography, Grid, Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
import { appService } from '../App/app.services';
import {connect} from 'react-redux'

const styles = theme => ({
    root: {},
    fieldGrid: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        padding: 10,
        overflow: 'auto'
    },
    field: {
        width: '45%',
        margin: '10px 2.5% 0px 2.5%',
        [theme.breakpoints.up('md')]: {
            width: '23%',
            margin: '10px 1% 0px 1%'
        }
    }
})

class EditRowController extends React.Component {
    state = {
        Lattitude: '',
        Longitude: '',
        Altitude: '',
        EastLimit: '',
        WestLimit: '',
        TrackerWidth: '',
        Pitch: '',
        TrackingAccuracy: '',
        AzimuthDeviation: '',
        AltitudeTrackeronEast: '',
        AltitudeTrackeronWest: '',
        StartTimeLead: '',
        EndTimeLag: '',
        WindStowAngle: '',
        SnowStowAngle: '',
        NightStowAngle: '',
        EmergencyStowAngle: '',
        CleanStowAngle: '',
        backTracking: false
    }

    handleChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    sendSPAParameters = () => {
        const { Lattitude, Longitude, Altitude, EastLimit, WestLimit, TrackerWidth, Pitch, TrackingAccuracy, AzimuthDeviation, AltitudeTrackeronEast, AltitudeTrackeronWest, StartTimeLead, EndTimeLag, backTracking } = this.state
        this.props.sendSPAParameters(this.props.editedTrackers, Lattitude, Longitude, Altitude, EastLimit, WestLimit, TrackerWidth, Pitch, TrackingAccuracy, AzimuthDeviation, AltitudeTrackeronEast, AltitudeTrackeronWest, StartTimeLead, EndTimeLag, backTracking)
    }

    sendStowAngles = () => {
        const { WindStowAngle, SnowStowAngle, CleanStowAngle, NightStowAngle, EmergencyStowAngle } = this.state
        this.props.sendStowAngles(this.props.editedTrackers, WindStowAngle, SnowStowAngle, CleanStowAngle, NightStowAngle, EmergencyStowAngle)
    }

    render() {console.log(this.state)
        const {classes} = this.props
        return (
            <Fragment>
                <Grid container direction='column' className={classes.root}>
                    <Grid item style={{height: 64, borderBottom: '0.1px solid lightgrey'}}>
                        <Typography variant='h5'>
                            <IconButton aria-label="Back" onClick={this.props.back} >
                                <LeftIcon fontSize="large" />
                            </IconButton>
                            Edit Parameters
                        </Typography>
                    </Grid>
                    <Typography variant='h6' style={{paddingLeft: 'calc(1% + 10px)'}}>
                        SPA Settings
                    </Typography>
                    <Grid item className={classes.fieldGrid}>
                        
                    {
                        ['Lattitude', 'Longitude', 'Altitude', 'East Limit', 'West Limit', 'Tracker Width', 'Pitch', 'Tracking Accuracy', 'Azimuth Deviation', 'Altitude Tracker on East', 'Altitude Tracker on West', 'Start Time Lead', 'End Time Lag'].map(p => {
                            return <TextField
                                key={p}
                                className={classes.field}
                                id={p}
                                name={p.replace(/ /g, '')}
                                label={p}
                                value={this.state[p.replace(/ /g, '')]}
                                onChange={(e) => this.handleChange(e)}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                            />
                        })
                    }
                        <FormControlLabel style={{ margin: 10, marginLeft: 'auto' }}
                            control={
                                <Checkbox color='primary' checked={this.state.backTracking} onClick={() => this.setState({...this.state, backTracking: !this.state.backTracking})}/>
                            }
                            label="Backtracking"
                        />
                        <Button color='primary' disabled variant='contained' style={{ margin: 10 }}>Sync time with Zone Controller</Button>    
                    </Grid>
                    <Grid item style={{height: 64, textAlign: 'center', borderBottom: '0.1px solid lightgrey'}}>
                        <Button color='primary' variant='contained' onClick={() => this.sendSPAParameters()} style={{ margin: 10 }}>Save</Button>
                    </Grid>
                    <Typography variant='h6' style={{paddingLeft: 'calc(1% + 10px)'}}>
                        Stow Angle Settings
                    </Typography>
                    <Grid item className={classes.fieldGrid}>
                        
                    {
                        ['Wind Stow Angle', 'Snow Stow Angle', 'Night Stow Angle', 'Emergency Stow Angle', 'Clean Stow Angle'].map(p => {
                            return <TextField
                                key={p}
                                className={classes.field}
                                id={p}
                                name={p.replace(/ /g, '')}
                                label={p}
                                value={this.state[p.replace(/ /g, '')]}
                                onChange={(e) => this.handleChange(e)}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                            />
                        })
                    }
                    </Grid>
                    <Grid item style={{height: 64, textAlign: 'center'}}>
                        <Button color='primary' variant='contained' onClick={() => this.sendStowAngles()} style={{ margin: 10 }}>Save</Button>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { editedTrackers } = state.app

    return {
        editedTrackers
    }
}

const mapDispatchToProps = (dispatch) => ({
    sendSPAParameters: (editedTrackers, Lattitude, Longitude, Altitude, EastLimit, WestLimit, TrackerWidth, Pitch, TrackingAccuracy, AzimuthDeviation, AltitudeTrackeronEast, AltitudeTrackeronWest, StartTimeLead, EndTimeLag, backTracking) => {
        editedTrackers.map(t => {
            dispatch({type: 'SEND_SPA_PARAMETERS_REQUEST', t})
            appService.sendSPAParameters(t.deviceID, Lattitude, Longitude, Altitude, EastLimit, WestLimit, TrackerWidth, Pitch, TrackingAccuracy, AzimuthDeviation, AltitudeTrackeronEast, AltitudeTrackeronWest, StartTimeLead, EndTimeLag, backTracking)
                .then(json => {
                    dispatch({type: 'SEND_SPA_PARAMETERS_SUCCESS'})
                }, error => {
                    dispatch({type: 'SEND_SPA_PARAMETERS_FAILURE'})
                })
        })
        
    },
    sendStowAngles: (editedTrackers, WindStowAngle, SnowStowAngle, CleanStowAngle, NightStowAngle, EmergencyStowAngle) => {
        editedTrackers.map(t => {
            dispatch({type: 'SEND_STOW_ANGLES_REQUEST', t})
            appService.sendStowAngles(t.deviceID, WindStowAngle, SnowStowAngle, CleanStowAngle, NightStowAngle, EmergencyStowAngle)
                .then(json => {
                    dispatch({type: 'SEND_STOW_ANGLES_SUCCESS'})
                }, error => {
                    dispatch({type: 'SEND_STOW_ANGLES_FAILURE'})
                })
        })
    }
})


const connectedEditRowController = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditRowController))
export {connectedEditRowController as EditRowController}