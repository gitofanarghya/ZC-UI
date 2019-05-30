import React, { Fragment } from 'react'
import LeftIcon from '@material-ui/icons/ArrowBack'
import { IconButton, Typography, Grid, Button, TextField, FormControlLabel, Checkbox, InputAdornment } from '@material-ui/core';
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
        TrackingLimitEast: '',
        TrackingLimitWest: '',
        RowWidth: '',
        RowPitch: '',
        TrackingResolution: '',
        AzimuthDeviation: '',
        AltitudeofTrackerontheEast: '',
        AltitudeofTrackerontheWest: '',
        EarlyStartMinutes: '',
        LateFinishMinutes: '',
        LattitudeError: '',
        LongitudeError: '',
        AltitudeError: '',
        TrackingLimitEastError: '',
        TrackingLimitWestError: '',
        RowWidthError: '',
        RowPitchError: '',
        TrackingResolutionError: '',
        AzimuthDeviationError: '',
        AltitudeofTrackerontheEastError: '',
        AltitudeofTrackerontheWestError: '',
        EarlyStartMinutesError: '',
        LateFinishMinutesError: '',
        WindStowAngle: '',
        SnowStowAngle: '',
        NightStowAngle: '',
        EmergencyStowAngle: '',
        CleanStowAngle: '',
        backTracking: '0',
        submit: true
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
                TrackingLimitEast: values[3],
                TrackingLimitWest: values[4],
                RowWidth: values[5],
                RowPitch: values[6],
                TrackingResolution: values[7],
                AzimuthDeviation: values[8],
                AltitudeofTrackerontheEast: values[9],
                AltitudeofTrackerontheWest: values[10],
                EarlyStartMinutes: values[11],
                LateFinishMinutes: values[12],
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
            [event.target.name]: event.target.value,
            [`${event.target.name}Error`]: '',
            submit: true
        })
    }

    handleChangeSPA = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
            [`${event.target.name}Error`]: '',
            submit: true
        })
        /* const value = Number(event.target.value)
        if(!isNaN(value)) {
            if(p.min && p.max) {
                if(value < p.min || value > p.max) {
                    this.setState({
                        ...this.state,
                        [`${event.target.name}Error`]: `min: ${p.min} max: ${p.max}`
                    })
                } else {
                    this.setState({
                        ...this.state,
                        [event.target.name]: value,
                        [`${event.target.name}Error`]: ''
                    })
                }
            } else if(p.min) {
                if(value < p.min) {
                    this.setState({
                        ...this.state,
                        [`${event.target.name}Error`]: `min: ${p.min}`
                    })
                } else {
                    this.setState({
                        ...this.state,
                        [event.target.name]: value,
                        [`${event.target.name}Error`]: ''
                    })
                }
            } else if(p.max) {
                if(value > p.max) {
                    this.setState({
                        ...this.state,
                        [`${event.target.name}Error`]: `max: ${p.max}`
                    })
                } else {
                    this.setState({
                        ...this.state,
                        [event.target.name]: value,
                        [`${event.target.name}Error`]: ''
                    })
                }
            } else {
                this.setState({
                    ...this.state,
                    [event.target.name]: value,
                    [`${event.target.name}Error`]: ''
                })
            }
        } else if(event.target.value === '-' || event.target.value === '.') {
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value,
                [`${event.target.name}Error`]: ''
            })
        } else {
            this.setState({
                ...this.state,
                [`${event.target.name}Error`]: 'Please enter valid number'
            })
        } */
    }

    handleBlur = (e, p) => {
        if(e.target.value === '') {
            this.setState({
                ...this.state,
                [e.target.name]: this.props.SPAParameters.VALUES.split(',')[p.value],
                [`${e.target.name}Error`]: '',
                submit: false
            })
        } else {
            const regex = new RegExp("^[-+]?[0-9]*\.?[0-9]+$")
            const regexTest = regex.test(e.target.value)
            if(!regexTest) {
                this.setState({
                    ...this.state,
                    [`${e.target.name}Error`]: `Please enter a number.`,
                    submit: false
                })
            } else {
                const value = Number(e.target.value)
                if(p.min !== null && p.max !== null) {
                    if(value < p.min || value > p.max) {
                        this.setState({
                            ...this.state,
                            [`${e.target.name}Error`]: `min: ${p.min} max: ${p.max}`,
                            submit: false
                        })
                    }
                } else if(p.min !== null) {
                    if(value < p.min) {
                        this.setState({
                            ...this.state,
                            [`${e.target.name}Error`]: `min: ${p.min}`,
                            submit: false
                        })
                    }
                } else if(p.max != null) {
                    if(value > p.max) {
                        this.setState({
                            ...this.state,
                            [`${e.target.name}Error`]: `max: ${p.max}`,
                            submit: false
                        })
                    }
                }
            }
            
        }
    }

    sendSPAParameters = () => {
        const { Lattitude, Longitude, Altitude, TrackingLimitEast, TrackingLimitWest, RowWidth, RowPitch, TrackingResolution, AzimuthDeviation, AltitudeofTrackerontheEast, AltitudeofTrackerontheWest, EarlyStartMinutes, LateFinishMinutes, backTracking } = this.state
        this.props.sendSPAParameters(this.props.editedTrackers, Lattitude, Longitude, Altitude, TrackingLimitEast, TrackingLimitWest, RowWidth, RowPitch, TrackingResolution, AzimuthDeviation, AltitudeofTrackerontheEast, AltitudeofTrackerontheWest, EarlyStartMinutes, LateFinishMinutes, backTracking)
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
                        [
                            {
                                key: 'Lattitude',
                                adornment: 'Deg',
                                min: -90,
                                max: +90,
                                value: 0
                            },
                            {
                                key: 'Longitude', 
                                adornment: 'Deg',
                                min: -180,
                                max: +180,
                                value: 1
                            }, 
                            { 
                                key: 'Altitude',
                                adornment: 'm',
                                min: 0,
                                max: null,
                                value: 2
                            }, 
                            { 
                                key: 'Tracking Limit - East', 
                                adornment: 'Deg',
                                min: -60,
                                max: 0,
                                value: 3
                            }, 
                            { 
                                key: 'Tracking Limit - West', 
                                adornment: 'Deg',
                                min: 0,
                                max: +60,
                                value: 4 
                            }, 
                            { 
                                key: 'Row Width', 
                                adornment: 'm',
                                min: 0,
                                max: null,
                                value: 5
                            }, 
                            { 
                                key: 'Row Pitch', 
                                adornment: 'm',
                                min: 0,
                                max: null,
                                value: 6
                            }, 
                            { 
                                key: 'Tracking Resolution', 
                                adornment: 'Deg',
                                min: +0.50,
                                max: +30.0,
                                value: 7 
                            }, 
                            { 
                                key: 'Azimuth Deviation', 
                                adornment: 'Deg',
                                min: -90,
                                max: +90,
                                value: 8  
                            }, 
                            { 
                                key: 'Altitude of Tracker on the East', 
                                adornment: 'm',
                                min: 0,
                                max: null,
                                value: 9 
                            }, 
                            { 
                                key: 'Altitude of Tracker on the West', 
                                adornment: 'm',
                                min: 0,
                                max: null,
                                value: 10
                            }, 
                            { 
                                key: 'Early Start Minutes', 
                                adornment: 'Minutes',
                                min: 0,
                                max: null,
                                value: 11
                            }, 
                            { 
                                key: 'Late Finish Minutes',
                                adornment: 'Minutes',
                                min: 0,
                                max: null,
                                value: 12
                            }
                        ].map(p => {
                            return <TextField
                                key={p.key}
                                className={classes.field}
                                id={p.key}
                                name={p.key.replace(/ /g, '').replace(/-/g, '')}
                                label={p.key}
                                value={this.state[p.key.replace(/ /g, '').replace(/-/g, '')]}
                                onChange={(e) => this.handleChange(e)}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                disabled={this.props.sendingSPAParameters || this.props.gettingSPAParameters}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{p.adornment}</InputAdornment>,
                                  }}
                                error={this.state[`${p.key.replace(/ /g, '').replace(/-/g, '')}Error`] !== ''}
                                helperText={this.state[`${p.key.replace(/ /g, '').replace(/-/g, '')}Error`]}
                                onBlur={(e) => this.handleBlur(e, p)}
                            />
                        })
                    }
                        <FormControlLabel disabled={this.props.sendingSPAParameters || this.props.gettingSPAParameters} style={{ margin: 10, marginLeft: 'auto' }}
                            control={
                                <Checkbox color='primary' checked={this.state.backTracking === '1'} onClick={() => this.setState({...this.state, backTracking: !this.state.backTracking})}/>
                            }
                            label="Enable Backtracking"
                        />
                        <Button color='primary' disabled variant='contained' style={{ margin: 10 }}>Sync time with Zone Controller</Button>    
                    </Grid>
                    <Grid item style={{height: 64, textAlign: 'center', borderBottom: '0.1px solid lightgrey'}}>
                        <Button color='primary' disabled={this.props.sendingSPAParameters || this.props.gettingSPAParameters || !this.state.submit} variant='contained' onClick={() => this.sendSPAParameters()} style={{ margin: 10 }}>Save</Button>
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
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Deg</InputAdornment>,
                                  }}
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