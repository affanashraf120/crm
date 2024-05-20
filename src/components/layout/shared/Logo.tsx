// React Imports
import { useEffect, useRef } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports

// Type Imports

// Component Imports
import BlackLogo from '@core/svg/Logo'
import TextWhiteLogo from '@core/svg/TexrWhiteLogo'
import LogoWhite from '@/@core/svg/WhiteLogo'

// Config Imports

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'
import TextBlackLogo from '@/@core/svg/TexrBlackLogo'

// Util Imports

const Logo = () => {
  // Refs
  const logoTextRef = useRef<HTMLSpanElement>(null)

  // Hooks
  const { isHovered, isCollapsed } = useVerticalNav()
  const { settings } = useSettings()

  // Vars
  const { layout } = settings

  useEffect(() => {
    if (layout === 'horizontal' || !isCollapsed) {
      return
    }

    if (logoTextRef && logoTextRef.current) {
      if (isCollapsed && !isHovered) {
        logoTextRef.current?.classList.add('hidden')
      } else {
        logoTextRef.current.classList.remove('hidden')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, isCollapsed])

  // You may return any JSX here to display a logo in the sidebar header
  // return <Img src='/next.svg' width={100} height={25} alt='logo' /> // for example
  return (
    <Link href='/' className='flex items-center min-bs-[24px]'>
      {settings.mode === 'dark' ? (
        <>
          <LogoWhite className='text-[18px] text-primary w-10 h-10' />
          <TextWhiteLogo className='w-32 h-full ms-2' />
        </>
      ) : (
        <>
          <BlackLogo className='text-[18px] text-primary w-10 h-10' />
          <TextBlackLogo className='w-32 h-full ms-2' />
        </>
      )}
    </Link>
  )
}

export default Logo
