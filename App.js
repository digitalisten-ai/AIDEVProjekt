import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import TopArtists from './components/TopArtists';
import TopCountries from './components/TopCountries';
import TopAlbums from './components/TopAlbums';
import TopTracks from './components/TopTracks';
import SalesOverTime from './components/SalesOverTime';
import logo from './assets/images/hyp_logo.png';

// Skapa ett tema med Material-UI:s färger och typografi
const theme = createTheme({
  palette: {
    primary: {
      main: '#4285F4',
    },
    secondary: {
      main: '#F5F5F5',
    },
    success: {
      main: '#34A853',
    },
    warning: {
      main: '#FBBC05',
    },
    error: {
      main: '#EA4335',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={logo} alt="Logo" style={{ width: '300px' }} />
          <Typography variant="h5" color="primary" style={{ marginTop: '10px' }}>
            ....:::Welcome To Sales Dashboard:::....
          </Typography>
        </div>

        {/* Traditionell layout med procentbaserade widths */}
        <div style={{ display: 'block', margin: '0 auto', maxWidth: '1200px' }}>
          <div style={{ width: '45%', float: 'left', margin: '2.5%' }}>
            <TopArtists />
          </div>
          <div style={{ width: '45%', float: 'left', margin: '2.5%' }}>
            <TopAlbums />
          </div>
          <div style={{ width: '45%', float: 'left', margin: '2.5%' }}>
            <TopTracks />
          </div>
          <div style={{ width: '45%', float: 'left', margin: '2.5%' }}>
            <TopCountries />
          </div>
          <div style={{ width: '95%', margin: '2.5% auto' }}>
            <SalesOverTime />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
