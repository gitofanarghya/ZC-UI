import React from 'react'
import { Grid, Button, Checkbox, TextField, DialogActions, DialogTitle, Dialog, DialogContent } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

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
  
let id = 0;
function createData(portNum, sensorType, modelNum, samplingFq) {
    id += 1;
    return { id, portNum, sensorType, modelNum, samplingFq };
}
  
const rows = [
    createData(1, 'Wind Sensor', 'WB345', ' '),
    createData(2, 'Snow Sensor', 'SB345', ' '),
    createData(3, 'Flood Sensor', 'FS234', ' ')
];


class Sensors extends React.Component {

    state = {
        selectedSensors: [],
        dialog: false,
        which: 'none'
    }

    selectAll = () => {
        if(this.state.selectedSensors.length === rows.length) {
            this.setState({
                ...this.state,
                selectedSensors: []
            })
        } else {
            this.setState({
                ...this.state,
                selectedSensors: [...rows]
            })
        }
    }

    selectSensor = (row) => {
        if(this.state.selectedSensors.indexOf(row) === -1) {
            this.setState({
                ...this.state,
                selectedSensors: [...this.state.selectedSensors, row]
            })
        } else {
            this.setState({
                ...this.state,
                selectedSensors: [...this.state.selectedSensors.filter(t => t.id !== row.id)]
            })
        }
    }

    addSensor = () => {
        this.setState({ dialog: true, which: 'add'})
    }

    editSensor = () => {
        this.setState({ dialog: true, which: 'edit'})
    }

    handleClose = () => {
        this.setState({ dialog: false, which: 'none' });
    };

    render() {
        const { classes } = this.props

        return (
            <Grid container direction='column' className={classes.root}>
                <Grid item style={{textAlign: 'end'}}>
                    <Button color='primary' variant='contained' className={classes.buttons} onClick={() => this.addSensor()}>Add New</Button>
                    <Button color='primary' variant='contained' className={classes.buttons} onClick={() => this.editSensor()}>Edit</Button>
                </Grid>
                <Grid item>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell
                            onClick={() => this.selectAll()}
                            style={{cursor: 'pointer'}}
                        >
                            <Checkbox 
                                checked={this.state.selectedSensors.length === rows.length}
                                color='primary'
                            />
                                </TableCell>
                        <TableCell >Port #</TableCell>
                        <TableCell >Sensor Type</TableCell>
                        <TableCell >Model #</TableCell>
                        <TableCell >Sampling Frequency</TableCell>
                        <TableCell >Enable</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}
                            onClick={() => this.selectSensor(row)}
                            style={{cursor: 'pointer'}}
                        >
                        <TableCell>
                            <Checkbox 
                                checked={this.state.selectedSensors.indexOf(row) !== -1}
                                color='primary'
                            />
                        </TableCell>
                            <TableCell >{row.portNum}</TableCell>
                            <TableCell >{row.sensorType}</TableCell>
                            <TableCell >{row.modelNum}</TableCell>
                            <TableCell >{row.samplingFq}</TableCell>
                            <TableCell>
                                <Checkbox 
                                    checked={this.state.selectedSensors.indexOf(row) !== -1}
                                    color='primary'
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Grid>
                <Dialog
                    open={this.state.dialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.state.which === 'add' ? 'Add Sensor' : 'Edit Sensor'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            id='portNum'
                            label='Port #'
                            value={this.state.portNum}
                            onChange={this.handleChange}
                            margin="dense"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            id='sensorType'
                            label='Sensor Type'
                            value={this.state.sensorType}
                            onChange={this.handleChange}
                            margin="dense"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            id='modelNum'
                            label='Model #'
                            value={this.state.modelNum}
                            onChange={this.handleChange}
                            margin="dense"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            id='samplingFrequency'
                            label='samplingFrequency'
                            value={this.state.samplingFrequency}
                            onChange={this.handleChange}
                            margin="dense"
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                        />
                        <div style={{display: 'flex', alignItems: 'baseline'}}>
                        <TextField
                            id="outlined-full-width"
                            label="Driver File"
                            helperText="Upload Sensor Driver File"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none'}}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" style={{margin: 5}}>
                                Upload
                            </Button>
                        </label>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {
                            this.state.which === 'edit' &&
                            <Button variant='contained' onClick={this.handleClose} color="primary">
                                Remove Sensor
                            </Button>
                        } 
                        <Button variant='contained' onClick={this.handleClose} color="primary">
                            {this.state.which === 'add' ? 'Add Sensor' : this.state.which === 'edit' ? 'Save' : ''}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        )
    }
    
}

export default withStyles(styles)(Sensors)