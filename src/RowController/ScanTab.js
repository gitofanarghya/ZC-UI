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
import { appService } from '../App/app.services';
import {connect} from 'react-redux'

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
  

class ScanTab extends React.Component {
    state = {
        selectedTrackers: [],
        scanSelection: 'PAN ID'
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

    scan = () => {
        if(this.state.scanSelection === 'PAN ID') {
            this.props.discover('00000')
        } else {
            this.props.discover(this.state.scanParameter)
        }
    } 

    render() {
        const { classes, xbeeResponse } = this.props

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
                                <FormControlLabel value="PAN ID" control={<Radio color='primary'/>} label="PAN ID" />
                                <FormControlLabel value="Device ID" control={<Radio color='primary'/>} label="Device ID" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                    {
                        this.state.scanSelection === 'PAN ID' ?
                        <TextField
                            id="scanParameter"
                            className={classes.textField}
                            value={this.state.scanParameter}
                            onChange={this.inputChange}
                            placeholder='PAN ID'
                            margin="none"
                            variant='outlined'
                        /> :
                        <TextField
                            id="scanParameter"
                            className={classes.textField}
                            value={this.state.scanParameter}
                            onChange={this.inputChange}
                            placeholder='Device ID'
                            margin="none"
                            variant='outlined'
                        />
                    }
                        <Button color='primary' onClick={() => this.scan()} variant='contained' style={{marginLeft: 24, verticalAlign: 'bottom'}}>Scan</Button>
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
                        {xbeeResponse.map(res => (
                            <TableRow key={res.DID}
                                onClick={() => this.selectRow(row)}
                                style={{cursor: 'pointer'}}
                            >
                            <TableCell>
                                <Checkbox 
                                    checked={this.state.selectedTrackers.indexOf(row) !== -1}
                                    color='primary'
                                />
                            </TableCell>
                                <TableCell >{res.VALUES.split(',')[0]}</TableCell>
                                <TableCell >{res.DID}</TableCell>
                                <TableCell >{res.macID}</TableCell>
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


function mapStateToProps(state) {
    const { xbeeResponse } = state.app

    return {
        xbeeResponse
    }
}

const mapDispatchToProps = (dispatch) => ({
    discover : (did) => {
        dispatch({type: 'DISCOVER_REQUEST'})
        appService.discover(did)
            .then(json => {
                dispatch({type: 'DISCOVER_SUCCESS'})
            }, error => {
                dispatch({type: 'DISCOVER_FAILURE'})
            })
    }
})


const connectedScanTab = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScanTab))
export {connectedScanTab as ScanTab}