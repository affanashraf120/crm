// Component Imports
import HorizontalWithSubtitle from './HorizontalWithSubtitle'

interface DataItem {
  title: string
  subTitle: string
  avatarIcon: string
  avatarColor: string
}

// Define the Props interface for the SummaryDetailCard component
interface Props {
  data: DataItem[]
  classes?: string
}

const SummaryDetailCard: React.FC<Props> = ({ data, classes }) => {
  return (
    <div className='grid grid-cols-12 gap-6'>
      {data.map((item: any, i: any) => (
        <div key={i} className={`col-span-12 md:col-span-6 xl:col-span-3 ${classes}`}>
          <HorizontalWithSubtitle {...item} />
        </div>
      ))}
    </div>
  )
}

export default SummaryDetailCard
