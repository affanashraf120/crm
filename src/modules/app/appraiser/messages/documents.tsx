'use client'

import React, { useState } from 'react'

import { Checkbox } from '@mui/material'

const Document = () => {
  const data = [
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
        {
          name: 'abd.docs',
          uploaded_by: 'john deo',
          last_updated: '12/1/2024 08:00 AM',
          active: false,
          size: '2.0 MB'
        },
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

  const [filters, setFilters] = useState(data)

  const handleFileCheckboxChange = (file: any, checked: boolean) => {
    setFilters(prevFilters =>
      prevFilters.map(category => ({
        ...category,
        files: category.files.map(f => (f.name === file.name ? { ...f, active: checked } : f))
      }))
    )
    console.log(file, checked)
  }

  return (
    <div className='h-[500px] overflow-y-auto xl:h-full'>
      <table className={`w-full divide-y`}>
        <thead className='border-b'>
          <tr>
            <th scope='col'>{/* Replace with your logic for "check all" */}</th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-secondary capitalize tracking-wider'
            >
              Documents
            </th>
            {/* Render additional headers if `details` is true */}
            {/* Example headers */}
            <th scope='col' className='w-40 text-left text-xs font-medium text-secondary capitalize tracking-wider'>
              Uploaded By
            </th>
            <th scope='col' className='w-40 text-left text-xs font-medium text-secondary capitalize tracking-wider'>
              File Size
            </th>
            <th scope='col' className='w-40 text-left text-xs font-medium text-secondary capitalize tracking-wider'>
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {filters.map((category, index) =>
            category.files.map((file, fileIndex) => (
              <tr key={`${index}-${fileIndex}`}>
                <td>
                  <Checkbox
                    checked={file.active}
                    onChange={event => handleFileCheckboxChange(file, event.target.checked)}
                  />
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium flex items-center'>
                    <span
                      className={`w-8 h-8 flex justify-center items-center mr-2 bg-${
                        file.name.endsWith('pdf') ? 'red' : 'blue'
                      }-700 rounded-full`}
                    >
                      <i className={`ri-file-${file.name.endsWith('pdf') ? 'pdf' : 'word'}-2-line w-4 h-4`}></i>
                    </span>
                    {file.name}
                  </div>
                </td>
                {/* Render additional details if `details` is true */}
                {/* Example details */}
                <td className='w-40 whitespace-nowrap'>
                  <div className='text-sm'>{file.uploaded_by}</div>
                </td>
                <td className='w-40 whitespace-nowrap'>
                  <div className='text-sm'>{file.size}</div>
                </td>
                <td className='w-40 whitespace-nowrap'>
                  <div className='text-sm'>{file.last_updated}</div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Show message when no files or folders found */}
      {filters.length === 0 && (
        <div className='flex justify-center items-center w-full text-center text-sm font-medium'>
          No Files or Folders Found :(
        </div>
      )}
    </div>
  )
}

export default Document
