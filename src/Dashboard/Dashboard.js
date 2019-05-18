import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core';

export class Dashboard extends React.Component {

    render() {
        return (
            <Grid container direction="column" style={{flexWrap: 'wrap', height: '100%'}}>
                <Grid item xs={12} md={6} style={{minHeight: '100%', padding: 10}}>
                    <Paper style={{height: '100%'}}>
                        
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} style={{height: '50%', padding: 10}}>
                    <Paper style={{height: '100%'}}>
                        
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} style={{height: '50%', padding: 10}}>
                    <Paper style={{height: '100%'}}>
                        
                    </Paper> 
                </Grid>
            </Grid>
        )
    }
}