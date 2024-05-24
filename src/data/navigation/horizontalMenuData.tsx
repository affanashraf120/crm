// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'
import { appraisal } from '@/configs/routes'

const horizontalMenuData = (): HorizontalMenuDataType[] => [
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

export default horizontalMenuData
