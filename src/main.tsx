import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import ListItems from './Components/ListItems/ListItems.jsx'
import './index.css'
import EmojiList from './Components/EmojiList/EmojiList';
import { createTheme, ThemeProvider } from '@mui/material';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import CompressorWrapper from './Components/ImageCompressor/CompressorWrapper';
import BMICalculator from './Components/BMI Calculator/BMICalculator';
import Store from './Components/Store/Store';
import Text from './Components/Store/text';
import PhotoGallery from './Components/PhotoGallery/PhotoGallery';

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <div className='w-100 MyFont'>

    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/emoji" element={<EmojiList />} />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/compressor" element={<CompressorWrapper />} />
          <Route path="/test" element={<Text />} />
          <Route path="/store" element={<Store />} />
          <Route path="/gallery" element={<PhotoGallery />} />
          <Route path="*" element={<h1>lol wrong route</h1>} />
        </Routes>
      </Router>
    </ThemeProvider>
    </div>
  // </React.StrictMode>,
)
