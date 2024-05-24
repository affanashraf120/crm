// Component Imports
import HorizontalWithSubtitle from '@/components/cards/HorizontalWithSubtitle'

// Vars
const data: any[] = [
  {
    title: '24',
    subTitle: 'XYZ',
    avatarIcon: 'ri-user-3-line',
    avatarColor: 'primary'
  },
  {
    title: 165,
    subTitle: 'ABC',
    avatarIcon: 'ri-file-text-line',
    avatarColor: 'error'
  },
  {
    title: '26',
    subTitle: 'yts',
    avatarIcon: 'ri-file-check-line',
    avatarColor: 'success'
  },
  {
    title: '$876',
    subTitle: 'XYZ',
    avatarIcon: 'ri-money-dollar-circle-line',
    avatarColor: 'warning'
  }
]

const AppraisalClientCard = () => {
  return (
    <div className='grid grid-cols-12 gap-6'>
      {data.map((item, i) => (
        <div key={i} className='col-span-12 md:col-span-6 xl:col-span-3'>
          <HorizontalWithSubtitle {...item} />
        </div>
      ))}
    </div>
  )
}

export default AppraisalClientCard
