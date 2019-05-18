import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { store } from './util/store';
import { App } from './App';
import './index.css'

/* const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#54AAB3",
        contrastText: '#fff'
      }
    },
    overrides: {
      MuiIconButton: {
          root: {
            color: 'white'
          },
      }
    } 
  }); */

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#54AAB3',
        dark: '#3c8f98',
        contrastText: '#ffffff'
      }
    }/* ,
    overrides: {
      MuiListItem: {
        root: {
          backgroundColor: '#ffffff',
          '&$selected': {
            backgroundColor: '#54AAB3',
            color: '#ffffff'
          },
          '&$selected:hover': {
            backgroundColor: '#3c8f98',
            color: '#ffffff'
          }
        },
      },
    } */
  });

render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);