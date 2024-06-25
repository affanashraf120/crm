import * as React from 'react'

import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'

import type { StepIconProps } from '@mui/material/StepIcon'

import { useSettings } from '@/@core/hooks/useSettings'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 26
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'rgb(46,125,50)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'rgb(46,125,50)'
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
  ownerState: { completed?: boolean; active?: boolean; color: string }
}>(({ ownerState }) => ({
  backgroundColor: ownerState.active || ownerState.completed ? ownerState.color : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: ownerState.active || ownerState.completed ? 60 : 60,
  height: ownerState.active || ownerState.completed ? 60 : 60,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: `${ownerState.color}`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: `${ownerState.color}`
  })
}))

function ColorlibStepIcon(props: StepIconProps & { colors: string[] }) {
  const { active, completed, className, icon, colors } = props
  const color = colors[Number(icon) - 1] || '#ccc'

  const icons: { [index: string]: React.ReactElement } = {
    1: <span>L</span>,
    2: <span>P</span>,
    3: <span>A</span>,
    4: <span>C</span>,
    5: <span>I</span>,
    6: <span>✔</span>
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active, color }} className={className}>
      <span className='font-black text-4xl'>{icons[String(icon)]}</span>
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

const colors = [
  'rgb(255,165,0)', // orange
    'rgb(255,0,0)', // red
  'rgb(0,128,0)', // green
  'rgb(255,255,0)', // yellow
  'rgb(0,0,255)', // blue
  'rgb(75,0,130)' // indigo
]

export default function CustomizedSteppers() {
  const { settings } = useSettings()

  return (
    <Card>
      <Box
        className='border-be'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: `${settings.mode === 'dark' ? 'rgba(225, 225, 225, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}
      >
        <CardHeader title='Milestones' titleTypographyProps={{ variant: 'h4' }} />
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
        <CardContent
          sx={{
            width: '100%'
          }}
        >
          <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={props => <ColorlibStepIcon {...props} colors={colors} />}>
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
