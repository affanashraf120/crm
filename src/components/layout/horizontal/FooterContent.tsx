'use client'

// Next Imports

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
// import { useSettings } from '@core/hooks/useSettings'
// import useHorizontalNav from '@menu/hooks/useHorizontalNav'
// import useVerticalNav from '@menu/hooks/useVerticalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  // const { settings } = useSettings()
  // const { isBreakpointReached: isVerticalBreakpointReached } = useVerticalNav()
  // const { isBreakpointReached: isHorizontalBreakpointReached } = useHorizontalNav()

  // Vars
  // const isBreakpointReached =
  //   settings.layout === 'vertical' ? isVerticalBreakpointReached : isHorizontalBreakpointReached

  return (
    <div
      className={classnames(horizontalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      {/* <p>
        <span>{`© ${new Date().getFullYear()}, Made with `}</span>
        <span>{`❤️`}</span>
        <span>{` by `}</span>
        <Link href='#'  className='text-primary'>
          CRM-Property claim
        </Link>
      </p> */}
      {/* {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <Link href='https://themeselection.com/license' target='_blank' className='text-primary'>
            License
          </Link>
          <Link href='https://themeselection.com' target='_blank' className='text-primary'>
            More Themes
          </Link>
          <Link
            href='https://demos.themeselection.com/materio-mui-nextjs-admin-template/documentation'
            target='_blank'
            className='text-primary'
          >
            Documentation
          </Link>
          <Link href='https://themeselection.com/support' target='_blank' className='text-primary'>
            Support
          </Link>
        </div>
      )} */}
    </div>
  )
}

export default FooterContent
