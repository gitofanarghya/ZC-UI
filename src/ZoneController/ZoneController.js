import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography, IconButton, FormControlLabel, FormControl, Radio, RadioGroup, Button, MenuItem, OutlinedInput, Select, InputLabel, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux'
import { appService } from '../App/app.services';
import Refresh from '@material-ui/icons/Refresh'

const styles = theme => ({
  root: {
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
        height: '660px'
    }
  },
  grid2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    [theme.breakpoints.up('md')]: {
        width: '30%',
    }
  },
  field: {
    flexDirection: 'row',
    [theme.breakpoints.up('md')]: {
        margin: '10px 0 0 0'
    }
  },
  saveButton: {
    margin: '10px 10px 10px 5%',
    alignSelf: 'start',
    [theme.breakpoints.down('sm')]: {
        width: '90%',
        margin: 10,
        alignSelf: 'center'
    }
  },
  button: {
      width: '10%'
  },
  selectWifi: {
      width: '90%'
  }
});

class ZoneController extends React.Component {

    state = {
        ssid: '',
        password: '',
        staticIP: ''
    }

    componentDidMount = () => {
        this.props.scanWifi()
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    setWifiInfo = () => {
        this.props.setWifiInfo(this.state.ssid, this.props.password, this.state.staticIP)
    }


    render() {
        const { classes, wifiList } = this.props
        return (
            <Fragment>
                    <Grid item xs={12} container direction='column' justify='center' alignItems='center' className={classes.root}>
                        <div className={classes.grid2}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Network
                        </Typography>
                        <FormControl variant="outlined" className={classes.field} fullWidth>
                            <InputLabel htmlFor="ssid">
                                SSID
                            </InputLabel>
                            <Select
                                value={this.state.ssid}
                                onChange={this.handleChange}
                                autoWidth
                                className={classes.selectWifi}
                                input={<OutlinedInput labelWidth={50} name="ssid" id="ssid" />}
                            >
                                {
                                    wifiList.length === 0 ? <MenuItem value={'none'}> <CircularProgress /></MenuItem> : wifiList.map(w => <MenuItem key={w} value={w}>{w}</MenuItem>)
                                }
                                
                            </Select>
                            <IconButton className={classes.button} onClick={() => this.props.scanWifi()} aria-label="Refresh Wifi list">
                                <Refresh />
                            </IconButton>
                        </FormControl>
                        <TextField
                            className={classes.field}
                            fullWidth
                            name='password'
                            label='Password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            className={classes.field}
                            fullWidth
                            name='staticIP'
                            label='Static IP'
                            value={this.state.staticIP}
                            onChange={this.handleChange}
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant='contained' color='primary' onClick={() => this.setWifiInfo()} className={classes.saveButton}>Save</Button>
                        </div>
                        <div className={classes.grid2}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Heart Beat
                        </Typography>
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='heartbeatInterval'
                            label='Heart Beat Interval'
                            value={this.state.password}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='heartbeatMaxMessages'
                            label='Heart Beat Max Messages'
                            value={this.state.password}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant='contained' color='primary'className={classes.saveButton}>Save</Button>
                        </div>
                        <div className={classes.grid2}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Big Query
                        </Typography>
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='bqKey'
                            label='Big Query key'
                            value={this.state.bqKey}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant='contained' color='primary'className={classes.saveButton}>Save</Button>
                        </div>
                        <div className={classes.grid2}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            PAN ID
                        </Typography>
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='panID'
                            label='PAN ID'
                            value={this.state.panID}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant='contained' color='primary'className={classes.saveButton}>Save</Button>
                        </div>
                        <div className={classes.grid2}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Wind Sensor
                        </Typography>
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='maxWindSpeed'
                            label='Max Wind Speed'
                            value={this.state.maxWindSpeed}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='meanWindSpeed'
                            label='Mean Wind Speed'
                            value={this.state.meanWindSpeed}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='windSpeedTimer'
                            label='Wind Speed Timer'
                            value={this.state.windSpeedTimer}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant='contained' color='primary'className={classes.saveButton}>Save</Button>
                        </div>
                        <div className={classes.grid2}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Flood Sensor
                        </Typography>
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='maxFloodLevel'
                            label='Max FLood Level'
                            value={this.state.maxFloodLevel}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='floodLevelTimer'
                            label='Flood level Timer'
                            value={this.state.floodLevelTimer}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant='contained' color='primary'className={classes.saveButton}>Save</Button>
                        </div>
                        <div className={classes.grid2}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Snow Sensor
                        </Typography>
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='maxSnowLevel'
                            label='Max Snow Level'
                            value={this.state.maxSnowLevel}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='snowLevelTimer'
                            label='Snow level Timer'
                            value={this.state.snowLevelTimer}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant='contained' color='primary'className={classes.saveButton}>Save</Button>
                        </div>
                        <div className={classes.grid2}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Rain Sensor
                        </Typography>
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='maxRainLevel'
                            label='Max Rain Level'
                            value={this.state.maxRainLevel}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            className={classes.field}
                            fullWidth
                            id='rainLevelTimer'
                            label='Rain level Timer'
                            value={this.state.rainLevelTimer}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant='contained' color='primary'className={classes.saveButton}>Save</Button>
                        </div>
                        <div className={classes.grid2}>
                        <FormControl component="fieldset" className={classes.field}>
                            <RadioGroup
                                row
                                aria-label="Sync"
                                name="sync"
                                value={this.state.syncTime}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="internet" control={<Radio color='primary'/>} label="Sync from internet" />
                                <FormControlLabel value="scada" control={<Radio color='primary'/>} label="Sync from SCADA" />
                            </RadioGroup>
                            <Button variant='contained' color='primary' style={{marginBottom: 10}}>Sync</Button>
                        </FormControl>
                        </div>
                    </Grid>
            </Fragment>
        )
    }
}


function mapStateToProps(state) {
    const { wifiList } = state.app

    return {
        wifiList
    }
}

const mapDispatchToProps = (dispatch) => ({
    setWifiInfo: (ssid, pass, staticIP) => {
        dispatch({type: 'SET_WIFI_INFO_REQUEST'}) 
        appService.setWifiInfo(ssid, pass, staticIP)
            .then(json => {
                dispatch({type: 'SET_WIFI_INFO_SUCCESS', json})
            }, error => {
                dispatch({type: 'SET_WIFI_INFO_FAILURE'})
            })
    },
    scanWifi: () => {
        dispatch({type: 'SCAN_WIFI_REQUEST'})
        appService.scanWifi()
            .then(json => {
                dispatch({type: 'SCAN_WIFI_SUCCESS', json})
            }, error => {
                dispatch({type: 'SCAN_WIFI_FAILURE'})
            })
    }
})


const connectedZoneController = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ZoneController))
export {connectedZoneController as ZoneController}