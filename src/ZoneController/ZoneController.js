import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography, IconButton, FormControlLabel, FormControl, Radio, RadioGroup, Button, MenuItem, OutlinedInput, Select, InputLabel, CircularProgress, Switch, InputAdornment, Toolbar, AppBar } from '@material-ui/core';
import { connect } from 'react-redux'
import { appService } from '../App/app.services';
import Refresh from '@material-ui/icons/Refresh'

const styles = theme => ({
  root: {
    minWidth: 300,
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row'
    },
    marginBottom: 10
  },
  grid: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
        width: '48%',
        marginLeft: '1%',
        marginRight: '1%'
    }
  },
  grid2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    marginRight: '5%',
    marginLeft: '5%',
    paddingBottom: 20,
    paddingTop: 20,
    borderBottom: '1px solid #54aab3'
  },
  field: {
    flexDirection: 'row',
    [theme.breakpoints.up('md')]: {
        margin: '10px 0 0 0'
    }
  },
  saveButton: {
    marginTop: 10,
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
  },/* 
  specialBorder: {
    [theme.breakpoints.up('md')]: {
        borderRight: '0.5px solid black'
    }
  } */
});

class ZoneController extends React.Component {

    state = {
        ssid: '',
        password: '',
        DHCP: false,
        staticIP: '',
        BQ: false,
        upperSpeedLimit: '',
        lowerSpeedLimit: '',
        minBreachTime: '',
        maxBreachTime: '',
        maxBreachCount: '',
        maxFloodLevel: '',
        floodMovingAveragePeriod: '',
        maxSnowLevel: '',
        snowMovingAveragePeriod: '',
        rowHeight: '',
        rowWidth: '',
        stepSize: ''
    }

