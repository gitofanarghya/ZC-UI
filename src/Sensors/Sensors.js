import React from 'react'
import { Grid, Button, Checkbox, TextField, DialogActions, DialogTitle, Dialog, DialogContent, MenuItem, OutlinedInput, InputLabel, FormControl, Select, Tooltip } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { appService } from '../App/app.services';
import {connect} from 'react-redux'

const styles = theme => ({
    root: {
      width: '100%',
      height: '100%',
      overflowX: 'auto',
      backgroundColor: 'white'
    },
    table: {
      minWidth: 700,
    },
    buttons: {
        marginBottom: 10,
        marginRight: 10,
        marginTop: 10
    }
});
  

class Sensors extends React.Component {

    state = {
        selectedSensors: [],
        dialog: false,
        which: 'none',
        port: '',
        type: '',
        model: '',
        samplingPeriod: '',
        driverFile: '',
        driverFileName: '',
        enabled: []
    }

    componentDidMount = () => {
        this.props.getSensors()
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.sensors !== this.props.sensors) {
            this.setState({...this.state, enabled: [...nextProps.sensors.filter(s => s.enabled === true)]})
        }
    }

    selectAll = () => {
        if(this.state.selectedSensors.length === this.props.sensors.length) {
            this.setState({
                ...this.state,
                selectedSensors: []
            })
        } else {
            this.setState({
                ...this.state,
                selectedSensors: [...this.props.sensors]
            })
        }
    }

    selectSensor = (row) => {
        if(this.state.selectedSensors.filter(t => t.model === row.model && t.type === row.type).length === 0) {
            this.setState({
                ...this.state,
                selectedSensors: [...this.state.selectedSensors, row]
            })
        } else {
            this.setState({
                ...this.state,
                selectedSensors: [...this.state.selectedSensors.filter(t => t.model !== row.model)]
            })
        }
    }

    addSensor = () => {
        this.setState({ ...this.state, dialog: true, which: 'add'})
    }

    editSensor = () => {
        this.setState({ ...this.state, dialog: true, which: 'edit', port: this.state.selectedSensors[0].port, type: this.state.selectedSensors[0].type, model: this.state.selectedSensors[0].model, samplingPeriod: this.state.selectedSensors[0].samplingPeriod})
    }

    removeSensor = () => {
        this.props.removeSensor(this.state.selectedSensors)
    }

    enable = (row) => {
        if(this.state.enabled.filter(t => t.model === row.model && t.type === row.type).length === 0) {
            this.props.enableSensor(row.type, row.model)
            this.setState({...this.state, enabled: [...this.state.enabled, row]})
        } else {
            this.props.disableSensor(row.type, row.model)
            this.setState({...this.state, enabled: this.state.enabled.filter(e => e !== row)})
        }
        
    }

    handleClose = () => {
        if(this.state.which === 'edit') {
            this.props.softRemoveSensor(this.state.selectedSensors)
            this.props.addSensor(this.state.port, this.state.type, this.state.model, this.state.samplingPeriod)
            //this.props.addDriverFile(this.state.driverFile)   
        } else {
            this.props.addSensor(this.state.port, this.state.type, this.state.model, this.state.samplingPeriod)
            //this.props.addDriverFile(this.state.driverFile)
        }
            
        
        this.setState({ ...this.state, dialog: false, which: 'none' });
    };

    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    
    handleSelectedFile = e => {
        this.setState({
            ...this.state,
            driverFile: e.target.files[0],
            driverFileName: e.target.files[0].name
        })
    }

    render() {console.log(this.state)
        const { classes, sensors } = this.props

        return (
            <Grid container direction='column' className={classes.root}>
                <Grid item style={{textAlign: 'end'}}>
                    <Button color='primary' variant='contained' className={classes.buttons} onClick={() => this.addSensor()}>Add New</Button>
                    {this.state.selectedSensors.length > 1 ?
                        <Tooltip title='Cannot edit multiple sensors at once. Please choose a single sensor to edit.'>
                            <span><Button color='primary' variant='contained' className={classes.buttons} disabled>Edit</Button></span>
                        </Tooltip> :
                        <Button color='primary' variant='contained' disabled={this.state.selectedSensors.length !== 1} className={classes.buttons} onClick={() => this.editSensor()}>Edit</Button>
                    }
                </Grid>
                <Grid item>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell
                            onClick={() => this.selectAll()}
                            style={{cursor: 'pointer'}}
                        >{sensors && sensors.length > 1 && 
                            <Checkbox 
                                checked={this.state.selectedSensors.length === this.props.sensors.length}
                                color='primary'
                            />}
                                </TableCell>
                        <TableCell >Port #</TableCell>
                        <TableCell >Sensor Type</TableCell>
                        <TableCell >Model #</TableCell>
                        <TableCell >Sampling Period</TableCell>
                        <TableCell >Enable</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {sensors.map(row => (
                        <TableRow key={row.port+row.type+row.model}
                            style={{cursor: 'pointer'}}
                        >
                            <TableCell>
                                <Checkbox 
                                    onClick={() => this.selectSensor(row)}
                                    checked={this.state.selectedSensors.filter(t => t.model === row.model && t.type === row.type).length !== 0}
                                    color='primary'
                                />
                            </TableCell>
                            <TableCell >{row.port}</TableCell>
                            <TableCell >{row.type}</TableCell>
                            <TableCell >{row.model}</TableCell>
                            <TableCell >{row.samplingPeriod}</TableCell>
                            <TableCell>
                                <Checkbox 
                                    checked={this.state.enabled.filter(t => t.model === row.model && t.type === row.type).length !== 0}
                                    onClick={() => this.enable(row)}
                                    color='primary'
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>{this.props.sensors.length > 0 &&
                <Grid item style={{textAlign: 'end'}}>
                    <Button color='primary' variant='contained' disabled={this.state.selectedSensors.length === 0} className={classes.buttons} onClick={() => this.removeSensor()}>Remove</Button>
                </Grid>}
                </Grid>
                <Dialog
                    open={this.state.dialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.state.which === 'add' ? 'Add Sensor' : 'Edit Sensor'}</DialogTitle>
                    <DialogContent>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth margin='dense'>
                            <InputLabel htmlFor="port">
                                Port #
                            </InputLabel>
                            <Select
                                value={this.state.port}
                                onChange={this.handleChange}
                                autoWidth
                                input={<OutlinedInput labelWidth={50} name="port" id="port" />}
                            >
                                <MenuItem value={'ADC48CH0'}>ADC48CH0 (Address: 0x48; Channel: 0)</MenuItem>
                                <MenuItem value={'ADC48CH1'}>ADC48CH1 (Address: 0x48; Channel: 1)</MenuItem>
                                <MenuItem value={'ADC48CH2'}>ADC48CH2 (Address: 0x48; Channel: 2)</MenuItem>
                                <MenuItem value={'ADC48CH3'}>ADC48CH3 (Address: 0x48; Channel: 3)</MenuItem>
                                <MenuItem value={'ADC49CH0'}>ADC49CH0 (Address: 0x49; Channel: 0)</MenuItem>
                                <MenuItem value={'ADC49CH1'}>ADC49CH1 (Address: 0x49; Channel: 1)</MenuItem>
                                <MenuItem value={'ADC49CH2'}>ADC49CH2 (Address: 0x49; Channel: 2)</MenuItem>
                                <MenuItem value={'ADC49CH3'}>ADC49CH3 (Address: 0x49; Channel: 3)</MenuItem>
                                <MenuItem value={'Modbus RTU'}>Modbus RTU</MenuItem>
                                <MenuItem value={'GPIO11'}>GPIO11 (Pin 11)</MenuItem>
                                <MenuItem value={'GPIO13'}>GPIO13 (Pin 13)</MenuItem>
                                <MenuItem value={'GPIO15'}>GPIO15 (Pin 15)</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth margin='dense'>
                            <InputLabel htmlFor="type">
                                Sensor Type
                            </InputLabel>
                            <Select
                                value={this.state.type}
                                onChange={this.handleChange}
                                autoWidth
                                input={<OutlinedInput labelWidth={100} name="type" id="type" />}
                            >
                                <MenuItem value={'wind'}>Wind Sensor</MenuItem>
                                <MenuItem value={'snow'}>Snow Sensor</MenuItem>
                                <MenuItem value={'flood'}>Flood Sensor</MenuItem>
                                <MenuItem value={'rain'}>Rain Sensor</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            id='model'
                            name='model'
                            label='Model #'
                            value={this.state.model}
                            onChange={this.handleChange}
                            margin="dense"
                            variant='outlined'
                        />
                        <TextField
                            fullWidth
                            id='samplingPeriod'
                            name='samplingPeriod'
                            label='samplingPeriod'
                            value={this.state.samplingPeriod}
                            onChange={this.handleChange}
                            margin="dense"
                            variant='outlined'
                        />
                        <div style={{display: 'flex', alignItems: 'baseline'}}>
                        <TextField
                            id="driverFile"
                            label="Driver File"
                            helperText="Upload Sensor Driver File"
                            name='driverFile'
                            value={this.state.driverFileName}
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
                            <Button variant="contained" color="primary" component="span" style={{margin: 5}}>
                                Browse
                            </Button>
                        </label>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' onClick={this.handleClose} color="primary">
                            {this.state.which === 'add' ? 'Add Sensor' : 'Save'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        )
    }
    
}


function mapStateToProps(state) {
    const { sensors } = state.app

    return {
        sensors,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getSensors: () => {
        dispatch({type: 'GET_SENSORS_REQUEST'})
        appService.getSensors()
            .then(json => {
                dispatch({type: 'GET_SENSORS_SUCCESS', json})
            }, error => {
                dispatch({type: 'GET_SENSORS_FAILURE'})
            })        
    },
    addSensor: (port, type, model, samplingPeriod) => {
        dispatch({type: 'ADD_SENSOR_REQUEST'})
        appService.addSensor(port, type, model, samplingPeriod)
            .then(json => {
                dispatch({type: 'ADD_SENSORS_SUCCESS'})
                dispatch({type: 'GET_SENSORS_REQUEST'})
                appService.getSensors()
                    .then(json => {
                        dispatch({type: 'GET_SENSORS_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_SENSORS_FAILURE'})
                    }) 
            }, error => {
                dispatch({type: 'ADD_SENSORS_FAILURE'})
            })
    },
    removeSensor: (selectedSensors) => {
        selectedSensors.map(s => {
            dispatch({type: 'REMOVE_SENSOR_REQUEST'})
            appService.removeSensor(s.model, s.type)
                .then(json => {
                    dispatch({type: 'REMOVE_SENSOR_SUCCESS'})
                    dispatch({type: 'GET_SENSORS_REQUEST'})
                    appService.getSensors()
                        .then(json => {
                            dispatch({type: 'GET_SENSORS_SUCCESS', json})
                        }, error => {
                            dispatch({type: 'GET_SENSORS_FAILURE'})
                        })
                }, error => {
                    dispatch({type: 'REMOVE_SENSOR_FAILURE'})
                })
        })
        
    },
    softRemoveSensor: (selectedSensors) => {
        selectedSensors.map(s => {
            dispatch({type: 'REMOVE_SENSOR_REQUEST'})
            appService.removeSensor(s.model, s.type)
                .then(json => {
                    dispatch({type: 'REMOVE_SENSOR_SUCCESS'})
                }, error => {
                    dispatch({type: 'REMOVE_SENSOR_FAILURE'})
                })
        })
    },
    enableSensor: (type, model) => {
        dispatch({type: 'ENABLE_SENSOR_REQUEST'})
        appService.enableSensor(type, model)
            .then(json => {
                dispatch({type: 'ENABLE_SENSOR_SUCCESS'})
                dispatch({type: 'GET_SENSORS_REQUEST'})
                appService.getSensors()
                    .then(json => {
                        dispatch({type: 'GET_SENSORS_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_SENSORS_FAILURE'})
                    }) 
            }, error => {
                dispatch({type: 'ENABLE_SENSOR_FAILURE'})
            })
    },
    disableSensor: (type, model) => {
        dispatch({type: 'DISABLE_SENSOR_REQUEST'})
        appService.disableSensor(type, model)
            .then(json => {
                dispatch({type: 'DISABLE_SENSOR_SUCCESS'})
                dispatch({type: 'GET_SENSORS_REQUEST'})
                appService.getSensors()
                    .then(json => {
                        dispatch({type: 'GET_SENSORS_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_SENSORS_FAILURE'})
                    }) 
            }, error => {
                dispatch({type: 'DISABLE_SENSOR_FAILURE'})
            })
    }
})


const connectedSensors = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sensors))
export {connectedSensors as Sensors}