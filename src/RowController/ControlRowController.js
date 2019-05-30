import React, { Fragment } from 'react'
import LeftIcon from '@material-ui/icons/ArrowBack'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, Typography, Grid, Button, Menu, MenuItem, FormControlLabel, Switch } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { appService } from '../App/app.services';
import {connect} from 'react-redux'

const styles = theme => ({
    root: {
        height: 'calc(100% - 48px)'
    },
    second: {
        height: 'calc(100% - 128px)', 
        display: 'flex', 
        flexDirection: 'column', 
        flexWrap: 'wrap', 
        padding: 10,
        overflow: 'auto'
    }
})

class ControlRowController extends React.Component {
    state = {
        typeOfStow: 'STOW'
    }

    handleClick = event => {
        this.setState({ ...this.state, anchorEl: event.currentTarget });
    };

    handleClose = (key) => {
        this.setState({ typeOfStow: key, anchorEl: null });
    };

    autoToggle = () => {

    } 

    render() {
        const { classes } = this.props
        const { anchorEl } = this.state
        return (
            <Fragment>

                <Grid container direction='column' className={classes.root}>
                    <Grid item style={{height: 64}}>
                        <Typography variant='h5'>
                            <IconButton aria-label="Back" onClick={this.props.back} >
                                <LeftIcon fontSize="large" />
                            </IconButton>
                            Control
                        </Typography>
                    </Grid>
                    <Grid item className={classes.second}>
                    
                    </Grid>
                    <Grid item style={{textAlign: 'center'}}>
                        <Button color='primary' variant='contained' onClick={() => this.props.controlledTrackers.map(t => this.props.sendCommand(t.deviceID, 'NEGATIVE'))} style={{ margin: 10 }}>Run West</Button>
                        <Button color='primary' variant='contained' onClick={() => this.props.controlledTrackers.map(t => this.props.sendCommand(t.deviceID, 'POSITIVE'))} style={{ margin: 10 }}>Run East</Button>
                        <Button color='primary' variant='contained' onClick={() => this.props.controlledTrackers.map(t => this.props.sendCommand(t.deviceID, 'STOP'))} style={{ margin: 10 }}>Stop</Button>
                        <Button color='primary' disabled={this.state.typeOfStow === 'STOW'} onClick={() => this.props.controlledTrackers.map(t => this.props.sendStow(t.deviceID, this.state.typeOfStow))} variant='contained' style={{ marginLeft: 10 }}>{this.state.typeOfStow}</Button>
                        <Button 
                            color='primary' 
                            variant='contained' 
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            style={{ minWidth: 24, paddingLeft: 0, paddingRight: 0}}
                        >
                            <ExpandMoreIcon />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            >
                            <MenuItem onClick={() => this.handleClose('WIND')}>WIND</MenuItem>
                            <MenuItem onClick={() => this.handleClose('SNOW')}>SNOW</MenuItem>
                            <MenuItem onClick={() => this.handleClose('NIGHT')}>NIGHT</MenuItem>
                            <MenuItem onClick={() => this.handleClose('CLEAN')}>CLEAN</MenuItem>
                            <MenuItem onClick={() => this.handleClose('EMERGENCY')}>EMERGENCY</MenuItem>
                        </Menu>
                        <FormControlLabel style={{ margin: 10 }} labelPlacement="top"
                            control={
                                <Switch color='primary' checked={this.state.auto} onClick={() => this.autoToggle()} />
                            }
                            label="Enable Auto Mode"
                        />
                    </Grid>
                </Grid>

            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { controlledTrackers } = state.app

    return {
        controlledTrackers,
    }
}

const mapDispatchToProps = (dispatch) => ({
    sendCommand: (DID, value) => {
        dispatch({type: 'SEND_COMMAND_REQUEST'})
        appService.sendCommand(DID, value)
            .then(json => {
                dispatch({type: 'SEND_COMMAND_SUCCESS'})
            }, error => {
                dispatch({type: 'SEND_COMMAND_FAILURE'})
            })
    },
    sendStow: (DID, mode) => {
        dispatch({type: 'SEND_STOW_REQUEST'})
        appService.sendStow(DID, mode)
            .then(json => {
                dispatch({type: 'SEND_STOW_SUCCESS'})
            }, error => {
                dispatch({type: 'SEND_STOW_FAILURE'})
            })
    }
})


const connectedControlRowController = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ControlRowController))
export {connectedControlRowController as ControlRowController}