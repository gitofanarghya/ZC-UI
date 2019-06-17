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
      marginTop: theme.spacing(3),
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
        scanSelection: 'PAN ID',
        scanParameter: this.props.PANID
    }

    selectAll = () => {
        if(this.state.selectedTrackers.length === this.props.xbeeResponse.length) {
            this.setState({
                selectedTrackers: []
            })
        } else {
            this.setState({
                selectedTrackers: [...this.props.xbeeResponse]
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
        if(e.target.value === 'PAN ID') {
            this.setState({
                scanSelection: e.target.value,
                scanParameter: this.props.PANID
            })
        } else {
            this.setState({
                scanSelection: e.target.value,
                scanParameter: ''
            })
        }
        
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

    addTrackers = () => {
        this.props.addTrackers(this.state.selectedTrackers)
    }

    render() {
        const { classes, xbeeResponse } = this.props

        return (
            <Fragment>
                <Grid container direction='column'>
                    <Grid item>
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
                    <Grid item style={{marginBottom: 24}}>
                    {
                        this.state.scanSelection === 'PAN ID' ?
                        <TextField
                            id="scanParameter"
                            className={classes.textField}
                            value={this.state.scanParameter}
                            onChange={this.inputChange}
                            disabled={this.state.scanSelection === 'PAN ID'}
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
                    </Grid>{xbeeResponse.length !== 0 && xbeeResponse !== undefined &&
                    <Grid item>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell
                                onClick={() => this.selectAll()}
                                style={{cursor: 'pointer'}}
                            >
                                {xbeeResponse.length > 1 && xbeeResponse !== undefined && <Checkbox 
                                    checked={this.state.selectedTrackers.length === xbeeResponse.length && this.state.selectedTrackers.length !== 0}
                                    color='primary'
                                />}
                                    </TableCell>
                            <TableCell >Row #</TableCell>
                            <TableCell >Device ID</TableCell>
                            <TableCell >Mac ID</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {xbeeResponse.length !== 0 && xbeeResponse !== undefined && xbeeResponse.map(res => {
                            return (
                            <TableRow key={res.macID}
                                onClick={() => this.selectRow(res)}
                                style={{cursor: 'pointer'}}
                            >
                            <TableCell>
                                <Checkbox 
                                    checked={this.state.selectedTrackers.indexOf(res) !== -1}
                                    color='primary'
                                />
                            </TableCell>
                                <TableCell >{res.VALUES.split(',')[0]}</TableCell>
                                <TableCell >{res.DID}</TableCell>
                                <TableCell >{res.macID}</TableCell>
                            </TableRow>
                        )})}
                        </TableBody>
                    </Table>
                    </Grid>}{xbeeResponse.length !== 0 && xbeeResponse !== undefined &&
                    <Grid item style={{textAlign: 'end'}}>
                        <Button color='primary' disabled={this.state.selectedTrackers.length === 0} onClick={() => this.addTrackers()} variant='contained' style={{margin: 10}}>Add</Button>
                    </Grid>}
                </Grid>
            </Fragment>
        )
    }
}


function mapStateToProps(state) {
    const { xbeeResponse, PANID } = state.app

    return {
        xbeeResponse,
        PANID
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
    },
    addTrackers: (devices) => {
        dispatch({type: 'ADD_TRACKERS_REQUEST'})
        appService.addTrackers(devices)
            .then(json => {
                dispatch({type: 'ADD_TRACKERS_SUCCESS', devices})
                dispatch({type: 'GET_COMMISSIONING_DATA_REQUEST'})
                appService.getCommissioningData()
                    .then(json => {
                        dispatch({type: 'GET_COMMISSIONING_DATA_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_COMMISSIONING_DATA_FAILURE', error})
                    })
            }, error => {
                dispatch({type: 'ADD_TRACKERS_FAILURE'})
            })
    }
})


const connectedScanTab = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScanTab))
export {connectedScanTab as ScanTab}