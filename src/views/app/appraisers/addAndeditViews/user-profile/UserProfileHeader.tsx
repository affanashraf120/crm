'use client'

// MUI Imports
import Typography from '@mui/material/Typography'

// Type Imports

const UserProfileHeader = () => {
  return (
    <div className='flex'>
        <div className='flex rounded-bs-md border-[5px] border-backgroundPaper bg-backgroundPaper'>
          <img height={30} width={30} src='/images/avatars/1.png' className='rounded' alt='Profile Background' />
        </div>
        <div className='flex is-full flex-wrap justify-center flex-col items-center sm:flex-row sm:justify-between sm:items-end gap-3 '>
          <div className='flex flex-col items-center sm:items-start gap-1'>
            <Typography variant='h5'>john deo</Typography>
            <div className='flex flex-wrap gap-3 justify-center sm:justify-normal'>
              <div className='flex items-center gap-2'>
                <i className='ri-map-pin-2-line text-textSecondary w-4 h-4' />
                <Typography className='font-medium' variant='body2'>4000 Silk Vine Count Roaoke, 1X 76768 </Typography>
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default UserProfileHeader
