import React from 'react';
import { NavBar } from '../NavBar/NavBar'
import {Dashboard} from '../Dashboard/Dashboard'
import { RowController }  from '../RowController/RowController'
import { ZoneController } from '../ZoneController/ZoneController'
import Sensors from '../Sensors/Sensors'
import { About } from '../About/About'
import { connect } from 'react-redux'
import { appService } from './app.services';
import { Snackbar } from '@material-ui/core';
import { SnackbarContentWrapper } from '../util/SnackbarContentWrapper';
import {withStyles} from '@material-ui/core/styles'
import socketIOClient from "socket.io-client";

const styles = theme => ({
    root: {
        height: '100%'
    }
})

const Initializing = () => <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#54aab3', color: 'white'}}>INITIALIZING...</div>

class App extends React.Component {
    queue = [];

    state = {
        open: false,
        alert: null,
    };

    componentDidMount = () => {
        this.props.init()

        const socket = socketIOClient(`http://${window.location.hostname}:5000`);
        socket.on('connect', data => console.log('connected'))
        socket.on('discovery', data => console.log(data))
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
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
                        onExited={this.handleExited}
                        >
                        <SnackbarContentWrapper
                            onClose={this.handleClose}
                            variant={this.state.alert === null ? 'info' : this.state.alert.type}
                            message={this.state.alert === null ? '' : this.state.alert.message}
                        />
                    </Snackbar>
                </div>
        )
    }
}

function mapStateToProps(state) {
    const { currentPage, alert } = state.app

    return {
        currentPage,
        alert
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
                dispatch({type: 'GET_TIMEZONE_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_TIMEZONE_FAILURE', error})
            })
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
    }
})


const connectedApp = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))
export {connectedApp as App}