import React, { Fragment } from 'react'
import { Grid, Checkbox, TextField, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    textField: {
        marginLeft: 24
    },
    formControl: {
        marginLeft: 24
    }
});
  
let id = 0;
function createData(rowNum, deviceID, macID) {
    id += 1;
    return { id, rowNum, deviceID, macID };
}
  
const rows = [
    createData(1, 12345, 'abc123'),
    createData(2, 12346, 'abc124'),
    createData(3, 12347, 'abc125')
];

class ScanTab extends React.Component {
    state = {
        selectedTrackers: [],
        scanSelection: 'panID'
    }

    selectAll = () => {
        if(this.state.selectedTrackers.length === rows.length) {
            this.setState({
                selectedTrackers: []
            })
        } else {
            this.setState({
                selectedTrackers: [...rows]
            })
        }
    }

    selectRow = (row) => {
        if(this.state.selectedTrackers.indexOf(row) === -1) {
            this.setState({
                selectedTrackers: [...this.state.selectedTrackers, row]
            })
        } else {
            this.setState({
                selectedTrackers: [...this.state.selectedTrackers.filter(t => t.id !== row.id)]
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            scanSelection: e.target.value
        })
    }

    inputChange = (e) =>{
        this.setState({
            scanParameter: e.target.value
        })
    }

    render() {
        const { classes } = this.props

        return (
            <Fragment>
                <Grid container direction='column'>
                    <Grid item style={{marginTop: 24}}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <RadioGroup
                                row
                                aria-label="Scan"
                                name="scan"
                                value={this.state.scanSelection}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="panID" control={<Radio color='primary'/>} label="PAN ID" />
                                <FormControlLabel value="DeviceID" control={<Radio color='primary'/>} label="Device ID" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="scanParameter"
                            label={this.state.scanSelection}
                            className={classes.textField}
                            value={this.state.scanParameter}
                            onChange={this.inputChange}
                            margin="none"
                            variant='outlined'
                        />
                        <Button color='primary' variant='contained' style={{marginLeft: 24, verticalAlign: 'bottom'}}>Scan</Button>
                    </Grid>
                    <Grid item style={{marginTop: 24}}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell
                                onClick={() => this.selectAll()}
                                style={{cursor: 'pointer'}}
                            >
                                <Checkbox 
                                    checked={this.state.selectedTrackers.length === rows.length}
                                    color='primary'
                                />
                                    </TableCell>
                            <TableCell >Row #</TableCell>
                            <TableCell >Device ID</TableCell>
                            <TableCell >Mac ID</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}
                                onClick={() => this.selectRow(row)}
                                style={{cursor: 'pointer'}}
                            >
                            <TableCell>
                                <Checkbox 
                                    checked={this.state.selectedTrackers.indexOf(row) !== -1}
                                    color='primary'
                                />
                            </TableCell>
                                <TableCell >{row.rowNum}</TableCell>
                                <TableCell >{row.deviceID}</TableCell>
                                <TableCell >{row.macID}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Grid>
                    <Grid item style={{textAlign: 'end'}}>
                        <Button color='primary' variant='contained' style={{margin: 10}}>Add</Button>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default withStyles(styles)(ScanTab)