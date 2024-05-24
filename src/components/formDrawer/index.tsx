'use client'

// MUI Imports
import type { Breakpoint } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useMedia } from 'react-use'

// Type Imports
import type { Direction } from '@core/types'


// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Style Imports
import styles from './styles.module.css'

// Types

type SliderInputModalProps = {
  breakpoint?: Breakpoint | 'xxl' | `${number}px` | `${number}rem` | `${number}em`
  dir?: Direction
  disableDirection?: boolean
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
}

const Drawer = ({ open, setOpen, children }: SliderInputModalProps) => {
  // States
  const { settings } = useSettings()

  const handleToggle = () => {
    setOpen(false)
  }

  // Hooks

  // Vars
  let breakpointValue: SliderInputModalProps['breakpoint']

  const breakpointReached = useMedia(`(max-width: ${breakpointValue})`, false)
  const isMobileScreen = useMedia('(max-width: 600px)', false)
  const isBelowLgScreen = useMedia('(max-width: 1200px)', false)

  const ScrollWrapper = isBelowLgScreen ? 'div' : PerfectScrollbar

  
  return (
    !breakpointReached && (
      <div
        className={classnames('SliderInputModal bs-full flex flex-col', styles.SliderInputModal, {
          [styles.show]: open,
          [styles.smallScreen]: isMobileScreen
        })}
      >
        <div className={classnames('SliderInputModal-header flex items-start justify-between flex-col', styles.header)}>
          <div
            className={`flex items-center justify-center p-2 ease-in-out duration-300 transition-all rounded  ${
              settings.mode === 'dark' ? 'bg-[#3F3B59] hover:bg-[#37334C]' : 'bg-[#F0EFF0] hover:bg-[#E5E5EB]'
            }`}
          >
            {' '}
            <i className='ri-arrow-right-s-line cursor-pointer' onClick={handleToggle}></i>
          </div>
          <div className='flex gap-4'></div>
        </div>
        <ScrollWrapper
          {...(isBelowLgScreen
            ? { className: 'bs-full overflow-y-auto overflow-x-hidden' }
            : { options: { wheelPropagation: false, suppressScrollX: true } })}
        >
         {children}
        </ScrollWrapper>
      </div>
    )
  )
}

export default Drawer

