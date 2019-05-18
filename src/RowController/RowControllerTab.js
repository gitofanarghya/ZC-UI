import React, { Fragment } from 'react'
import { Grid, Button, Checkbox } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import EditRowController from './EditRowController';
import ControlRowController from './ControlRowController'

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
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
function createData(rowNum, deviceID, macID) {
    id += 1;
    return { id, rowNum, deviceID, macID };
}
  
const rows = [
    createData(1, 12345, 'abc123'),
    createData(2, 12346, 'abc124'),
    createData(3, 12347, 'abc125')
];

class RowControllerTab extends React.Component {
    state = {
        selectedTrackers: [],
        location: 'home'
    }

    selectAll = () => {
        if(this.state.selectedTrackers.length === rows.length) {
            this.setState({
                ...this.state,
                selectedTrackers: []
            })
        } else {
            this.setState({
                ...this.state,
                selectedTrackers: [...rows]
            })
        }
    }

    selectRow = (row) => {
        if(this.state.selectedTrackers.indexOf(row) === -1) {
            this.setState({
                ...this.state,
                selectedTrackers: [...this.state.selectedTrackers, row]
            })
        } else {
            this.setState({
                ...this.state,
                selectedTrackers: [...this.state.selectedTrackers.filter(t => t.id !== row.id)]
            })
        }
    }

    editTracker = () => {
        this.setState({
            ...this.state,
            location: 'edit'
        })
    }

    controlTracker = () => {
        this.setState({
            ...this.state,
            location: 'control'
        })
    }

    back = () => {
        this.setState({
            ...this.state,
            location: 'home'
        })
    }

    render() {
        const { classes } = this.props

        return (
            <Fragment>
                {
                    this.state.location === 'edit' ? 
                    <EditRowController back={this.back}/> :
                    this.state.location === 'control' ?
                    <ControlRowController back={this.back}/> :
                    <Grid container direction='column' style={{ height: 'calc(100% - 48px)'}}>
                        <Grid item style={{textAlign: 'end'}}>
                            <Button color='primary' variant='contained' className={classes.buttons} onClick={() => this.editTracker()}>Edit</Button>
                            <Button color='primary' variant='contained' className={classes.buttons} onClick={() => this.controlTracker()}>Control</Button>
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
                    </Grid>
                    
                }
                
            </Fragment>
        )
    }
}

export default withStyles(styles)(RowControllerTab)