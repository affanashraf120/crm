// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import { appraisal } from '@/utils/routes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Appraisal',
    href: appraisal,
    icon: 'ri-home-smile-line'
  },
  {
    label: 'About',
    href: '/about',
    icon: 'ri-information-line'
  }
]

export default verticalMenuData
