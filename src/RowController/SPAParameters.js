import React, { Fragment } from 'react'
import { Grid, Button, TextField, FormControlLabel, Checkbox, InputAdornment } from '@material-ui/core';
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
            width: '31.33%',
            margin: '10px 1% 0px 1%'
        }
    }
})

class SPAParameters extends React.Component {
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
        backTracking: '0',
        submit: true
    }

    componentDidMount = () => {
        if(this.props.editedTrackers.length ===  1) {
            this.props.getSPAParameters(this.props.editedTrackers[0].deviceID)
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
    }

    handleChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
            [`${event.target.name}Error`]: '',
            submit: true
        })
    }

    handleBlur = (e, p) => {
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

    sendSPAParameters = () => {
        const { Lattitude, Longitude, Altitude, TrackingLimitEast, TrackingLimitWest, RowWidth, RowPitch, TrackingResolution, AzimuthDeviation, AltitudeofTrackerontheEast, AltitudeofTrackerontheWest, EarlyStartMinutes, LateFinishMinutes, backTracking } = this.state
        this.props.sendSPAParameters(this.props.editedTrackers, Lattitude, Longitude, Altitude, TrackingLimitEast, TrackingLimitWest, RowWidth, RowPitch, TrackingResolution, AzimuthDeviation, AltitudeofTrackerontheEast, AltitudeofTrackerontheWest, EarlyStartMinutes, LateFinishMinutes, backTracking)
    }

    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <Grid container direction='column' className={classes.root}>
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
                        <FormControlLabel disabled={this.props.sendingSPAParameters || this.props.gettingSPAParameters} className={classes.field}
                            control={
                                <Checkbox color='primary' checked={this.state.backTracking === '1'} onClick={() => this.setState({...this.state, backTracking: this.state.backTracking === '0' ? '1' : '0'})}/>
                            }
                            label="Enable Backtracking"
                        />
                        <Button color='primary' disabled variant='contained' className={classes.field}>Sync time with Zone Controller</Button>    
                    </Grid>
                    <Grid item style={{textAlign: 'center'}}>
                        <Button color='primary' disabled={this.props.sendingSPAParameters || this.props.gettingSPAParameters || !this.state.submit} variant='contained' onClick={() => this.sendSPAParameters()} style={{ margin: 10 }}>Save</Button>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { editedTrackers, sendingSPAParameters } = state.app

    return {
        editedTrackers,
        sendingSPAParameters,
    }
}

const mapDispatchToProps = (dispatch) => ({
    sendSPAParameters: (editedTrackers, Lattitude, Longitude, Altitude, EastLimit, WestLimit, TrackerWidth, Pitch, TrackingAccuracy, AzimuthDeviation, AltitudeTrackeronEast, AltitudeTrackeronWest, StartTimeLead, EndTimeLag, backTracking) => {
        dispatch({type: 'SET_RESPONSE_LISTENER'})
        editedTrackers.map(t => {
            dispatch({type: 'SEND_SPA_PARAMETERS_REQUEST', t})
            appService.sendSPAParameters(t.deviceID, Lattitude, Longitude, Altitude, EastLimit, WestLimit, TrackerWidth, Pitch, TrackingAccuracy, AzimuthDeviation, AltitudeTrackeronEast, AltitudeTrackeronWest, StartTimeLead, EndTimeLag, backTracking)
                .then(json => {
                    dispatch({type: 'SEND_SPA_PARAMETERS_SUCCESS'})
                }, error => {
                    dispatch({type: 'SEND_SPA_PARAMETERS_FAILURE'})
                })
        })
        
    }
})


const connectedSPAParameters = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SPAParameters))
export {connectedSPAParameters as SPAParameters}