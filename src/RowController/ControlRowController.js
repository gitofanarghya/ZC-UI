import React, { Fragment } from 'react'
import LeftIcon from '@material-ui/icons/ArrowBack'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, Typography, Grid, Button, Menu, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        height: 'calc(100% - 48px)'
    },
    second: {
        height: 'calc(100% - 128px)', 
        display: 'flex', 
        flexDirection: 'column', 
        flexWrap: 'wrap', 
        padding: 10,
        overflow: 'auto'
    }
})

class ControlRowController extends React.Component {
    state = {
        typeOfStow: 'Stow'
    }

    handleClick = event => {
        this.setState({ ...this.state, anchorEl: event.currentTarget });
    };

    handleClose = (key) => {
        this.setState({ typeOfStow: key, anchorEl: null });
    };

    render() {
        const { classes } = this.props
        const { anchorEl } = this.state
        return (
            <Fragment>

                <Grid container direction='column' className={classes.root}>
                    <Grid item style={{height: 64}}>
                        <Typography variant='h5'>
                            <IconButton aria-label="Back" onClick={this.props.back} >
                                <LeftIcon fontSize="large" />
                            </IconButton>
                            Control
                        </Typography>
                    </Grid>
                    <Grid item className={classes.second}>
                    
                    </Grid>
                    <Grid item style={{height: 64, textAlign: 'center'}}>
                        <Button color='primary' variant='contained' style={{ margin: 10 }}>Run West</Button>
                        <Button color='primary' variant='contained' style={{ margin: 10 }}>Run East</Button>
                        <Button color='primary' variant='contained' style={{ margin: 10 }}>Stop</Button>
                        <Button color='primary' variant='contained' style={{ margin: 10 }}>Reset</Button>
                        <Button color='primary' variant='contained' style={{ marginLeft: 10 }}>{this.state.typeOfStow}</Button>
                        <Button 
                            color='primary' 
                            variant='contained' 
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            style={{ minWidth: 24, paddingLeft: 0, paddingRight: 0}}
                        >
                            <ExpandMoreIcon />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            >
                            <MenuItem onClick={() => this.handleClose('Wind')}>Wind</MenuItem>
                            <MenuItem onClick={() => this.handleClose('Snow')}>Snow</MenuItem>
                            <MenuItem onClick={() => this.handleClose('Night')}>Night</MenuItem>
                            <MenuItem onClick={() => this.handleClose('Clean')}>Clean</MenuItem>
                            <MenuItem onClick={() => this.handleClose('Emergency')}>Emergency</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>

            </Fragment>
        )
    }
}

export default withStyles(styles)(ControlRowController);