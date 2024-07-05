import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import ListItems from './Components/ListItems/ListItems.jsx'
import './index.css'
import EmojiList from './Components/EmojiList/EmojiList';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
      mode: 'dark'
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>

      <EmojiList />
    </ThemeProvider>
  </React.StrictMode>,
)
