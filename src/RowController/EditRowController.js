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
        backTracking: '0'
    }

    componentDidMount = () => {
        if(this.props.editedTrackers.length === 1) {
            this.props.getSPAParameters(this.props.editedTrackers[0].deviceID)
            this.props.getStowAngles(this.props.editedTrackers[0].deviceID)
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.SPAParameters !== this.props.SPAParameters) {
            const values = nextProps.SPAParameters.VALUES.split(',')
            this.setState({
                Lattitude: values[0],
                Longitude: values[1],
                Altitude: values[2],
                EastLimit: values[3],
                WestLimit: values[4],
                TrackerWidth: values[5],
                Pitch: values[6],
                TrackingAccuracy: values[7],
                AzimuthDeviation: values[8],
                AltitudeTrackeronEast: values[9],
                AltitudeTrackeronWest: values[10],
                StartTimeLead: values[11],
                EndTimeLag: values[12],
                backTracking: values[14]
            })
        }
        if(nextProps.stowAngles !== this.props.stowAngles) {
            const values = nextProps.stowAngles.VALUES.split(',')
            this.setState({
                WindStowAngle: values[0],
                SnowStowAngle: values[1],
                NightStowAngle: values[2],
                EmergencyStowAngle: values[3],
                CleanStowAngle: values[4]
            })
        }
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

    render() {
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
                                disabled={this.props.sendingSPAParameters || this.props.gettingSPAParameters}
                            />
                        })
                    }
                        <FormControlLabel disabled={this.props.sendingSPAParameters || this.props.gettingSPAParameters} style={{ margin: 10, marginLeft: 'auto' }}
                            control={
                                <Checkbox color='primary' checked={this.state.backTracking === '0'} onClick={() => this.setState({...this.state, backTracking: !this.state.backTracking})}/>
                            }
                            label="Backtracking"
                        />
                        <Button color='primary' disabled variant='contained' style={{ margin: 10 }}>Sync time with Zone Controller</Button>    
                    </Grid>
                    <Grid item style={{height: 64, textAlign: 'center', borderBottom: '0.1px solid lightgrey'}}>
                        <Button color='primary' disabled={this.props.sendingSPAParameters || this.props.gettingSPAParameters} variant='contained' onClick={() => this.sendSPAParameters()} style={{ margin: 10 }}>Save</Button>
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
                                disabled={this.props.sendingStowAngles || this.props.gettingStowAngles}
                            />
                        })
                    }
                    </Grid>
                    <Grid item style={{height: 64, textAlign: 'center'}}>
                        <Button color='primary' disabled={this.props.sendingStowAngles || this.props.gettingStowAngles} variant='contained' onClick={() => this.sendStowAngles()} style={{ margin: 10 }}>Save</Button>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { editedTrackers, SPAParameters, stowAngles, sendingSPAParameters, sendingStowAngles, gettingSPAParameters, gettingStowAngles } = state.app

    return {
        editedTrackers,
        SPAParameters,
        stowAngles,
        sendingSPAParameters,
        sendingStowAngles,
        gettingSPAParameters,
        gettingStowAngles
    }
}

const mapDispatchToProps = (dispatch) => ({
    sendSPAParameters: (editedTrackers, Lattitude, Longitude, Altitude, EastLimit, WestLimit, TrackerWidth, Pitch, TrackingAccuracy, AzimuthDeviation, AltitudeTrackeronEast, AltitudeTrackeronWest, StartTimeLead, EndTimeLag, backTracking) => {
        editedTrackers.map(t => {
            dispatch({type: 'SEND_SPA_PARAMETERS_REQUEST', t})
            appService.sendSPAParameters(t.deviceID, Lattitude, Longitude, Altitude, EastLimit, WestLimit, TrackerWidth, Pitch, TrackingAccuracy, AzimuthDeviation, AltitudeTrackeronEast, AltitudeTrackeronWest, StartTimeLead, EndTimeLag, backTracking)
                .then(json => {
                    dispatch({type: 'SEND_SPA_PARAMETERS_SUCCESS'})
                    dispatch({type: 'GET_SPA_PARAMETERS_REQUEST'})
                    appService.getSPAParameters(t.deviceID)
                        .then(json => {
                            dispatch({type: 'GET_SPA_PARAMETERS_SUCCESS'})
                        }, error => {
                            dispatch({type: 'GET_SPA_PARAMETERS_FAILURE'})
                        })

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
                    dispatch({type: 'GET_STOW_ANGLES_REQUEST'})
                    appService.getStowAngles(t.deviceID)
                        .then(json => {
                            dispatch({type: 'GET_STOW_ANGLES_SUCCESS'})
                        }, error => {
                            dispatch({type: 'GET_STOW_ANGLES_FAILURE'})
                        })
                }, error => {
                    dispatch({type: 'SEND_STOW_ANGLES_FAILURE'})
                })
        })
    },
    getStowAngles: (DID) => {
        dispatch({type: 'GET_STOW_ANGLES_REQUEST'})
        appService.getStowAngles(DID)
            .then(json => {
                dispatch({type: 'GET_STOW_ANGLES_SUCCESS'})
            }, error => {
                dispatch({type: 'GET_STOW_ANGLES_FAILURE'})
            })
    },
    getSPAParameters: (DID) => {
        dispatch({type: 'GET_SPA_PARAMETERS_REQUEST'})
        appService.getSPAParameters(DID)
            .then(json => {
                dispatch({type: 'GET_SPA_PARAMETERS_SUCCESS'})
            }, error => {
                dispatch({type: 'GET_SPA_PARAMETERS_FAILURE'})
            })
    }
})


const connectedEditRowController = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditRowController))
export {connectedEditRowController as EditRowController}