import { TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

export default function BMICalculator() {
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [BMI, setBMI] = useState(0)
    const [Statement, setStatement] = useState("")
    const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        setWeight(newValue ? newValue : 0)
    }
    const handleHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        setHeight(newValue ? newValue : 0)
    }
    useEffect(() => {
        const bmi: any = weight / ((height / 100) * (height / 100))

        setBMI(bmi)
        if (bmi == 'Infinity') {
            setStatement("Who's mom did you put on the scale?")
        } else if (bmi >= 40) {
            setStatement('Nah bro call 911');
        } else if (bmi >= 30) {
            setStatement('Obese');
        } else if (bmi >= 25) {
            setStatement('Overweight');
        } else if (bmi >= 18.5) {
            setStatement('Normal weight');
        } else if (bmi < 18.5) {
            setStatement('EAT SOMETHING FOR THE LOVE OF GOD!');
        }
        else {
            setStatement("")

        }
    }, [weight, height])

    return (
        <div className='container text-light'>
            <h1>BMI Calculator!</h1>
            <div className="d-flex w-100 justify-content-center my-3">

                <h6 className='mx-2'>Your BMI : {BMI ? BMI : 0}</h6>
                <span className='mx-2'>{Statement}</span>
            </div>
            <div className='row'>
                <div className="col-6">
                    <TextField
                        label="Weight (kg)"
                        type="number"
                        className='w-100'
                        onChange={handleWeightChange}
                        value={weight}
                        variant="outlined" />
                </div>
                <div className="col-6">
                    <TextField
                        label="Height (cm)"
                        className='w-100'
                        type="number"
                        onChange={handleHeightChange}
                        value={height}
                        variant="outlined" />
                </div>

            </div>
        </div>
    )
}
