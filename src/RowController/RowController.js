import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RowControllerTab from './RowControllerTab'
import ScanTab from './ScanTab'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  },
});

class RowController extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Row Controller" />
            <Tab label="Scan" />
          </Tabs>
        </AppBar>
        {value === 0 && <RowControllerTab />}
        {value === 1 && <ScanTab />}
      </div>
    );
  }
}

RowController.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RowController);