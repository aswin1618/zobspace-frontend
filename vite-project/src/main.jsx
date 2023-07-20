import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App.jsx'
import { Box, CssBaseline } from '@mui/material'

// Define a custom theme
const theme = createTheme({
  palette: {
    background: {
      default: "#1B1818" // Set the default background color to black
    },
    primary: {
      main: '#1B1818', // Set the primary color to black
      light: '#FFFFFF', // Set the light color to white
    },
    secondary: {
      main: '#534949', // Set the light color to somewhat grey
      light: '#FFFFFF', // Set the light color to white
    },
    text: {
      primary: '#FFFFFF', // Set the text color to black
      light: '#000000', // Set the light color to white
    },
    other: {
      main: '#6BF6FF' // Set the hover color to this blueish green
    }
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
    <CssBaseline />
      <Box sx={{ height: "100vh" }}>
      <div>
        <App />
      </div>
      </Box>
    </React.StrictMode>
  </ThemeProvider>
)
