import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { SPAParameters } from './SPAParameters';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import { StowAngles } from './StowAngles';
import LeftIcon from '@material-ui/icons/ArrowBack'
import { Grid, Typography, Chip, Toolbar } from '@material-ui/core';

const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      margin: 10,
      display: 'flex',
      flexDirection: 'column'
    },
    body: {
        display: 'flex',
        flexDirection: 'row'
    },
    tabsIndicator: {
      backgroundColor: '#54AAB3',
    },
    selected: {
      backgroundColor: '#54AAB3',
      color: '#ffffff',
      fontWeight: 600,
      fontSize: 14
    },
    editedTrackers: {
        width: '25%',
        margin: 10,
    },
    tabs: {
        width: '75%',
        padding: 10,
        boxShadow: '-1px 0px 0px 0px rgba(0,0,0,0.5)'
    },
    chip: {
        margin: 10
    },
    green: {
        backgroundColor: 'green'
    },
    red: {
        backgroundColor: 'red'
    }
});

class EditRowController extends React.Component {
    handleChange = (event, value) => {
        this.props.changeTab({ value });
    };
    
    render() {
        const { classes, currentEditTab, editedTrackers, responseQueue } = this.props;
    
        return (
        <div className={classes.root}>
            <div className={classes.header}>
            <Grid item>
                <Typography variant='h5'>
                    <IconButton aria-label="Back" onClick={this.props.back} >
                        <LeftIcon fontSize="large" />
                    </IconButton>
                    Edit Parameters
                </Typography>
            </Grid>
            </div>
            <div className={classes.body}>
            <div className={classes.editedTrackers}>
            
            <AppBar position="static" color='secondary'>
                <Toolbar style={{minHeight: 48}} disableGutters>
                <Typography variant="subtitle1" style={{margin: 'auto'}}>
                    Selected Trackers
                </Typography>
                </Toolbar>
            </AppBar>
            {
                editedTrackers.map(t => (
                <Chip key={t.deviceID} label={`Row#: ${t.rowNumber}`} className={classes.chip} style={responseQueue.filter(r => r.request.DID === t.deviceID)[0] ? responseQueue.filter(r => r.request.DID === t.deviceID)[0].success ? {backgroundColor: 'green'} : {backgroundColor: 'red'} : {}}/>
            ))}
            </div>
            <div className={classes.tabs}>
            <AppBar position="static" color='secondary'>
                <Tabs value={currentEditTab} onChange={this.handleChange} classes={{indicator: classes.tabsIndicator}}>
                    <Tab label="SPA Parameters" classes={{selected: classes.selected}}/>
                    <Tab label="Stow Angles" classes={{selected: classes.selected}}/>
                </Tabs>
            </AppBar>
            {currentEditTab === 0 && <SPAParameters />}
            {currentEditTab === 1 && <StowAngles />}
            </div>
            </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { currentEditTab, editedTrackers, responseQueue } = state.app

    return {
        currentEditTab,
        editedTrackers,
        responseQueue       
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeTab: (value) => {
        dispatch({type: 'CHANGE_EDIT_TAB', value})
    }
})


const connectedEditRowController = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditRowController))
export {connectedEditRowController as EditRowController}