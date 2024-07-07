import { Box} from '@mui/material'
import './App.css'
import { Link } from 'react-router-dom'
import { GiWeightLiftingUp } from "react-icons/gi";
import { BsEmojiSunglasses } from "react-icons/bs";
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

function App() {

  return (
    <div className='text-light row g-3 justify-content-center'>
      <h1>4/6 Tasks done 😎</h1>
      <p>I'd do the rest but.... I dont have to ¯\_(ツ)_/¯</p>
      <div className='col-6 col-md-4'>
        <Box className="w-100 bg-dark rounded-3 myOutline d-flex flex-column align-items-center justify-content-center noLink" minHeight={'12rem'} maxHeight={'12rem'} component={Link} to={'/bmi'}>
          <div className='p-3'>
            <h5>Emoji Picker</h5>
            <GiWeightLiftingUp size={100} />
          </div>
        </Box>
      </div>
      <div className='col-6 col-md-4'>
        <Box className="w-100 bg-dark rounded-3 myOutline d-flex flex-column align-items-center justify-content-center noLink" minHeight={'12rem'} maxHeight={'12rem'} component={Link} to={'/emoji'}>
            <h5>Emoji Picker</h5>
            <BsEmojiSunglasses size={100} />
        </Box>
      </div>
      <div className='col-6 col-md-4'>
        <Box className="w-100 bg-dark rounded-3 myOutline d-flex flex-column align-items-center justify-content-center noLink" minHeight={'12rem'} maxHeight={'12rem'} component={Link} to={'/compressor'}>
          <div className='p-3'>
            <h5>Image Compressor</h5>
            <MdPhotoSizeSelectLarge size={100} />
          </div>
        </Box>
      </div>
      <div className='col-6 col-md-4'>
        <Box className="w-100 bg-dark rounded-3 myOutline d-flex flex-column align-items-center justify-content-center noLink" minHeight={'12rem'} maxHeight={'12rem'} component={Link} to={'/store'}>
          <div className='p-3'>
            <h5>Online store</h5>
            <MdOutlineLocalGroceryStore size={100} />
          </div>
        </Box>
      </div>
    </div>
  )
}

export default App
