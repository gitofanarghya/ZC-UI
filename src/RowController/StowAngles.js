import React, { Fragment } from 'react'
import { Grid, Button, TextField, InputAdornment } from '@material-ui/core';
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

class StowAngles extends React.Component {
    state = {
        WindStowAngle: '',
        SnowStowAngle: '',
        NightStowAngle: '',
        EmergencyStowAngle: '',
        CleanStowAngle: '',
        submit: true
    }

    componentDidMount = () => {
        if(this.props.editedTrackers.length === 1) {
            this.props.getStowAngles(this.props.editedTrackers[0].deviceID)
        }
    }

    componentWillReceiveProps = (nextProps) => {
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

    sendStowAngles = () => {
        const { WindStowAngle, SnowStowAngle, CleanStowAngle, NightStowAngle, EmergencyStowAngle } = this.state
        this.props.sendStowAngles(this.props.editedTrackers, WindStowAngle, SnowStowAngle, CleanStowAngle, NightStowAngle, EmergencyStowAngle)
    }

    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <Grid container direction='column' className={classes.root}>
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
    const { editedTrackers, stowAngles, sendingStowAngles, gettingStowAngles } = state.app

    return {
        editedTrackers,
        stowAngles,
        sendingStowAngles,
        gettingStowAngles
    }
}

const mapDispatchToProps = (dispatch) => ({
    sendStowAngles: (editedTrackers, WindStowAngle, SnowStowAngle, CleanStowAngle, NightStowAngle, EmergencyStowAngle) => {
        dispatch({type: 'SET_RESPONSE_LISTENER'})
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


const connectedStowAngles = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StowAngles))
export {connectedStowAngles as StowAngles}