import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Grid, TextField, Typography, FormControlLabel, FormControl, Radio, RadioGroup, Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  },
  grid: {
    height: '100%', 
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  field: {
      width: 300
  }
});

class ZoneController extends React.Component {
    state = {

    }

    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Grid container style={{height: '100%', backgroundColor: 'white'}}>
                    <Grid item xs={12} container style={{height: 'calc(100% - 64px)'}}>
                    <Grid item md={4} className={classes.grid}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Wifi
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
                        <Divider style={{width: '90%'}} />
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
                        <Divider style={{width: '90%'}} />
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
                        <Divider style={{width: '90%'}} />
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
                    </Grid>
                    <Grid item md={4} className={classes.grid}>
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
                        <Divider style={{width: '90%'}} />
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
                        <Divider style={{width: '90%'}} />
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
                    </Grid>
                    <Grid item md={4} className={classes.grid}>
                        
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
                        <Divider style={{width: '90%'}} />
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
                        <Divider style={{width: '90%'}} />
                        <FormControl component="fieldset" className={classes.formControl}>
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
                    </Grid>
                    </Grid>
                    <Grid xs={12} item style={{textAlign: 'center'}} >
                        <Button variant='contained' color='primary'>Save</Button>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default withStyles(styles)(ZoneController)