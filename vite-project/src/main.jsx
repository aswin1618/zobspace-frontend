import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App.jsx'

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF', // Set the primary color to black
      light: '#1B1818', // Set the light color to white
    },
    secondary: {
      main: '#534949', // Set the light color to somewhat grey
      light: '#FFFFFF', // Set the light color to white
    },
    text: {
      primary: '#000000', // Set the text color to black
      light: '#FFFFFF', // Set the light color to white
    },
    other: {
      main: '#6BF6FF' // Set the hover color to this blueish green
    }
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <div>
        <App />
      </div>
    </React.StrictMode>
  </ThemeProvider>
)
