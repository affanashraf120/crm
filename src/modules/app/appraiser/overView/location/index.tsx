import { Chip, Typography } from '@mui/material'

const Location = ({ props }: any) => {
  return (
    <div className='flex w-full justify-between flex-wrap ga-2'>
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
      <img src="https://my.acculynx.com/store/companies/cb92c6ba-6121-4927-a702-e69d7c9dffcd/jobs/7c15e709-67f3-4ca8-8b24-b43a9121afdd/attachments/43cd5a44-403c-48f4-b0d8-04e8a813dfa8/123_205bb7e1-d0ee-4653-bcf2-5bb4531005a0.jpg/w_150,h_150,t_fit/" alt="" className='w-44 h-32 rounded'/>
    </div>
  )
}

export default Location
