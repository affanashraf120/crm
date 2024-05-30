'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Type Imports

const UserProfileHeader = () => {
  return (
    <Card>
      <CardContent className='flex gap-6 justify-center flex-col items-center md:items-end md:flex-row  md:justify-start'>
        <div className='flex rounded-bs-md border-[5px] border-backgroundPaper bg-backgroundPaper'>
          <img height={80} width={80} src='/images/avatars/1.png' className='rounded' alt='Profile Background' />
        </div>
        <div className='flex is-full flex-wrap justify-center flex-col items-center sm:flex-row sm:justify-between sm:items-end gap-5 py-1'>
          <div className='flex flex-col items-center sm:items-start gap-2'>
            <Typography variant='h4'>john deo</Typography>
            <div className='flex flex-wrap gap-6 justify-center sm:justify-normal'>
              <div className='flex items-center gap-2'>
                <i className='ri-map-pin-2-line text-textSecondary' />
                <Typography className='font-medium'>4000 Silk Vine Count Roaoke, 1X 76768 </Typography>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
