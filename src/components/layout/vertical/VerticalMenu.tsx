'use client'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Imports Routes
import { appraisal, clients, estimates, invoice, supplement } from '@/configs/routes'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { isBreakpointReached } = useVerticalNav()
  const { settings } = useSettings()

  // Vars
  const { transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 10 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href='/dashboard' icon={<i className='ri-home-smile-line' />}>
          Dashboard
        </MenuItem>

        <SubMenu
          label='Clients'
          icon={<i className='ri-parent-line' />}

          // suffix={<Chip label='3' size='small' color='error' />}
        >
          <MenuItem href={clients}>List</MenuItem>
          <MenuItem href={appraisal}>Appraisals</MenuItem>
          <MenuItem href={estimates}>Estimates</MenuItem>
          <MenuItem href={supplement}>Supplements</MenuItem>
          <MenuItem href={invoice}>Invoices</MenuItem>
        </SubMenu>
        <MenuItem href='/opposing-appraisal' icon={<i className='ri-bubble-chart-line' />}>
          Opposing Appraiser
        </MenuItem>
        <MenuItem
          href='/umpire'
          icon={
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M11.314 15.5a6.5 6.5 0 0 1 .708-1.5h-6.77a2.25 2.25 0 0 0-2.248 2.249v.578c0 .892.318 1.756.898 2.435c1.566 1.834 3.952 2.74 7.098 2.74q.9 0 1.717-.1a6.5 6.5 0 0 1-.994-1.42q-.351.02-.723.02c-2.738 0-4.704-.747-5.957-2.214a2.25 2.25 0 0 1-.54-1.462v-.577a.75.75 0 0 1 .75-.75zM11 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M23 17.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0m-9.5 0a4 4 0 1 0 8 0a4 4 0 0 0-8 0m5-2a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-.25 2.5a.75.75 0 0 0-1.5 0v1.75a.75.75 0 0 0 1.5 0z'
              />
            </svg>
          }
        >
          Umpire Info
        </MenuItem>
        {/* todo add libraries for icon */}
        <MenuItem
          href='/adjuster'
          icon={
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 14 14'>
              <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M9.901 4.317v1.364M9.9 2.662a.124.124 0 0 1-.124-.125c0-.07.056-.125.124-.125m.002.25a.125.125 0 0 0 .124-.125a.124.124 0 0 0-.124-.125M.857 12.864h12.007M1.989 6.829a1.939 1.939 0 1 0 3.878 0a1.939 1.939 0 1 0-3.878 0' />
                <path d='M.855 12.865v-1.024a3.072 3.072 0 1 1 6.145 0v1.024m.394-6.149A3.554 3.554 0 1 0 6.33 4' />
              </g>
            </svg>
          }
        >
          Adjuster Info
        </MenuItem>
        <MenuItem href='/users' icon={<i className='ri-team-line' />}>
          Users
        </MenuItem>
        <MenuItem href='/insurance-company' icon={<i className='ri-building-line' />}>
          Insurance Company
        </MenuItem>

        <MenuItem href='/contact' icon={<i className='ri-contacts-book-3-line' />}>
          Contact
        </MenuItem>
        <MenuItem href='/about' icon={<i className='ri-information-line' />}>
          About
        </MenuItem>
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 10 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary, params)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
