import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { appService } from '../App/app.services';
import {connect} from 'react-redux'
import { Grid, List, ListItem, ListItemText, Typography, AppBar, Toolbar } from '@material-ui/core';

const styles = theme => ({
    root: {
      flexDirection: 'row'
    },
    inner: {
        width: '50%',
        paddingTop: 0,
        padding: 10
    }
});


class Logs extends React.Component {

    state = {
        
    }

    componentDidMount = () => {
        this.props.getLogs()
    }

    render() {
        const { classes, logList } = this.props

        return (
            <Grid container className={classes.root}>
            <Grid item className={classes.inner}>
            <AppBar position="static" color='primary'>
                <Toolbar style={{minHeight: 48}} disableGutters>
                <Typography variant="subtitle1" style={{margin: 'auto'}}>
                    Log Files
                </Typography>
                </Toolbar>
            </AppBar>
            <List dense style={{fontSize: 14, padding: 0, color: '#404040', height: 'calc(100% - 35px)', width: '100%', overflow: 'auto'}}>
            {logList.map(r => 
                <ListItem
                key={r}
                onClick={() => window.open(`http://${window.location.hostname}:5000/downloadLogs/${r}`, '_blank')}
                button
                style={{backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }
                >
                    <ListItemText primary={r} />
                </ListItem>
            )
            }   
            </List>
            </Grid>
            <Grid item className={classes.inner}>
            <AppBar position="static" color='primary'>
                <Toolbar style={{minHeight: 48}} disableGutters>
                <Typography variant="subtitle1" style={{margin: 'auto'}}>
                    Logs From Database
                </Typography>
                </Toolbar>
            </AppBar>
            <List dense style={{fontSize: 14, padding: 0, color: '#404040', height: 'calc(100% - 35px)', width: '100%', overflow: 'auto'}}>
                <ListItem
                onClick={() => window.open(`http://${window.location.hostname}:5000/downloadSensorLogs/WIND_DIRECTION`, '_blank')}
                button
                style={{backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }
                >
                    <ListItemText primary='Wind Direction' />
                </ListItem>
                <ListItem
                onClick={() => window.open(`http://${window.location.hostname}:5000/downloadSensorLogs/WIND_SPEED`, '_blank')}
                button
                style={{backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }
                >
                    <ListItemText primary='Wind Speed' />
                </ListItem>
                <ListItem
                onClick={() => window.open(`http://${window.location.hostname}:5000/downloadSensorLogs/FLOOD_LEVEL`, '_blank')}
                button
                style={{backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }
                >
                    <ListItemText primary='Flood Level' />
                </ListItem>
                <ListItem
                onClick={() => window.open(`http://${window.location.hostname}:5000/downloadSensorLogs/SNOW_FALL`, '_blank')}
                button
                style={{backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }
                >
                    <ListItemText primary='Snow Fall' />
                </ListItem>
            </List>    
            </Grid>
            
            </Grid>
        )
    }
    
}


function mapStateToProps(state) {
    const { logList } = state.app

    return {
        logList,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getLogs: () => {
        dispatch({type: 'GET_LOGS_LIST_REQUEST'})
        appService.getDownloadLogList()
            .then(json => {
                dispatch({type: 'GET_LOGS_LIST_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_LOGS_LIST_FAILURE'})
            })        
    }
})


const connectedLogs = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Logs))
export {connectedLogs as Logs}