    componentDidMount = () => {
        this.props.scanWifi()
        this.props.getWindLimits()
        this.props.getFloodLimits()
        this.props.getSnowLimits()
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.floodLimits !== this.props.floodLimits) {
            this.setState({
                ...this.state,
                maxFloodLevel: nextProps.floodLimits.maxFloodLevel,
                floodMovingAveragePeriod: nextProps.floodLimits.movingAveragePeriod
            })
        }
        if(nextProps.windLimits !== this.props.windLimits) {
            this.setState({
                ...this.state,
                upperSpeedLimit: nextProps.windLimits.speedLimits.upperSpeedLimit,
                lowerSpeedLimit: nextProps.windLimits.speedLimits.lowerSpeedLimit,
                minBreachTime: nextProps.windLimits.breachParameters.minBreachTime,
                maxBreachTime: nextProps.windLimits.breachParameters.maxBreachTime,
                maxBreachCount: nextProps.windLimits.breachParameters.maxBreachCount
            })
        }
        if(nextProps.snowLimits !== this.props.snowLimits) {
            this.setState({
                ...this.state,
                maxSnowLevel: nextProps.snowLimits.maxSnowLevel,
                snowMovingAveragePeriod: nextProps.snowLimits.movingAveragePeriod,
                rowHeight: nextProps.snowLimits.rowHeight,
                rowWidth: nextProps.snowLimits.rowWidth,
                stepSize: nextProps.snowLimits.stepSize
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    setWifiInfo = () => {
        this.props.setWifiInfo(this.state.ssid, this.state.password)
    }

    DHCPToggle = () => {
        this.setState({...this.state, DHCP: !this.state.DHCP})
    }

    BQToggle = () => {
        this.setState({...this.state, BQ: !this.state.BQ})
    }

    setWindLimits = () => {
        this.props.setWindLimits(this.state.lowerSpeedLimit, this.state.upperSpeedLimit, this.state.minBreachTime, this.state.maxBreachTime, this.state.maxBreachCount)
    }
    
    setFloodLimits = () => {
        this.props.setFloodLimits(this.state.maxFloodLevel, this.state.floodMovingAveragePeriod)
    }
    
    setSnowLimits = () => {
        this.props.setSnowLimits(this.state.maxSnowLevel, this.state.snowMovingAveragePeriod, this.state.rowHeight, this.state.rowWidth, this.state.stepSize)
    }


    render() {
        const { classes, wifiList } = this.props
        return (
            <Fragment>
                    <Grid item xs={12} container justify='center' alignItems='flex-start' className={classes.root}>
                        <Grid item className={[classes.grid, classes.specialBorder]}>
                            <AppBar position="static" color='primary' className={classes.appBar}>
                            <Toolbar>
                            <Typography variant="h5" color="inherit" noWrap>
                                ZC Parameters
                            </Typography>
                            </Toolbar>
                            </AppBar>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Wifi Configuration
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
                                        wifiList.length === 0 ? <MenuItem value={'none'}> <CircularProgress /></MenuItem> : wifiList.map(w => <MenuItem key={w + Math.random() * (+100 - +0) + +0} value={w}>{w}</MenuItem>)
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
                                margin="normal"
                                variant='outlined'
                            />
                            <Button variant='contained' color='primary' onClick={() => this.setWifiInfo()} className={classes.saveButton}>Save</Button>
                            </div>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Ethernet Configuration
                            </Typography>
                            <FormControlLabel style={{ margin: 10 }} labelPlacement="start"
                                control={
                                    <Switch color='primary' checked={this.state.DHCP} onClick={() => this.DHCPToggle()} />
                                }
                                label='Enable DHCP'
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='staticIP'
                                label='Static IP'
                                value={this.state.staticIP}
                                onChange={this.handleChange}
                                disabled={this.state.DHCP}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button variant='contained' color='primary' onClick={() => this.setWifiInfo()} className={classes.saveButton}>Save</Button>
                            </div>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Big Query Configuration
                            </Typography>
                            <FormControlLabel style={{ margin: 10 }} labelPlacement="start"
                                control={
                                    <Switch color='primary' checked={this.state.BQ} onClick={() => this.BQToggle()} />
                                }
                                label='Enable Big Query'
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='bqKey'
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
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Heart Beat Configuration
                            </Typography>
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='heartbeatInterval'
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
                                name='heartbeatMaxMessages'
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
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                PAN ID Configuration
                            </Typography>
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='panID'
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
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Sync Configuration
                            </Typography>
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
                        <Grid item className={classes.grid}>
                        <AppBar position='static' color='primary' className={classes.appBar}>
                            <Toolbar>
                            <Typography variant="h5" color="inherit" noWrap>
                                Sensor Limits
                            </Typography>
                            </Toolbar>
                            </AppBar>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Wind Sensor
                            </Typography>
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='lowerSpeedLimit'
                                label='Lower Speed Limit'
                                value={this.state.lowerSpeedLimit}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                disabled={this.props.gettingWindLimits || this.props.settingWindLimits}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">m/s</InputAdornment>,
                                }}
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='upperSpeedLimit'
                                label='Upper Speed Limit'
                                value={this.state.upperSpeedLimit}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                disabled={this.props.gettingWindLimits || this.props.settingWindLimits}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">m/s</InputAdornment>,
                                }}
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='minBreachTime'
                                label='Min Breach Time'
                                value={this.state.minBreachTime}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                disabled={this.props.gettingWindLimits || this.props.settingWindLimits}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">s</InputAdornment>,
                                }}
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='maxBreachTime'
                                label='Max Breach Time'
                                value={this.state.maxBreachTime}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                disabled={this.props.gettingWindLimits || this.props.settingWindLimits}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">s</InputAdornment>,
                                }}
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='maxBreachCount'
                                label='Max Breach Count'
                                value={this.state.maxBreachCount}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                disabled={this.props.gettingWindLimits || this.props.settingWindLimits}
                            />
                            <Button disabled={this.props.gettingWindLimits || this.props.settingWindLimits} variant='contained' color='primary'className={classes.saveButton} onClick={() => this.setWindLimits()}>{this.props.settingWindLimits ? 'Saving...' : 'Save'}</Button>
                            </div>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Flood Sensor
                            </Typography>
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='maxFloodLevel'
                                label='Max FLood Level'
                                value={this.state.maxFloodLevel}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                disabled={this.props.gettingFloodLimits || this.props.settingFloodLimits}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                                }}
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='floodMovingAveragePeriod'
                                label='Moving Average Period'
                                value={this.state.floodMovingAveragePeriod}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                disabled={this.props.gettingFloodLimits || this.props.settingFloodLimits}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">s</InputAdornment>,
                                }}
                            />
                            <Button disabled={this.props.gettingFloodLimits || this.props.settingFloodLimits} variant='contained' color='primary'className={classes.saveButton} onClick={() => this.setFloodLimits()}>{this.props.settingFloodLimits ? 'Saving...': 'Save'}</Button>
                            </div>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Snow Sensor
                            </Typography>
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='maxSnowLevel'
                                label='Max Snow Level'
                                value={this.state.maxSnowLevel}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                                }}
                                disabled={this.props.gettingSnowLimits || this.props.settingSnowLimits}
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='snowMovingAveragePeriod'
                                label='Moving Average Period'
                                value={this.state.snowMovingAveragePeriod}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">s</InputAdornment>,
                                }}
                                disabled={this.props.gettingSnowLimits || this.props.settingSnowLimits}
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='rowHeight'
                                label='Row Height'
                                value={this.state.rowHeight}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                                }}
                                disabled={this.props.gettingSnowLimits || this.props.settingSnowLimits}
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='rowWidth'
                                label='Row Width'
                                value={this.state.rowWidth}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                                }}
                                disabled={this.props.gettingSnowLimits || this.props.settingSnowLimits}
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='stepSize'
                                label='Step Size'
                                value={this.state.stepSize}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                disabled={this.props.gettingSnowLimits || this.props.settingSnowLimits}
                            />
                            <Button disabled={this.props.gettingSnowLimits || this.props.settingSnowLimits} variant='contained' color='primary'className={classes.saveButton} onClick={() => this.setSnowLimits()}>{this.props.settingSnowLimits ? 'Saving...' : 'Save'}</Button>
                            </div>
                        </Grid>
                        
                        
                    </Grid>
            </Fragment>
        )
    }
}


