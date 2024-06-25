import { Chip, Typography } from '@mui/material'


const Adjuster = ({props}:any) => {
  return (
    <div className='space-y-3'>
      {props?.map((detail: any, index: any) => (
        <div key={index} className='flex items-center'>
          {detail.icon && <i className={`${detail.icon} mr-2 w-4 h-4`}></i>}
          <Typography variant='body1'>
            <strong>{detail.label}:</strong>{' '}
            {detail.isEmail ? (
              <a href={`mailto:${detail.value}`} className='text-blue-500'>
                {detail.value}
              </a>
            ) : detail.status ? (
              <Chip label={detail.value} color='primary' />
            ) : (
              <>{detail.value}</>
            )}
          </Typography>
        </div>
      ))}
    </div>
  )
}

export default Adjuster
