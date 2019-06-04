import React from 'react';
import { NavBar } from '../NavBar/NavBar'
import {Dashboard} from '../Dashboard/Dashboard'
import { RowController }  from '../RowController/RowController'
import { ZoneController } from '../ZoneController/ZoneController'
import { Sensors } from '../Sensors/Sensors'
import { About } from '../About/About'
import { connect } from 'react-redux'
import { appService } from './app.services';
import { Snackbar, DialogActions, DialogTitle, Dialog, DialogContent, Button, DialogContentText, Slide } from '@material-ui/core';
import { SnackbarContentWrapper } from '../util/SnackbarContentWrapper';
import {withStyles} from '@material-ui/core/styles'
import socketIOClient from "socket.io-client";
import { store } from '../util/store'

const styles = theme => ({
    root: {
        height: '100%'
    },
    topCenter: {
        top: 75
    }
})

const Initializing = () => <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#54aab3', color: 'white'}}>INITIALIZING...</div>

class App extends React.Component {
    queue = [];
    timer = null

    state = {
        open: false,
        alert: null,
    };

    componentDidMount = () => {
        this.props.init()
        const io = socketIOClient(`http://${window.location.hostname}:8080`);
        io.on('connect', () => {
            console.log('connected')
        })
        io.on('ui/rover/scan', data => {
            const json = JSON.parse(data)
            this.props.received('ui/rover/scan', json)
        })
        io.on('ui/rover/spa', data => {
            const json = JSON.parse(data)
            this.props.received('ui/rover/spa', json)
        })
        io.on('ui/rover/stowangles', data => {
            const json = JSON.parse(data)
            this.props.received('ui/rover/stowangles', json)
        })
        io.on('ui/rover/response/multiple', data => {
            const json = JSON.parse(data)
            this.props.received('ui/rover/response/multiple', json)
        })
        io.on('time', data => {
            const json = JSON.parse(data)
            this.props.received('time', json)
        })
        io.on('sensorReadings/wind', data => {
            const json = JSON.parse(data)
            this.props.received('sensorReadings/wind', json)
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.alert !== null && (nextProps.alert !== this.props.alert)) {
            this.queue.push(nextProps.alert);
        
            if (this.state.open) {
                this.setState({ open: false });
            } else {
                this.processQueue();
            }    
        }
    }

    processQueue = () => {
        if (this.queue.length > 0) {
            this.setState({
                alert: this.queue.shift(),
                open: true,
            });
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        this.setState({ open: false });
    };

    handleExited = () => {
        this.processQueue();
    };

    render() {
        const {classes} = this.props
        return ( 
                <div className={classes.root}>
                    <NavBar>
                    {
                        this.props.currentPage === 'Dashboard' ? <Dashboard /> :
                        this.props.currentPage === 'Row Controller' ? <RowController /> :
                        this.props.currentPage === 'Zone Controller' ? <ZoneController /> :
                        this.props.currentPage === 'Sensors' ? <Sensors /> : 
                        this.props.currentPage === 'About' ? <About /> : <Initializing />
                    }
                    </NavBar>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.open}
                        //autoHideDuration={3000}
                        onClose={this.handleClose}
                        onExited={this.handleExited}
                        classes={{anchorOriginTopCenter: classes.topCenter}}
                    >
                        <SnackbarContentWrapper
                            onClose={this.handleClose}
                            variant={this.state.alert === null ? 'info' : this.state.alert.type}
                            message={this.state.alert === null ? '' : this.state.alert.message}
                        />
                    </Snackbar>
                    {/* <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ minWidth: 300 }}
                    >
                        <DialogTitle id="alert-dialog-title" style={{color:'white', background: this.state.alert !== null ? this.state.alert.type==='success' ? 'green' : this.state.alert.type === 'warning' ? 'orange' : 'red' : 'blue'}}>{this.state.alert === null ? 'info' : this.state.alert.type}</DialogTitle>
                        <DialogContent style={{color:'white', background: this.state.alert !== null ? this.state.alert.type==='success' ? 'green' : this.state.alert.type === 'warning' ? 'orange' : 'red' : 'blue'}}>
                        <DialogContentText id="alert-dialog-description" style={{color:'white'}}>
                            {this.state.alert === null ? '' : this.state.alert.message}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{color:'white', background: this.state.alert !== null ? this.state.alert.type==='success' ? 'green' : this.state.alert.type === 'warning' ? 'orange' : 'red' : 'blue'}}>
                        <Button onClick={this.handleClose} color="primary" variant='contained'>
                            Close
                        </Button>
                        </DialogActions>
                    </Dialog> */}
                </div>
        )
    }
}

function mapStateToProps(state) {
    const { currentPage, alert, timeZone } = state.app

    return {
        currentPage,
        alert,
        timeZone
    }
}

const mapDispatchToProps = (dispatch) => ({
    init: () => {
        dispatch({type: 'GET_COMMISSIONING_DATA_REQUEST'})
        appService.getCommissioningData()
            .then(json => {
                dispatch({type: 'GET_COMMISSIONING_DATA_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_COMMISSIONING_DATA_FAILURE', error})
            })
        
        dispatch({type: 'GET_TIMEZONE_REQUEST'})
        appService.getTimeZone()
            .then(json => {
                if(json.timeZone === null) {
                    dispatch({type: 'SET_TIMEZONE_REQUEST'})
                    appService.setTimeZone(store.getState().app.timeZone)
                        .then(json => {
                            dispatch({type: 'SET_TIMEZONE_SUCCESS'})
                        }, error => {
                            dispatch({type: 'SET_TIMEZONE_FAILURE'})
                        })
                }
                dispatch({type: 'GET_TIMEZONE_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_TIMEZONE_FAILURE', error})
            })
    },
    getTime: () => {
        dispatch({type: 'GET_TIME_REQUEST'})
        appService.getTime()
            .then(json => {
                dispatch({type: 'GET_TIME_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_TIME_FAILURE', error})
            })
    },
    clearAlert : () => {
        dispatch({type: 'CLEAR_ALERT'})
    },
    received: (topic, json) => {
        dispatch({type: topic, json})
    }
})


const connectedApp = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))
export {connectedApp as App}