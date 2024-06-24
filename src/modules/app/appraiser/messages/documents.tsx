import React from 'react'

import Folder from '@/modules/app/appraiser/documents/Folder'

const Document = () => {
  return <Folder filters={filters} />
}

export default Document

const filters = [
  {
    label: 'Email Documents',
    files: [
      { name: 'abd.pdf', uploaded_by: 'john deo', last_updated: '12/1/2024 20:00 AM', active: false, size: '1.2 MB' },
      { name: 'xyz.docs', uploaded_by: 'jane doe', last_updated: '12/2/2024 21:00 AM', active: false, size: '2.3 MB' }
    ],
    select: false
  },
  {
    label: 'Invoice',
    files: [
      {
        name: 'meeting1.docs',
        uploaded_by: 'alice smith',
        last_updated: '12/3/2024 01:00 AM',
        active: false,
        size: '1.8 MB'
      },
      {
        name: 'meeting2.pdf',
        uploaded_by: 'bob johnson',
        last_updated: '12/4/2024 03:00 AM',
        active: false,
        size: '3.2 MB'
      },
      {
        name: 'meeting1.docs',
        uploaded_by: 'alice smith',
        last_updated: '12/3/2024 07:00 AM',
        active: false,
        size: '1.8 MB'
      },
      {
        name: 'meeting2.pdf',
        uploaded_by: 'bob johnson',
        last_updated: '12/4/2024 09:00 AM',
        active: false,
        size: '3.2 MB'
      },
      {
        name: 'meeting1.docs',
        uploaded_by: 'alice smith',
        last_updated: '12/3/2024 10:00 AM',
        active: false,
        size: '1.8 MB'
      },
      {
        name: 'meeting2.pdf',
        uploaded_by: 'bob johnson',
        last_updated: '12/4/2024 12:00 AM',
        active: false,
        size: '3.2 MB'
      }
    ],
    select: false
  },
  {
    label: 'Job Paperwork',
    files: [
      { name: 'abd.docs', uploaded_by: 'john deo', last_updated: '12/1/2024 08:00 AM', active: false, size: '2.0 MB' },
      { name: 'xyz.pdf', uploaded_by: 'jane doe', last_updated: '12/2/2024 09:00 AM', active: false, size: '1.5 MB' }
    ],
    select: false
  },
  {
    label: 'Roof Report',
    files: [
      {
        name: 'meeting1.pdf',
        uploaded_by: 'alice smith',
        last_updated: '12/3/2024 11:00 AM',
        active: false,
        size: '2.7 MB'
      },
      {
        name: 'meeting2.pdf',
        uploaded_by: 'bob johnson',
        last_updated: '12/4/2024 11:00 AM',
        active: false,
        size: '3.1 MB'
      }
    ],
    select: false
  },
  {
    label: 'other',
    files: [
      {
        name: 'meeting1.pdf',
        uploaded_by: 'alice smith',
        last_updated: '12/3/2024 14:00 AM',
        active: false,
        size: '2.7 MB'
      },
      {
        name: 'meeting2.pdf',
        uploaded_by: 'bob johnson',
        last_updated: '12/4/2024 11:00 AM',
        active: false,
        size: '3.1 MB'
      }
    ],
    select: false
  }
]
