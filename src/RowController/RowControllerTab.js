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
    buttons: {
        marginBottom: 10,
        marginRight: 10,
        marginTop: 10
    }
});

class RowControllerTab extends React.Component {
    state = {
        selectedTrackers: [],
        location: 'home'
    }

    selectAll = () => {
        if(this.state.selectedTrackers.length === this.props.commissioningData.length) {
            this.setState({
                ...this.state,
                selectedTrackers: []
            })
        } else {
            this.setState({
                ...this.state,
                selectedTrackers: [...this.props.commissioningData]
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
                selectedTrackers: [...this.state.selectedTrackers.filter(t => t.macID !== row.macID)]
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

    removeTrackers = () => {
        this.props.removeTrackers(this.state.selectedTrackers.map(s => s.deviceID))
    }

    render() {
        const { classes, commissioningData } = this.props

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
                                    {commissioningData !== null && <Checkbox 
                                        checked={this.state.selectedTrackers.length === commissioningData.length}
                                        color='primary'
                                    />}
                                        </TableCell>
                                <TableCell >Row #</TableCell>
                                <TableCell >Device ID</TableCell>
                                <TableCell >Mac ID</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {commissioningData && commissioningData.map(row => (
                                <TableRow key={row.macID}
                                    onClick={() => this.selectRow(row)}
                                    style={{cursor: 'pointer'}}
                                >
                                <TableCell>
                                    <Checkbox 
                                        checked={this.state.selectedTrackers.indexOf(row) !== -1}
                                        color='primary'
                                    />
                                </TableCell>
                                    <TableCell >{row.rowNumber}</TableCell>
                                    <TableCell >{row.deviceID}</TableCell>
                                    <TableCell >{row.macID}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </Grid>
                        <Grid item style={{textAlign: 'end'}}>
                            <Button variant='contained' color='primary' className={classes.buttons} disabled={this.state.selectedTrackers.length === 0} onClick={() => this.removeTrackers()}>Remove</Button>
                        </Grid>
                    </Grid>
                    
                }
                
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
    removeTrackers : (DIDs) => {
        dispatch({type: 'REMOVE_TRACKERS_REQUEST'})
        appService.removeTrackers(DIDs)
            .then(json => {
                dispatch({type: 'REMOVE_TRACKERS_SUCCESS', DIDs})
                dispatch({type: 'GET_COMMISSIONING_DATA_REQUEST'})
                appService.getCommissioningData()
                    .then(json => {
                        dispatch({type: 'GET_COMMISSIONING_DATA_SUCCESS', json})
                    }, error => {
                        dispatch({type: 'GET_COMMISSIONING_DATA_FAILURE', error})
                    })
            }, error => {
                dispatch({type: 'REMOVE_TRACKERS_FAILURE'})
            })
    }
})


const connectedRowControllerTab = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RowControllerTab))
export {connectedRowControllerTab as RowControllerTab}