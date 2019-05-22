import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography, FormControlLabel, FormControl, Radio, RadioGroup, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import { appService } from '../App/app.services';

const styles = theme => ({
  root: {
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
    width: '90%',
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
  }
});

class ZoneController extends React.Component {

    state = {

    }


    render() {
        const { classes } = this.props
        return (
            <Fragment>
                    <Grid item xs={12} container direction='column' justify='center' alignItems='center' className={classes.root}>
                        <div className={classes.grid2}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Network
                        </Typography>
                        <TextField
                            className={classes.field}
                            id='ssid'
                            label='SSID'
                            value={this.state.ssid}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            className={classes.field}
                            id='password'
                            label='Password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            className={classes.field}
                            id='staticIP'
                            label='Static IP'
                            value={this.state.staticIP}
                            onChange={this.handleChange}
                            margin="normal"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant='contained' color='primary' className={classes.saveButton}>Save</Button>
                        </div>
                        <div className={classes.grid2}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Heart Beat
                        </Typography>
                        <TextField
                            className={classes.field}
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
    const { commissioningData } = state.app

    return {
        commissioningData
    }
}

const mapDispatchToProps = (dispatch) => ({
    setWifiInfo: (ssid, pass, staticIP) => {
        dispatch({type: 'SET_WIFI_INFO'}) 
        appService.setWifiInfo(ssid, pass)
    }
})


const connectedZoneController = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ZoneController))
export {connectedZoneController as ZoneController}