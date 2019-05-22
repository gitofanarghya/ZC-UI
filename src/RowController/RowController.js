import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RowControllerTab from './RowControllerTab'
import { ScanTab } from './ScanTab'
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  },
  tabsIndicator: {
    backgroundColor: 'white',
  },
});

class RowController extends React.Component {

  handleChange = (event, value) => {
    this.props.changeTab({ value });
  };

  render() {
    const { classes, currentTab } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={currentTab} onChange={this.handleChange} classes={{ indicator: classes.tabsIndicator}}>
            <Tab label="Row Controller" />
            <Tab label="Scan" />
          </Tabs>
        </AppBar>
        {currentTab === 0 && <RowControllerTab />}
        {currentTab === 1 && <ScanTab />}
      </div>
    );
  }
}

RowController.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    const { currentTab } = state.app

    return {
        currentTab
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeTab: (value) => {
        dispatch({type: 'CHANGE_TAB', value})
    }
})


const connectedRowController = (connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RowController)))
export {connectedRowController as RowController}