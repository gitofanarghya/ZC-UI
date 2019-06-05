import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Time from '@material-ui/icons/AccessTime';
import Toys from '@material-ui/icons/Toys';
import { Chip } from '@material-ui/core';

const drawerWidth = 190;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 88
  },
  selected: {
    backgroundColor: '#54AAB3 !important',
    color: '#ffffff !important'
  },
  iconSVG: {
    fill: 'white',
    stroke: 'white'
  },
  icon: {
    color: 'white'
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  
  checkTime = (i) => {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  render() {
    const { classes, theme, children } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} >
            <img src='img/voyager-logo-no bg.png' height='60px' width='90%' style={{marginLeft: '2.5%', marginRight: '2.5%'}} alt=''></img>
        </div>
        <Divider />
        <List>
          {['Dashboard', 'Row Controller', 'Zone Controller', 'Sensors', 'About'].map((text, index) => (
            <ListItem 
                button 
                key={text}
                onClick={() => this.props.changePage(text)}
                selected={this.props.currentPage === text}
                classes={{selected: classes.selected}}
                disabled={text === 'About'}
            >{/* 
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText disableTypography primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color='primary' className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit" noWrap>
              Voyager Zone Controller
            </Typography>
            <Chip
              icon={<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 296.639 296.639"><g><g><g><path d="M267.83,59.159c-5.268-4.88-13.488-6.784-20.332-5.176c-0.728-7.116-3.608-14.528-9.94-19.12c4.488-9.668,2.444-20.848-5.652-29.592c-2.916-3.152-6.044-4.912-9.304-5.228c-4.144-0.408-9.108,2.108-9.84,6.888c-0.108,0.704-0.108,1.46-0.096,2.208c0.004,0.12,0.008,0.256,0.012,0.396c-0.492-0.376-1.18-1.008-2.02-2.036c-4.708-5.724-12.776-8.548-20.092-7.064c-2.532,0.52-4.556,1.912-6.04,3.068c-1.972,1.536-3,3.324-3.064,5.304c-0.112,3.472,2.788,6.052,5.124,8.124c0.36,0.32,0.8,0.712,1.196,1.084c-1.492,0.22-3.776,0.26-5.324,0.284c-3.268,0.056-6.64,0.116-9.42,0.952c-2,0.608-8.088,2.456-9.364,7.852c-1.26,5.328,3.108,9.744,7.612,12.096c4.396,2.3,9.132,3.768,14.068,4.356c0.636,0.08,1.304,0.136,1.976,0.188c1.04,0.084,2.688,0.22,3.412,0.484c0,0.04,0.02,0.072,0.02,0.112c-3.044,3.696-5.564,8-7.5,13.096c-2.7,7.12-3.3,14.66-3.884,21.948l-0.328,3.968c-0.716,8.008-2.012,16.312-6.6,22.796c-4.004,5.644-14.836,11.488-16.884,10.78c0,0-0.052-0.132-0.052-0.472c0.136-58.088-35.64-85.632-68.944-86.64c-41.5-1.312-62.604,33.836-64.592,66.98c-0.096,1.636,1.168,3.044,2.824,3.136c1.608,0.112,3.08-1.152,3.18-2.784c2.612-43.56,31.22-62.228,58.404-61.4c30.488,0.928,63.24,26.572,63.116,80.696c-0.008,2.952,1.452,5.104,4.004,5.904c5.688,1.764,15.54-4.308,21.028-9.6c-0.076,1.256-0.18,2.508-0.176,3.756c0.008,2.964,0.248,6.404,1.96,9.42c1.768,3.124,4.992,5.084,8.148,5.084c0.42,0,0.844-0.036,1.264-0.112c2.944-0.504,5.068-2.612,6.408-4.156c2.312-2.652,4.148-5.652,5.452-8.916c0.436-1.096,0.848-2.256,1.26-3.432c1.628-4.624,3.168-9.008,6.936-10.36c0.276,1.472-0.068,3.14-0.432,4.9c-0.16,0.78-0.32,1.556-0.436,2.332c-0.508,3.428,0.252,8.016,4.084,9.668c1.672,0.72,3.48,0.688,5.224-0.112c2.552-1.168,4.824-3.98,5.78-7.156c0.252-0.844,0.468-1.716,0.684-2.596c0.344-1.4,0.676-2.76,1.168-3.932c0.776,2.052,1.6,4.164,2.904,6.108c2.236,3.32,6.452,6.168,10.884,5.04c0.28-0.072,0.528-0.236,0.796-0.348c2.016,9.776,2.136,19.464,0.232,28.604c-3.172,15.248-11.992,28.372-24.196,36c-4.264,2.668-10.692,5.66-17.156,4.612c-1.428-0.22-2.824,0.588-3.308,1.94c-2.892,8.012-12.62,19.96-19.644,24.12c-0.264,0.156-0.456,0.376-0.652,0.588c-1.496,0.172-2.672,1.38-2.672,2.904v29.956c0,0.096,0.048,0.18,0.056,0.272h-6.432c0.008-0.096,0.056-0.176,0.056-0.272v-29.956c0-1.088-0.62-2-1.504-2.52c-0.18-0.296-0.4-0.58-0.688-0.808c-5.292-4.164-5.764-17.336-2.232-23.764c0.576-1.056,0.456-2.352-0.308-3.284c-0.764-0.932-2.02-1.316-3.188-0.98c-17.708,5.164-37.828,0.408-51.244-12.108c-1.208-1.128-3.112-1.072-4.252,0.12c-1.14,1.192-1.084,3.068,0.12,4.192c13.544,12.636,33.2,18.16,51.464,14.82c-2.216,8.916-0.52,20.5,5.824,25.58v28.708c0,0.096,0.048,0.18,0.056,0.272H114.93c-0.048,0-0.084,0.024-0.128,0.024l-9.456-11.232c-0.4-0.476-0.992-0.748-1.62-0.748h-48.6c-0.816,0-1.556,0.468-1.908,1.196c-0.344,0.728-0.232,1.592,0.288,2.212l13.268,15.76l-13.268,15.76c-0.52,0.62-0.632,1.484-0.288,2.212c0.348,0.728,1.088,1.192,1.908,1.192h48.6c0.628,0,1.22-0.272,1.62-0.748l9.436-11.212h41.944c0,0.012-0.008,0.02-0.008,0.032v32.292c0,1.64,1.344,2.968,3.008,2.968h12.336c1.66,0,3.008-1.328,3.008-2.968v-32.292c0-0.012-0.008-0.02-0.008-0.032h50.356v11.62c0,0.74,0.404,1.428,1.052,1.8c0.328,0.184,0.688,0.28,1.052,0.28s0.728-0.096,1.052-0.28l33.044-18.828c0.648-0.372,1.052-1.06,1.052-1.8s-0.404-1.428-1.052-1.8l-33.044-18.828c-0.656-0.368-1.452-0.368-2.104,0c-0.648,0.372-1.052,1.06-1.052,1.8v11.616H175.01c0.008-0.096,0.056-0.176,0.056-0.272v-28.248c0.132-0.056,0.276-0.036,0.404-0.112c7.628-4.516,17.248-15.94,21.328-25.036c5.944,0.304,12.424-1.652,18.904-5.708c13.58-8.488,23.368-23.004,26.872-39.824c3.148-15.12,1.308-31.56-5.332-47.532l-0.232-0.56c-0.952-2.288-1.856-4.444-1.728-6.436c0.136-2.076,1.408-4.12,2.836-6.248c0.096,1.868,0.164,3.736,0.348,5.584c0.264,2.768,0.688,5.956,2.316,8.772c1.92,3.332,5.252,5.384,8.64,5.384c0.236,0,0.468-0.008,0.704-0.028c4.696-0.408,7.86-4.604,8.564-8.54c0.672-3.716-0.356-7.272-1.372-10.312c-1.488-4.44-3.3-8.772-5.368-12.988c6.524,0.052,13.104,2.564,17.144,6.756c0.576,0.596,1.368,0.924,2.18,0.924c0.288,0,0.576-0.04,0.86-0.128c1.084-0.32,1.892-1.212,2.1-2.312C275.718,72.059,273.322,64.243,267.83,59.159z M229.626,259.275v-10.264v-10.092l26.724,15.228l-26.724,15.228V259.275z M102.742,269.159H59.614l11.516-13.684c0.648-0.772,0.648-1.884,0-2.66l-11.516-13.684h43.128l12.636,15.012L102.742,269.159z M169.054,261.387v29.324h-6.32v-29.324c0-0.012-0.004-0.02-0.004-0.032h6.332C169.058,261.367,169.054,261.375,169.054,261.387z M225.418,251.091v6.108h-0.004H118.282l1.452-1.72c0.648-0.772,0.648-1.884,0-2.66l-1.452-1.728H225.418z M187.826,37.827c-0.592-0.048-1.18-0.096-1.744-0.164c-4.204-0.508-8.24-1.752-11.984-3.708c-2.516-1.316-5.02-3.6-4.568-5.504c0.408-1.716,3.096-2.868,5.276-3.524c1.964-0.596,4.908-0.644,7.752-0.696c5.236-0.088,10.176-0.172,11.804-3.86c1.428-3.244-1.44-5.796-3.748-7.852c-0.936-0.836-3.128-2.78-3.14-3.512c0,0,0.088-0.304,0.788-0.852c1.024-0.792,2.236-1.644,3.528-1.904c5.164-1.072,10.876,0.944,14.196,4.988c2.492,3.032,4.816,4.568,7.112,4.688c1.408,0.072,2.844-0.452,3.908-1.496c1.744-1.716,1.704-3.928,1.68-5.396c-0.008-0.412-0.032-0.836,0.028-1.228c0.16-1.076,1.72-2,3.3-1.856c1.732,0.168,3.568,1.288,5.448,3.324c6.24,6.736,7.996,15.184,4.916,22.516c-3.656-1.736-8.864-3.376-15.504-2.024c-9.04,1.836-16.24,5.216-21.928,10.228C193.078,38.331,190.326,38.031,187.826,37.827z M241.678,59.671c-0.46,7.856-2.984,15.504-7.312,22.108l-0.836,1.256c-1.868,2.776-3.992,5.92-4.244,9.788c-0.22,3.372,1.052,6.404,2.168,9.08l0.232,0.548c1.548,3.732,2.816,7.484,3.804,11.232c-0.276,0.256-0.576,0.464-0.9,0.544c-2.392,0.628-4.924-1.28-6.276-3.296c-1.096-1.624-1.808-3.516-2.568-5.52c-0.432-1.136-0.864-2.276-1.368-3.388c-0.264-0.58-0.788-1.012-1.412-1.168c-0.64-0.168-1.3-0.024-1.808,0.364c-2.956,2.228-3.82,5.756-4.584,8.864c-0.192,0.808-0.392,1.612-0.624,2.384c-0.6,1.984-2.072,3.9-3.5,4.552c-0.836,0.38-1.388,0.22-1.736,0.072c-1.528-0.66-1.892-3.172-1.588-5.224c0.104-0.7,0.252-1.4,0.396-2.104c0.456-2.196,0.972-4.688,0.288-7.208c-0.112-0.412-0.456-1.676-1.672-2.412c-1.296-0.768-2.684-0.404-3.156-0.28c-6.084,1.656-8.236,7.764-10.128,13.148c-0.392,1.116-0.78,2.228-1.2,3.268c-1.128,2.828-2.72,5.428-4.724,7.724c-1.456,1.676-2.7,2.552-3.924,2.764c-1.992,0.336-4.012-1.192-4.976-2.896c-1.236-2.18-1.412-4.956-1.42-7.388c-0.012-3.528,0.336-7.092,0.984-10.596c3.604-6.82,4.788-14.552,5.452-22.012l0.332-4.024c0.576-7.2,1.116-13.996,3.52-20.328c5.124-13.504,14.124-20.888,29.188-23.948c6.752-1.368,11.46,1.32,14.944,3.304C240.062,42.871,242.102,52.239,241.678,59.671z M252.77,97.091c-0.296,1.652-1.588,3.52-3.156,3.656c-1.252,0.064-2.748-0.896-3.604-2.38c-1.04-1.796-1.34-4.14-1.556-6.392c-0.516-5.296-0.656-10.68-0.448-16.004c0.264-0.664,0.564-1.312,0.8-1.984c2.704,5.04,4.996,10.288,6.804,15.692C252.394,92.031,253.198,94.731,252.77,97.091z M248.886,69.027c-0.628-1.104-1.252-2.212-1.92-3.296c0.324-1.868,0.588-3.748,0.7-5.648c5.072-1.768,11.916-0.42,16.048,3.408c2.764,2.56,4.44,6.12,4.844,10.064C262.95,70.051,255.818,68.387,248.886,69.027z"/><path d="M73.898,66.487c2.592-0.816,1.484-4.86-1.128-4.04c-28.344,8.928-40.844,41.248-34.464,68.108  c0.624,2.624,4.716,1.512,4.092-1.116C36.57,104.919,47.854,74.691,73.898,66.487z"/><path d="M124.226,98.675c-0.068,2.696,4.176,2.696,4.244,0c0.376-14.748-11.428-26.448-23.868-32.808  c-2.42-1.236-4.568,2.376-2.14,3.616C113.574,75.167,124.566,85.395,124.226,98.675z"/><path d="M59.714,123.883c-2.78,13.268,0.788,24.74,7.12,36.46c1.284,2.38,4.948,0.268,3.664-2.112  c-5.768-10.688-9.236-21.076-6.692-33.232C64.358,122.363,60.27,121.239,59.714,123.883z"/><path d="M63.21,113.487c-1.108,2.44,2.548,4.572,3.664,2.116c7.556-16.632,28.364-33.856,45.696-17.74  c1.988,1.844,4.996-1.112,3-2.964C96.286,76.963,72.002,94.123,63.21,113.487z"/><path d="M85.17,116.447c-7.444,17.128-6.732,41.524,8.896,53.932c2.988,2.376,7.268-1.8,4.252-4.196  c-13.316-10.576-14.384-31.944-7.956-46.74C91.87,115.971,86.69,112.943,85.17,116.447z"/><path d="M110.63,99.999c-5.36,0.388-10.356,2-14.892,4.848c-3.256,2.048-0.244,7.188,3.036,5.128  c3.624-2.28,7.548-3.732,11.856-4.04C114.47,105.663,114.498,99.723,110.63,99.999z"/><path d="M156.542,162.987c2.716-0.132,2.732-4.32,0-4.188c-5.36,0.256-10.56-0.212-15.724-1.696  c-2.628-0.752-3.748,3.288-1.128,4.04C145.202,162.723,150.818,163.259,156.542,162.987z"/><path d="M200.826,135.259c-7.472,11.228-20.552,22.468-34.932,21.768c-2.728-0.132-2.724,4.056,0,4.188  c15.936,0.776,30.324-11.408,38.596-23.84C205.994,135.115,202.322,133.015,200.826,135.259z"/><path d="M191.074,159.283c-3.3,3.376-7.012,6.196-11.556,7.708c-2.576,0.86-1.472,4.904,1.128,4.04  c5.244-1.748,9.612-4.88,13.432-8.788C195.97,160.303,192.974,157.339,191.074,159.283z"/><path d="M197.426,158.403c2.268-2.86,4.36-5.832,6.408-8.852c1.52-2.248-2.152-4.348-3.664-2.116  c-1.84,2.72-3.7,5.428-5.744,8.004C192.758,157.543,195.742,160.527,197.426,158.403z"/><path d="M220.374,48.571c-5.024,0-9.108,4.032-9.108,8.988s4.088,8.992,9.108,8.992c5.02,0,9.108-4.032,9.108-8.992  C229.486,52.603,225.398,48.571,220.374,48.571z M220.374,60.611c-1.708,0-3.092-1.364-3.092-3.052  c0-1.684,1.384-3.048,3.092-3.048s3.092,1.364,3.092,3.048C223.47,59.247,222.082,60.611,220.374,60.611z"/></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>}
              style={this.props.sensorEvents.wind ? this.props.windSense.direction !== null ? {marginLeft: 'auto', backgroundColor: 'white'} : {marginLeft: 'auto', backgroundColor: '#ff000080', color: 'white'} : {marginLeft: 'auto', backgroundColor: '#ff000080', color: 'white'}}
              label={this.props.sensorEvents.wind ? this.props.windSense.direction !== null ? `${this.props.windSense.direction.toFixed(2)} Deg` : 'offline' : 'offline'}
              classes={this.props.sensorEvents.wind ? this.props.windSense.direction !== null ? {} : {icon: classes.iconSVG} : {icon: classes.iconSVG}}
            />
            <Chip
              icon={<Toys className={this.props.sensorEvents.wind ? this.props.windSense.speed !== null ? 'rotate' : {} : {}}/>}
              style={this.props.sensorEvents.wind ? this.props.windSense.speed !== null ? {marginLeft: 10, backgroundColor: 'white'} : {marginLeft: 10, backgroundColor: '#ff000080', color: 'white'} : {marginLeft: 10, backgroundColor: '#ff000080', color: 'white'}}
              label={this.props.sensorEvents.wind ? this.props.windSense.speed !== null ? `${this.props.windSense.speed.toFixed(2)} mph` : 'offline' : 'offline'}
              classes={this.props.sensorEvents.wind ? this.props.windSense.speed !== null ? {} : {icon: classes.icon} : {icon: classes.icon}}
            />
            <Chip
              icon={<Time />}
              style={{marginLeft: 10, backgroundColor: 'white'}}
              label={`${this.checkTime(new Date(new Date(Number(this.props.time)).toLocaleString('en-US', {timeZone:  this.props.timeZone})).getHours())} : ${this.checkTime(new Date(new Date(Number(this.props.time)).toLocaleString('en-US', {timeZone:  this.props.timeZone})).getMinutes())}`}
            />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          {children}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

 
function mapStateToProps(state) {
    const { currentPage, time, timeZone, windSense, sensorEvents } = state.app;
    
    return {
        currentPage,
        time,
        timeZone,
        windSense,
        sensorEvents
    };
}

const mapDispatchToProps = (dispatch) => ({
    changePage: (page) => {
      dispatch({type: 'CHANGE_PAGE', page})
    }
})
  
const connectedNavBar = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ResponsiveDrawer));
export { connectedNavBar as NavBar }