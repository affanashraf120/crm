// import { useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Checkbox } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import DropDownButton from '@/components/dropDowns/dropDownButton'

const Folder = () => {
  const folder = [
    {
      label: 'Email Documentations',
      files: [
        { name: 'abd.pdf', uploaded_by: 'john deo', last_updated: '12/1/2024', active: false },
        { name: 'xyz.pdf', uploaded_by: 'jane doe', last_updated: '12/2/2024', active: false }
      ],
      select: false
    },
    {
      label: 'Meeting Notes',
      files: [
        { name: 'meeting1.pdf', uploaded_by: 'alice smith', last_updated: '12/3/2024', active: false },
        { name: 'meeting2.pdf', uploaded_by: 'bob johnson', last_updated: '12/4/2024', active: false }
      ],
      select: false
    }
  ]

  return (
    <div className='w-full'>
      <div className='flex justify-start items-center gap-2 flex-wrap pb-2'>
        <div>
          <Checkbox />
          <label>Select All</label>
        </div>
        <div>
          {/* <Checkbox checked={details} onChange={() => setDetails(!details)} /> */}
          {/* <label>{details ? 'Details' : 'Details'}</label> */}
        </div>
        {/* {selectedImages.length > 0 && (
          <DropDownButton
            label='Action '
            menuOptions={[
              { label: 'Move to Another Album', icon: 'ri-arrow-go-back-fill' },
              { label: 'Copy to Another Album', icon: 'ri-file-copy-line' },
              { label: 'Share', icon: 'ri-share-line' },
              { label: 'Download', icon: 'ri-download-cloud-2-line' },
              { label: 'Delete', icon: 'ri-delete-bin-6-line' }
            ]}
            onMenuItemClick={item => console.log(item)}
          />
        )} */}
      </div>

      <div className='h-[500px] overflow-y-auto'>
        {folder.map((item, index) => (
          <Accordion key={index}>
            <div className='flex justify-start items-start md:items-center flex-col md:flex-row px-7'>
              <i className='ri-folder-open-line'></i>
              <div className='w-full pl-0'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ p: 1 }}>
                  {item.label}
                </AccordionSummary>
              </div>
            </div>
            <AccordionDetails>
              <div className='overflow-x-auto'>
                <table className='w-full divide-y '>
                  <thead className='border-b'>
                    <tr>
                      <div className='flex justify-between items-center w-full'>
                        <div>
                          <th scope='col' className=''>
                            <Checkbox checked={item.select} />
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider'
                          >
                            Name
                          </th>
                        </div>
                        <div>
                          <th
                            scope='col'
                            className='w-32 text-left text-xs font-medium text-secondary uppercase tracking-wider'
                          >
                            Uploaded By
                          </th>
                          <th
                            scope='col'
                            className='w-32 text-left text-xs font-medium text-secondary uppercase tracking-wider'
                          >
                            Last Updated
                          </th>
                          <th
                            scope='col'
                            className='w-32 text-left text-xs font-medium text-secondary uppercase tracking-wider'
                          >
                            Actions
                          </th>
                        </div>
                      </div>
                    </tr>
                  </thead>
                  <tbody className=''>
                    {item.files.map((file, index) => (
                      <tr key={index}>
                        <div className='flex justify-between items-center w-full border rounded hover:bg-white/10 duration-500 ease-in-out transition-all mb-2'>
                          <div>
                            <td>
                              <Checkbox checked={file.active || false} />
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-sm font-medium '>{file.name}</div>
                            </td>
                          </div>
                          <div>
                            <td className='w-32 whitespace-nowrap'>
                              <div className='text-sm '>{file.uploaded_by}</div>
                            </td>
                            <td className='w-32 whitespace-nowrap'>
                              <div className='text-sm '>{file.last_updated}</div>
                            </td>
                            <td className='w-32 ml-10 whitespace-nowrap  text-sm font-medium'>
                              <DropDownButton
                                onMenuItemClick={item => console.log(item)}
                                buttonLabel='ri-more-2-fill rotate-180 w-4 h-4 cursor-pointer'
                                menuOptions={[{ label: 'Delete' }, { label: 'Move' }]}
                              />
                            </td>
                          </div>
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  )
}

export default Folder
