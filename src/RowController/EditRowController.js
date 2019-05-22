import React, { Fragment } from 'react'
import LeftIcon from '@material-ui/icons/ArrowBack'
import { IconButton, Typography, Grid, Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        height: 'calc(100% - 48px)'
    },
    fieldGrid: {
        height: 'calc(100% - 128px)', 
        display: 'flex', 
        flexDirection: 'column', 
        flexWrap: 'wrap', 
        padding: 10,
        overflow: 'auto'
    },
    field: {
        width: '23%',
        margin: '10px 0px 1% 1%'
    }
})

class EditRowController extends React.Component {
    state = {

    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <Grid container direction='column' className={classes.root}>
                    <Grid item style={{height: 64}}>
                        <Typography variant='h5'>
                            <IconButton aria-label="Back" onClick={this.props.back} >
                                <LeftIcon fontSize="large" />
                            </IconButton>
                            Edit Parameters
                        </Typography>
                    </Grid>
                    <Grid item className={classes.fieldGrid}>
                    {
                        ['Lattitude', 'Longitude', 'Altitude', 'East Limit', 'West Limit', 'Tracker Width', 'Pitch', 'Tracking Accuracy', 'Azimuth Deviation', 'Altitude Tracker on East', 'Altitude Tracker on West', 'Start Time Lead', 'End Time Lag', 'Wind Stow Angle', 'Snow Stow Angle', 'Night Stow Angle', 'Emergency Stow Angle', 'Clean Stow Angle'].map(p => {
                            return <TextField
                                key={p}
                                className={classes.field}
                                id={p}
                                label={p}
                                value={this.state[p]}
                                onChange={this.handleChange(p)}
                                margin="normal"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                            />
                        })
                    }
                    
                    </Grid>
                    <Grid item style={{height: 64, textAlign: 'end'}}>
                        <FormControlLabel
                            control={
                                <Checkbox color='primary' />
                            }
                            label="Backtracking"
                        />
                        <Button color='primary' variant='contained' style={{ margin: 10 }}>Sync time with Zone Controller</Button>
                        <Button color='primary' variant='contained' style={{ margin: 10 }}>Remove Row Controller</Button>
                        <Button color='primary' variant='contained' style={{ margin: 10 }}>Save</Button>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default withStyles(styles)(EditRowController);