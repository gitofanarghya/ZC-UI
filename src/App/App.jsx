import React from 'react';
import { NavBar } from '../NavBar/NavBar'
import { Dashboard } from '../Dashboard/Dashboard'
import  RowController  from '../RowController/RowController'
import ZoneController from '../ZoneController/ZoneController'
import Sensors from '../Sensors/Sensors'
import { About } from '../About/About'
import { connect } from 'react-redux'

class App extends React.Component {


    render() {
        return ( 
                <div className="h100">
                    <NavBar>
                    {
                        this.props.currentPage === 'Dashboard' ? <Dashboard /> :
                        this.props.currentPage === 'Row Controller' ? <RowController /> :
                        this.props.currentPage === 'Zone Controller' ? <ZoneController /> :
                        this.props.currentPage === 'Sensors' ? <Sensors /> : <About /> 
                    }
                    </NavBar>
                </div>
        );
    }
}

function mapStateToProps(state) {
    const { currentPage } = state.app

    return {
        currentPage
    }
}

const connectedApp = connect(mapStateToProps)(App)
export {connectedApp as App}