function mapStateToProps(state) {
    const { wifiList, windLimits, floodLimits, snowLimits, gettingFloodLimits, settingFloodLimits, gettingSnowLimits, settingSnowLimits, gettingWindLimits, settingWindLimits} = state.app

    return {
        wifiList,
        windLimits,
        floodLimits,
        snowLimits,
        gettingFloodLimits, 
        settingFloodLimits, 
        gettingSnowLimits, 
        settingSnowLimits, 
        gettingWindLimits, 
        settingWindLimits 
    }
}

const mapDispatchToProps = (dispatch) => ({
    setWifiInfo: (ssid, pass) => {
        dispatch({type: 'SET_WIFI_INFO_REQUEST'}) 
        appService.setWifiInfo(ssid, pass)
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
    },
    setWindLimits: (lowerSpeedLimit, upperSpeedLimit, minBreachTime, maxBreachTime, maxBreachCount) => {
        dispatch({type: 'SET_WIND_LIMITS_REQUEST'})
        appService.setWindLimits(lowerSpeedLimit, upperSpeedLimit, minBreachTime, maxBreachTime, maxBreachCount)
            .then(json => {
                dispatch({type: 'SET_WIND_LIMITS_SUCCESS'})
                dispatch({type: 'GET_WIND_LIMITS_REQUEST'})
                appService.getWindLimits()
                    .then(json => {
                        dispatch({type: 'GET_WIND_LIMITS_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_WIND_LIMITS_FAILURE'})
                    })
            }, error => {
                dispatch({type: 'SET_WIND_LIMITS_FAILURE'})
            })
    },
    getWindLimits: () => {
        dispatch({type: 'GET_WIND_LIMITS_REQUEST'})
        appService.getWindLimits()
            .then(json => {
                dispatch({type: 'GET_WIND_LIMITS_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_WIND_LIMITS_FAILURE'})
            })
    },
    setFloodLimits: (maxFloodLevel, movingAveragePeriod) => {
        dispatch({type: 'SET_FLOOD_LIMITS_REQUEST'})
        appService.setFloodLimits(maxFloodLevel, movingAveragePeriod)
            .then(json => {
                dispatch({type: 'SET_FLOOD_LIMITS_SUCCESS'})
                dispatch({type: 'GET_FLOOD_LIMITS_REQUEST'})
                appService.getFloodLimits()
                    .then(json => {
                        dispatch({type: 'GET_FLOOD_LIMITS_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_FLOOD_LIMITS_FAILURE'})
                    })
            }, error => {
                dispatch({type: 'SET_FLOOD_LIMITS_FAILURE'})
            })
    },
    getFloodLimits: () => {
        dispatch({type: 'GET_FLOOD_LIMITS_REQUEST'})
        appService.getFloodLimits()
            .then(json => {
                dispatch({type: 'GET_FLOOD_LIMITS_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_FLOOD_LIMITS_FAILURE'})
            })
    },
    setSnowLimits: (maxSnowLevel, snowMovingAveragePeriod, rowHeight, rowWidth, stepSize) => {
        dispatch({type: 'SET_SNOW_LIMITS_REQUEST'})
        appService.setSnowLimits(maxSnowLevel, snowMovingAveragePeriod, rowHeight, rowWidth, stepSize)
            .then(json => {
                dispatch({type: 'SET_SNOW_LIMITS_SUCCESS'})
                dispatch({type: 'GET_SNOW_LIMITS_REQUEST'})
                appService.getSnowLimits()
                    .then(json => {
                        dispatch({type: 'GET_SNOW_LIMITS_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_SNOW_LIMITS_FAILURE'})
                    })
            }, error => {
                dispatch({type: 'SET_SNOW_LIMITS_FAILURE'})
            })
    },
    getSnowLimits: () => {
        dispatch({type: 'GET_SNOW_LIMITS_REQUEST'})
        appService.getSnowLimits()
            .then(json => {
                dispatch({type: 'GET_SNOW_LIMITS_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_SNOW_LIMITS_FAILURE'})
            })
    }
})


const connectedZoneController = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ZoneController))
export {connectedZoneController as ZoneController}