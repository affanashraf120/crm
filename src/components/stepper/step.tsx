import * as React from 'react'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const steps = [
  { label: 'Lead', date: '2/11/2023', days: '3 Days' },
  { label: 'Prospect', date: '2/11/2023', days: '' },
  { label: 'Approved', date: '2/11/2023', days: '' },
  { label: 'Complete', date: '', days: '' },
  { label: 'Invoice', date: '', days: '' },
  { label: 'Closed', date: '' }
]

export default function Steppers() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((item, index) => (
          <Step key={index}>
            <StepLabel>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
