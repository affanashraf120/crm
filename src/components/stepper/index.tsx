import * as React from 'react'

import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'

import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import type { StepIconProps } from '@mui/material/StepIcon'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(46,125,50) 0%,rgb(76,171,81) 50%,rgb(217,231,218) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(46,125,50) 0%,rgb(76,171,81) 50%,rgb(217,231,218) 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(46,125,50) 0%, rgb(76,171,81) 50%, rgb(217,231,218) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(46,125,50) 0%, rgb(76,171,81) 50%, rgb(217,231,218) 100%)'
  })
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <i className='ri-account-circle-line'></i>,
    2: <i className='ri-account-circle-line'></i>,
    3: <i className='ri-account-circle-line'></i>,
    4: <i className='ri-account-circle-line'></i>,
    5: <i className='ri-account-circle-line'></i>,
    6: <i className='ri-account-circle-line'></i>
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

const steps = [
  { label: 'Lead', date: '2/11/2023', days: '3 Days' },
  { label: 'Prospect', date: '2/11/2023', days: '' },
  { label: 'Approved', date: '2/11/2023', days: '' },
  { label: 'Complete', date: '', days: '' },
  { label: 'Invoice', date: '', days: '' },
  { label: 'Closed', date: '' }
]

export default function CustomizedSteppers() {
  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <CardHeader title='Milestone' />
        <CardHeader subheader='In Prospect Milestone: 7 Months ' />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          gap: 2
        }}
      >
        {/* <CardActions
          sx={{
            flexShrink: 0,
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            gap: 2,
            flexDirection:'column'
          }}
        >
          <Typography
            variant='h6'
            sx={{
              whiteSpace: 'nowrap'
            }}
          >
            <span className='text-primary text-bold'>NEXT STEP :</span> Closed
          </Typography>
          <Button variant='contained' sx={{marginLeft: '0px !important'}}>Submit</Button>
        </CardActions> */}
        <CardContent
          sx={{
            width: '100%'
          }}
        >
          <Stepper alternativeLabel activeStep={4} connector={<ColorlibConnector />}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1,
                      position: 'relative'
                    }}
                  >
                    <Typography variant='h6'>{step.label ? step.label : '--'}</Typography>
                    <Typography variant='body2'>{step.date ? step.date : '--'}</Typography>
                  </Box>
                  {step.days && (
                    <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                      <Typography variant='body2'>{step.days}</Typography>
                    </Box>
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Box>
    </Card>
  )
}
