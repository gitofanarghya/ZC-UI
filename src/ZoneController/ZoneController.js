import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography, IconButton, FormControlLabel, FormControl, Radio, RadioGroup, Button, MenuItem, OutlinedInput, Select, InputLabel, CircularProgress, Switch, InputAdornment, Toolbar, AppBar } from '@material-ui/core';
import { connect } from 'react-redux'
import { appService } from '../App/app.services';
import Refresh from '@material-ui/icons/Refresh'
import {timezones} from '../util/timeZones'

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
        ssid: this.props.currentWifi,
        password: '',
        upperSpeedLimit: this.props.windLimits.speedLimits.upperSpeedLimit,
        lowerSpeedLimit: this.props.windLimits.speedLimits.lowerSpeedLimit,
        minBreachTime: this.props.windLimits.breachParameters.minBreachTime,
        maxBreachTime: this.props.windLimits.breachParameters.maxBreachTime,
        maxBreachCount: this.props.windLimits.breachParameters.maxBreachCount,
        maxFloodLevel: this.props.floodLimits.maxFloodLevel,
        floodMovingAveragePeriod: this.props.floodLimits.movingAveragePeriod,
        maxSnowLevel: this.props.snowLimits.maxSnowLevel,
        snowMovingAveragePeriod: this.props.snowLimits.movingAveragePeriod,
        rowHeight: this.props.snowLimits.rowHeight,
        rowWidth: this.props.snowLimits.rowWidth,
        stepSize: this.props.snowLimits.stepSize,
        bqFile: '',
        bqFileName: '',
        bqEnabled: this.props.bqEnabled,
        zoneID: this.props.zoneID,
        heartBeatInterval: this.props.heartBeatInterval,
        heartBeatMaxMessages: this.props.heartBeatMaxMessages,
        heartBeatEnabled: this.props.heartBeatEnabled,
        timezone: this.props.timezone,
        statusRequestTimePeriod: this.props.statusRequestTimePeriod,
        powerRequestTimePeriod: this.props.powerRequestTimePeriod,
        enableEthernet: this.props.enableEthernet,
        staticIP: this.props.staticIP
    }

    componentDidMount = () => {
        this.props.getZoneID()
        this.props.getWifi()
        this.props.scanWifi()
        this.props.getWindLimits()
        this.props.getFloodLimits()
        this.props.getSnowLimits()
        this.props.getHeartBeatSettings()
        this.props.getRequestFrequency()
        this.props.getEthernetSettings()
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
        if(nextProps.bqEnabled !== this.props.bqEnabled) {
            this.setState({
                ...this.state,
                bqEnabled: nextProps.bqEnabled
            })
        }
        if(nextProps.currentWifi !== this.props.currentWifi) {
            this.setState({
                ...this.state,
                ssid: nextProps.currentWifi
            })
        }
        if(nextProps.zoneID !== this.props.zoneID) {
            this.setState({
                ...this.state,
                zoneID: nextProps.zoneID
            })
        }
        if(nextProps.heartBeatInterval !== this.props.heartBeatInterval || nextProps.heartBeatMaxMessages !== this.props.heartBeatMaxMessages || nextProps.heartBeatEnabled !== this.props.heartBeatEnabled) {
            this.setState({
                ...this.state,
                heartBeatInterval: nextProps.heartBeatInterval,
                heartBeatMaxMessages: nextProps.heartBeatMaxMessages,
                heartBeatEnabled: nextProps.heartBeatEnabled
            })
        }
        if(nextProps.timezone !== this.props.timezone) {
            this.setState({
                ...this.state,
                timezone: nextProps.timezone
            })
        }
        if(nextProps.powerRequestTimePeriod !== this.props.powerRequestTimePeriod || nextProps.statusRequestTimePeriod !== this.props.statusRequestTimePeriod) {
            this.setState({
                ...this.state,
                powerRequestTimePeriod: nextProps.powerRequestTimePeriod,
                statusRequestTimePeriod: nextProps.statusRequestTimePeriod
            })
        }
        if(nextProps.enableEthernet !== this.props.enableEthernet || nextProps.staticIP !== this.props.staticIP) {
            this.setState({
                ...this.state,
                enableEthernet: nextProps.enableEthernet,
                staticIP: nextProps.staticIP
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
        this.setState({...this.state, enableEthernet: !this.state.enableEthernet})
    }

    BQToggle = () => {
        this.setState({...this.state, bqEnabled: !this.state.bqEnabled})
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

    handleSelectedFile = e => {
        this.setState({
            ...this.state,
            bqFile: e.target.files[0],
            bqFileName: e.target.files[0].name
        })
    }

    saveBQKey = () => {
        this.props.saveBQKey(this.state.bqEnabled, this.state.bqFile)
        this.setState({
            ...this.state,
            bqFile: '',
            bqFileName: ''
        })
    }
/* 
    BQToggle = () => {
        if(this.state.bqEnabled) {
            this.props.disableBQ()
            this.setState({
                ...this.state,
                bqEnabled: false
            })
        } else {
            this.setState({
                ...this.state,
                bqEnabled: true
            })
        }
    } */

    heartBeatToggle = () => {
        this.setState({
            ...this.state,
            heartBeatEnabled: !this.state.heartBeatEnabled
        })
    }

    setZoneID = () => {
        this.props.setZoneID(this.state.zoneID)
    }

    setHeartBeatSettings = () => {
        this.props.setHeartBeatSettings(this.state.heartBeatEnabled, this.state.heartBeatInterval, this.state.heartBeatInterval)
    }

    setTimeZone = () => {
        this.props.setTimezone(this.state.timezone)
    }

    setRequestFrequency = () => {
        this.props.setRequestFrequency(this.state.powerRequestTimePeriod, this.state.statusRequestTimePeriod)
    }

    setEthernetInfo = () => {
        this.props.setEthernetInfo(this.state.enableEthernet, this.state.staticIP)
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
                                Zone ID Configuration
                            </Typography>
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='zoneID'
                                label='Zone ID'
                                value={this.state.zoneID}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button variant='contained' color='primary' disabled={this.state.zoneID === this.props.zoneID} onClick={() => this.setZoneID()} className={classes.saveButton}>Save</Button>
                            </div>
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
                                        wifiList.length === 0 ? <MenuItem value={'none'}> <CircularProgress size={25}/></MenuItem> : wifiList.map(w => <MenuItem key={w + Math.random() * (+100 - +0) + +0} value={w}>{w}</MenuItem>)
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
                            <Button variant='contained' color='primary' disabled={this.state.ssid === this.props.currentWifi} onClick={() => this.setWifiInfo()} className={classes.saveButton}>Save</Button>
                            </div>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Ethernet Configuration
                            </Typography>
                            <FormControlLabel style={{ margin: 10 }} labelPlacement="start"
                                control={
                                    <Switch color='primary' checked={this.state.enableEthernet} onClick={() => this.DHCPToggle()} />
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
                                disabled={this.state.enableEthernet}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button variant='contained' color='primary' disabled={this.state.enableEthernet === this.props.enableEthernet && this.state.staticIP === this.props.staticIP} onClick={() => this.setEthernetInfo()} className={classes.saveButton}>Save</Button>
                            </div>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Big Query Configuration
                            </Typography>
                            <FormControlLabel style={{ margin: 10 }} labelPlacement="start"
                                control={
                                    <Switch color='primary' checked={this.state.bqEnabled} onClick={() => this.BQToggle()} />
                                }
                                label='Enable Big Query'
                            />
                            <div style={{display: 'flex', alignItems: 'baseline', width: '100%'}}>
                            <TextField
                                id="bqkey"
                                label="Big Query Key"
                                helperText="Upload Big Query Key File"
                                name='bqFile'
                                value={this.state.bqFileName}
                                disabled={!this.state.bqEnabled}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            />
                            <input
                                accept="*"
                                style={{ display: 'none'}}
                                id="contained-button-file"
                                type="file"
                                onChange={this.handleSelectedFile}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" disabled={!this.state.bqEnabled} color="primary" component="span" style={{margin: 5}}>
                                    Browse
                                </Button>
                            </label>
                            </div>
                            <Button variant='contained' disabled={this.state.bqEnabled === this.props.bqEnabled && this.state.bqFileName === ''} onClick={() => this.saveBQKey()} color='primary'className={classes.saveButton}>Save</Button>
                            </div>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Heart Beat Configuration
                            </Typography>
                            <FormControlLabel style={{ margin: 10 }} labelPlacement="start"
                                control={
                                    <Switch color='primary' checked={this.state.heartBeatEnabled} onClick={() => this.heartBeatToggle()} />
                                }
                                label='Enable Heart Beat'
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='heartBeatInterval'
                                label='Heart Beat Interval'
                                value={this.state.heartBeatInterval}
                                disabled={!this.state.heartBeatEnabled}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='heartBeatMaxMessages'
                                label='Heart Beat Max Messages'
                                value={this.state.heartBeatMaxMessages}
                                disabled={!this.state.heartBeatEnabled}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button variant='contained' color='primary' disabled={this.state.heartBeatEnabled === this.props.heartBeatEnabled && this.state.heartBeatInterval === this.props.heartBeatInterval && this.state.heartBeatMaxMessages === this.props.heartBeatMaxMessages} onClick={() => this.setHeartBeatSettings()} className={classes.saveButton}>Save</Button>
                            </div>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Timezone Configuration
                            </Typography>
                            <FormControl variant="outlined" className={classes.field} fullWidth>
                                <InputLabel htmlFor="ssid">
                                    Timezone
                                </InputLabel>
                                <Select
                                    value={this.state.timezone}
                                    onChange={this.handleChange}
                                    input={<OutlinedInput labelWidth={70} style={{width:'inherit'}}name="timezone" id="timezone" />}
                                >
                                    {
                                        timezones.filter(t => t.isdst === false).map(t => <MenuItem key={t.value} value={t.utc[0]}>{t.text}</MenuItem>)
                                    }
                                    
                                </Select>
                            </FormControl>
                            <Button disabled={this.props.timezone === this.state.timezone} variant='contained' color='primary'className={classes.saveButton} onClick={() => this.setTimeZone()}>Save</Button>
                            </div>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Request Frequency Configuration
                            </Typography>
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='powerRequestTimePeriod'
                                label='Power Request Time Period'
                                value={this.state.powerRequestTimePeriod}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">s</InputAdornment>,
                                }}
                            />
                            <TextField
                                className={classes.field}
                                fullWidth
                                name='statusRequestTimePeriod'
                                label='Status Request Time Period'
                                value={this.state.statusRequestTimePeriod}
                                onChange={this.handleChange}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">s</InputAdornment>,
                                }}
                            />
                            <Button variant='contained' color='primary' disabled={this.state.powerRequestTimePeriod === this.props.powerRequestTimePeriod && this.state.statusRequestTimePeriod === this.props.statusRequestTimePeriod} className={classes.saveButton} onClick={() => this.setRequestFrequency()}>Save</Button>
                            </div>
                            <div className={classes.grid2}>
                            <Typography variant='h6' style={{alignSelf: 'flex-start', marginBottom: 10}}>
                                Time Sync Configuration
                            </Typography>
                            <Button variant='contained' color='primary' className={classes.saveButton} onClick={() => this.props.syncFromInternet()}>Sync from internet</Button>
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
                                Wind Sensor {(this.props.gettingWindLimits || this.props.settingWindLimits) && <CircularProgress size={25} />}
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
                                Flood Sensor {(this.props.gettingFloodLimits || this.props.settingFloodLimits) && <CircularProgress size={25}/>}
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
                                Snow Sensor {(this.props.gettingSnowLimits || this.props.settingSnowLimits) && <CircularProgress size={25}/>}
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
    const { wifiList, windLimits, floodLimits, snowLimits, gettingFloodLimits, settingFloodLimits, gettingSnowLimits, settingSnowLimits, gettingWindLimits, settingWindLimits, bqEnabled, currentWifi, zoneID, heartBeatEnabled, heartBeatInterval, heartBeatMaxMessages, timeZone, powerRequestTimePeriod, statusRequestTimePeriod, enableEthernet, staticIP} = state.app

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
        settingWindLimits,
        bqEnabled,
        currentWifi,
        heartBeatEnabled,
        heartBeatInterval,
        heartBeatMaxMessages,
        zoneID,
        timezone: timeZone,
        powerRequestTimePeriod,
        statusRequestTimePeriod,
        enableEthernet,
        staticIP
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
    },
    saveBQKey: (enabled, file) => {
        if(enabled) {
            dispatch({type: 'SAVE_BQ_KEY_REQUEST'})
            appService.uploadKey(file)
                .then(json => {
                    dispatch({type: 'SAVE_BQ_KEY_SUCCESS'})
                }, error => {
                    dispatch({type: 'SAVE_BQ_KEY_FAILURE'})
                })
        } else {
            dispatch({type: 'DISABLE_BQ_REQUEST'})
            appService.disableBQ()
                .then(json => {
                    dispatch({type: 'DISABLE_BQ_SUCCESS'})
                }, error => {
                    dispatch({type: 'DISABLE_BQ_FAILURE'})
                })
        }
    },
    getWifi: () => {
        dispatch({type: 'GET_WIFI_REQUEST'})
        appService.getWifi()
            .then(json => {
                dispatch({type: 'GET_WIFI_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_WIFI_FAILURE'})
            })
    },
    getZoneID: () => {
        dispatch({type: 'GET_ZONE_ID_REQUEST'})
        appService.getZoneID()
            .then(json => {
                dispatch({type: 'GET_ZONE_ID_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_ZONE_ID_FAILURE'})
            })
    },
    setZoneID: (id) => {
        dispatch({type: 'SET_ZONE_ID_REQUEST'})
        appService.setZoneID(id)
            .then(json => {
                dispatch({type: 'SET_ZONE_ID_SUCCESS'})
                dispatch({type: 'GET_ZONE_ID_REQUEST'})
                appService.getZoneID()
                    .then(json => {
                        dispatch({type: 'GET_ZONE_ID_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_ZONE_ID_FAILURE'})
                    })
            }, error => {
                dispatch({type: 'SET_ZONE_ID_FAILURE'})
            })
    },
    getHeartBeatSettings: () => {
        dispatch({type: 'GET_HEARTBEAT_SETTINGS_REQUEST'})
        appService.getHeartBeat()
            .then(json => {
                dispatch({type: 'GET_HEARTBEAT_SETTINGS_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_HEARTBEAT_SETTINGS_FAILURE'})
            })
    },
    setHeartBeatSettings: (enabled, interval, maxMsgs) => {
        dispatch({type: 'SET_HEARTBEAT_SETTINGS_REQUEST'})
        appService.setHeartBeat(enabled, interval, maxMsgs)
            .then(json => {
                dispatch({type: 'SET_HEARTBEAT_SETTINGS_SUCCESS'})
                dispatch({type: 'GET_HEARTBEAT_SETTINGS_REQUEST'})
                appService.getHeartBeat()
                    .then(json => {
                        dispatch({type: 'GET_HEARTBEAT_SETTINGS_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_HEARTBEAT_SETTINGS_FAILURE'})
                    })
            }, error => {
                dispatch({type: 'SET_HEARTBEAT_SETTINGS_FAILURE'})
            })
    },
    setTimezone: (t) => {
        dispatch({type: 'SET_TIMEZONE_REQUEST'})
        appService.setTimeZone(t)
            .then(json => {
                dispatch({type: 'SET_TIMEZONE_SUCCESS'})
                dispatch({type: 'GET_TIMEZONE_REQUEST'})
                appService.getTimeZone()
                    .then(json => {
                        dispatch({type: 'GET_TIMEZONE_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_TIMEZONE_FAILURE', error})
                    })
            }, error => {
                dispatch({type: 'SET_TIMEZONE_FAILURE'})
            })
    },
    getRequestFrequency: () => {
        dispatch({type: 'GET_REQUEST_FREQUENCY_REQUEST'})
        appService.getFrequency()
            .then(json => {
                dispatch({type: 'GET_REQUEST_FREQUENCY_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_REQUEST_FREQUENCY_FAILURE'})
            })
    },
    setRequestFrequency: (p, s) => {
        dispatch({type: 'SET_REQUEST_FREQUENCY_REQUEST'})
        appService.setFrequency(p, s)
            .then(json => {
                dispatch({type: 'SET_REQUEST_FREQUENCY_SUCCESS'})
                dispatch({type: 'GET_REQUEST_FREQUENCY_REQUEST'})
                appService.getFrequency()
                    .then(json => {
                        dispatch({type: 'GET_REQUEST_FREQUENCY_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_REQUEST_FREQUENCY_FAILURE'})
                    })
            }, error => {
                dispatch({type: 'SET_REQUEST_FREQUENCY_FAILURE'})
                dispatch({type: 'GET_REQUEST_FREQUENCY_REQUEST'})
                appService.getFrequency()
                    .then(json => {
                        dispatch({type: 'GET_REQUEST_FREQUENCY_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_REQUEST_FREQUENCY_FAILURE'})
                    })
            })
    },
    syncFromInternet: () => {
        dispatch({type: 'SYNC_FROM_INTERNET_REQUEST'})
        appService.syncFromInternet()
            .then(json => {
                dispatch({type: 'SYNC_FROM_INTERNET_SUCCESS'})
            }, error => {
                dispatch({type: 'SYNC_FROM_INTERNET_FAILURE'})
            })
    },
    getEthernetSettings: () => {
        dispatch({type: 'GET_ETHERNET_SETTINGS_REQUEST'})
        appService.getEthernetSettings()
            .then(json => {
                dispatch({type: 'GET_ETHERNET_SETTINGS_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_ETHERNET_SETTINGS_FAILURE'})
            })
    },
    setEthernetInfo: (enableEthernet, staticIP) => {
        dispatch({type: 'SET_ETHERNET_SETTINGS_REQUEST'})
        appService.setEthernetSettings(enableEthernet, staticIP)
            .then(json => {
                dispatch({type: 'SET_ETHERNET_SETTINGS_SUCCESS'})
                dispatch({type: 'GET_ETHERNET_SETTINGS_REQUEST'})
                appService.getEthernetSettings()
                    .then(json => {
                        dispatch({type: 'GET_ETHERNET_SETTINGS_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_ETHERNET_SETTINGS_FAILURE'})
                    })
            }, error => {
                dispatch({type: 'SET_ETHERNET_SETTINGS_FAILURE'})
                dispatch({type: 'GET_ETHERNET_SETTINGS_REQUEST'})
                appService.getEthernetSettings()
                    .then(json => {
                        dispatch({type: 'GET_ETHERNET_SETTINGS_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_ETHERNET_SETTINGS_FAILURE'})
                    })
            })
    }

})


const connectedZoneController = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ZoneController))
export {connectedZoneController as ZoneController}