import { useState, useEffect } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Checkbox, IconButton, TextField } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import DropDownButton from '@/components/dropDowns/dropDownButton'

interface File {
  name: string
  uploaded_by: string
  last_updated: string
  active: boolean
  size: string
}

interface Folder {
  label: string
  files: File[]
  select: boolean
  isEditing: boolean
}

const FolderComponent = ({ filters }: any) => {
  const [fileView, setFileView] = useState(false)
  const [cardView, setCardView] = useState(false)
  const [details, setDetails] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const [folders, setFolders] = useState<Folder[]>(filters)

  useEffect(() => {
    setFolders(filters)
  }, [filters])

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    setFolders(
      folders.map(folder => ({
        ...folder,
        select: isChecked,
        files: folder.files.map(file => ({ ...file, active: isChecked }))
      }))
    )
  }

  const handleFolderSelect = (folderIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    setFolders(
      folders.map((folder, i) =>
        i === folderIndex
          ? {
              ...folder,
              select: isChecked,
              files: folder.files.map(file => ({ ...file, active: isChecked }))
            }
          : folder
      )
    )
  }

  const handleFileSelect = (folderIndex: number, fileIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    setFolders(
      folders.map((folder, i) => {
        if (i === folderIndex) {
          const updatedFiles = folder.files.map((file, j) => (j === fileIndex ? { ...file, active: isChecked } : file))
          const folderSelect = updatedFiles.every(file => file.active)

          return {
            ...folder,
            select: folderSelect,
            files: updatedFiles
          }
        }

        return folder
      })
    )
  }

  const handleFlatViewToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileView(event.target.checked)
  }

  const handleInputChange = (folderIndex: number, event: any) => {
    const newLabel = event.target.value

    setFolders(
      folders.map((folder, i) =>
        i === folderIndex
          ? {
              ...folder,
              label: newLabel
            }
          : folder
      )
    )
  }

  const handleEditClick = (folderIndex: number) => {
    setFolders(
      folders.map((folder, i) =>
        i === folderIndex
          ? {
              ...folder,
              isEditing: true
            }
          : folder
      )
    )
  }

  const handleSaveClick = (folderIndex: number) => {
    setFolders(
      folders.map((folder, i) =>
        i === folderIndex
          ? {
              ...folder,
              isEditing: false
            }
          : folder
      )
    )
  }

  const allFiles = folders.flatMap(folder => folder.files)

  // Todo if any check box is active the display
  const anyFileSelected = allFiles.some(file => file.active)
  const allFoldersSelected = folders.length > 0 && folders.every(folder => folder.select)

  return (
    <div className='w-full'>
      <div className='flex justify-start items-center gap-2 flex-wrap pb-2'>
        <div>
          <Checkbox checked={allFoldersSelected} onChange={handleSelectAll} />
          <label>{allFoldersSelected ? 'Deselect All' : 'Select All'}</label>
        </div>
        <div>
          <Checkbox checked={fileView} onChange={handleFlatViewToggle} />
          <label>Document List</label>
        </div>

        <div>
          <Checkbox checked={cardView} onChange={() => setCardView(!cardView)} />
          <label>Card View</label>
        </div>

        <div>
          <Checkbox checked={details} onChange={() => setDetails(!details)} />
          <label>Details</label>
        </div>

        {anyFileSelected && (
          <DropDownButton
            label='Action'
            menuOptions={[
              { label: 'Settings', icon: 'ri-settings-3-fill w-4 h-4' },
              { label: 'Change Folder', icon: 'ri-arrow-go-back-fill w-4 h-4' },
              { label: 'Duplicate', icon: 'ri-file-copy-line w-4 h-4' },
              { label: 'View Document', icon: 'ri-external-link-line w-4 h-4' },
              { label: 'Download', icon: 'ri-download-cloud-2-line w-4 h-4' }
            ]}
            onMenuItemClick={item => console.log(item)}
          />
        )}
      </div>

      {fileView ? (
        <div className='h-[500px] overflow-y-auto'>
          <div className={`${cardView ? 'hidden' : 'hidden md:flex'}  `}>
            <table className={`${cardView ? '' : ' w-full divide-y'} `}>
              <thead className='border-b'>
                <tr>
                  <div className='flex justify-between items-center w-full'>
                    <div>
                      <th scope='col' className=''>
                        <Checkbox
                          checked={allFiles.every(file => file.active)}
                          onChange={event => {
                            const isChecked = event.target.checked

                            setFolders(
                              folders.map(folder => ({
                                ...folder,
                                files: folder.files.map(file => ({ ...file, active: isChecked }))
                              }))
                            )
                          }}
                        />{' '}
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider'
                      >
                        File Name
                      </th>
                    </div>
                    <div>
                      <th
                        scope='col'
                        className='w-32 text-left text-xs font-medium text-secondary uppercase tracking-wider'
                      >
                        Uploaded By
                      </th>
                      {details && (
                        <th
                          scope='col'
                          className='w-32 text-left text-xs font-medium text-secondary uppercase tracking-wider'
                        >
                          File Size
                        </th>
                      )}

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
                {allFiles.map((file, fileIndex) => (
                  <tr key={fileIndex}>
                    <div className='flex justify-between items-center w-full border rounded hover:bg-white/10 duration-500 ease-in-out transition-all mb-2'>
                      <div>
                        <span>
                          <Checkbox
                            checked={file.active}
                            onChange={event => {
                              const isChecked = event.target.checked

                              setFolders(
                                folders.map(folder => ({
                                  ...folder,
                                  files: folder.files.map(f => (f.name === file.name ? { ...f, active: isChecked } : f))
                                }))
                              )
                            }}
                          />
                        </span>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium flex justify-center items-center'>
                            {file?.name?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
                              <span className='w-8 h-8 flex justify-center items-center mr-2 bg-red-700 rounded-full'>
                                <i className='ri-file-pdf-2-line w-4 h-4'></i>
                              </span>
                            ) : (
                              <span className='w-8 h-8 flex justify-center items-center mr-2 bg-blue-700 rounded-full'>
                                <i className='ri-file-word-2-line w-4 h-4'></i>
                              </span>
                            )}
                            {file.name}
                          </div>
                        </td>
                      </div>
                      <div>
                        {details && (
                          <td className='w-32 whitespace-nowrap'>
                            <div className='text-sm '>{file.size}</div>
                          </td>
                        )}
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
                            menuOptions={[
                              { label: 'Send as Message', icon: 'ri-message-3-line w-4 h-4' },
                              { label: 'Move to Another Folder', icon: 'ri-arrow-go-back-fill w-4 h-4' },
                              { label: 'Copy to Another Album', icon: 'ri-file-copy-line w-4 h-4' },
                              { label: 'Download', icon: 'ri-download-cloud-2-line w-4 h-4' },
                              { label: 'Delete', icon: 'ri-delete-bin-6-line w-4 h-4' }
                            ]}
                          />
                        </td>
                      </div>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`${cardView ? '' : 'md:hidden'} flex flex-wrap w-full gap-2`}>
            {allFiles &&
              allFiles.map((file, fileIndex) => (
                <span key={fileIndex}>
                  <div className='border rounded hover:bg-white/10 duration-500 ease-in-out transition-all mb-2 p-2 min-w-[225px] '>
                    <div className='flex justify-between items-start flex-col gap-2 '>
                      <Checkbox
                        checked={file.active}
                        onChange={event => {
                          const isChecked = event.target.checked

                          setFolders(
                            folders.map(folder => ({
                              ...folder,
                              files: folder.files.map(f => (f.name === file.name ? { ...f, active: isChecked } : f))
                            }))
                          )
                        }}
                      />
                      <div className='ml-2 flex'>
                        {file?.name?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
                          <span className='w-8 h-8 flex justify-center items-center mr-2 bg-red-700 rounded-full'>
                            <i className='ri-file-pdf-2-line w-4 h-4'></i>
                          </span>
                        ) : (
                          <span className='w-8 h-8 flex justify-center items-center mr-2 bg-blue-700 rounded-full'>
                            <i className='ri-file-word-2-line w-4 h-4'></i>
                          </span>
                        )}
                        <div className='text-sm font-medium'>{file.name}</div>
                      </div>
                      <div className='flex justify-between items-center w-full px-2'>
                        <div className='flex flex-col'>
                          {details && <div className='text-xs'>{file.size}</div>}
                          <div className='text-xs'>{file.uploaded_by}</div>
                          <div className='text-xs'>{file.last_updated}</div>
                        </div>
                        <DropDownButton
                          onMenuItemClick={item => console.log(item)}
                          buttonLabel='ri-more-2-fill rotate-180 w-4 h-4 cursor-pointer'
                          menuOptions={[
                            { label: 'Send as Message', icon: 'ri-message-3-line w-4 h-4' },
                            { label: 'Move to Another Folder', icon: 'ri-arrow-go-back-fill w-4 h-4' },
                            { label: 'Copy to Another Album', icon: 'ri-file-copy-line w-4 h-4' },
                            { label: 'Download', icon: 'ri-download-cloud-2-line w-4 h-4' },
                            { label: 'Delete', icon: 'ri-delete-bin-6-line w-4 h-4' }
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </span>
              ))}

            {allFiles.length === 0 && <tr className='text-center text-sm font-medium'>No Files Found</tr>}
          </div>
          {allFiles.length === 0 && folders.length === 0 && (
            <div className='flex justify-center items-center w-full text-center text-sm font-medium'>
              No Files or Folders Found :(
            </div>
          )}
        </div>
      ) : (
        <div className='h-[500px] overflow-y-auto'>
          {folders.map((folder, folderIndex) => (
            <Accordion
              key={folderIndex}
              onChange={(e, expanded) => {
                if (expanded) {
                  setIsHovered(true)
                } else if (!expanded) {
                  setIsHovered(false)
                }
              }}
              className={` mb-2 duration-500 transition-all ease-in-out border rounded ${
                !isHovered && 'hover:bg-[#f5f5f5]/10'
              }`}
            >
              <div className='flex justify-start items-center  px-7 whitespace-nowrap'>
                <i className='ri-folder-open-line'></i>
                <div className='w-full pl-0'>
                  <AccordionSummary
                    expandIcon={
                      <IconButton>
                        <ExpandMoreIcon />
                      </IconButton>
                    }
                    sx={{ p: 1 }}
                  >
                    {folder.isEditing ? (
                      <TextField
                        variant='standard'
                        InputProps={{
                          disableUnderline: true
                        }}
                        sx={{ marginTop: 2 }}
                        value={folder.label}
                        onChange={event => handleInputChange(folderIndex, event)}
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}
                      />
                    ) : (
                      <span className='mt-2'>{folder.label}</span>
                    )}
                    <IconButton
                      onClick={event => {
                        event.stopPropagation()
                        folder.isEditing ? handleSaveClick(folderIndex) : handleEditClick(folderIndex)
                      }}
                    >
                      {folder.isEditing ? (
                        <i className='ri-telegram-line '></i>
                      ) : (
                        <i className='ri-edit-2-line w-4 h-4'></i>
                      )}
                    </IconButton>{' '}
                    <span className='mt-2'>({folder.files.length})</span>
                  </AccordionSummary>
                </div>
              </div>
              <AccordionDetails>
                {/* Laptop View */}
                <div className={`${cardView ? 'hidden' : 'hidden md:flex'}  `}>
                  <table className='w-full divide-y '>
                    <thead className='border-b '>
                      <tr>
                        <div className='flex justify-between items-center w-full'>
                          <div>
                            <th scope='col' className=''>
                              <Checkbox
                                checked={folder.select}
                                onChange={event => handleFolderSelect(folderIndex, event)}
                              />{' '}
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider'
                            >
                              Name
                            </th>
                          </div>
                          <div>
                            {details && (
                              <th
                                scope='col'
                                className='w-32 text-left text-xs font-medium text-secondary uppercase tracking-wider'
                              >
                                File Size
                              </th>
                            )}
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
                      {folder &&
                        folder.files.map((file, fileIndex) => (
                          <tr key={fileIndex}>
                            <div className='flex justify-between items-center w-full border rounded hover:bg-white/10 duration-500 ease-in-out transition-all mb-2'>
                              <div>
                                <td>
                                  <Checkbox
                                    checked={file.active}
                                    onChange={event => handleFileSelect(folderIndex, fileIndex, event)}
                                  />{' '}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap '>
                                  <div className='text-sm font-medium flex justify-center items-center'>
                                    {file?.name?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
                                      <span className='w-8 h-8 flex justify-center items-center mr-2 bg-red-700 rounded-full'>
                                        <i className='ri-file-pdf-2-line w-4 h-4'></i>
                                      </span>
                                    ) : (
                                      <span className='w-8 h-8 flex justify-center items-center mr-2 bg-blue-700 rounded-full'>
                                        <i className='ri-file-word-2-line w-4 h-4'></i>
                                      </span>
                                    )}
                                    dis
                                    {file.name}
                                  </div>
                                </td>
                              </div>
                              <div>
                                {details && (
                                  <td className='w-32 whitespace-nowrap'>
                                    <div className='text-sm '>{file.size}</div>
                                  </td>
                                )}
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
                                    menuOptions={[
                                      { label: 'Send as Message', icon: 'ri-message-3-line w-4 h-4' },
                                      { label: 'Move to Another Folder', icon: 'ri-arrow-go-back-fill w-4 h-4' },
                                      { label: 'Copy to Another Album', icon: 'ri-file-copy-line w-4 h-4' },
                                      { label: 'Download', icon: 'ri-download-cloud-2-line w-4 h-4' },
                                      { label: 'Delete', icon: 'ri-delete-bin-6-line w-4 h-4' }
                                    ]}
                                  />
                                </td>
                              </div>
                            </div>
                          </tr>
                        ))}

                      {folder.files.length === 0 && <tr className='text-center text-sm font-medium'>No Files Found</tr>}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className={`${cardView ? '' : 'md:hidden'} flex flex-wrap w-full gap-2`}>
                  {folder &&
                    folder.files.map((file, fileIndex) => (
                      <span key={fileIndex}>
                        <div className='border rounded hover:bg-white/10 duration-500 ease-in-out transition-all mb-2 p-2 w-[220px] md:min-w-[300px] '>
                          <div className='flex justify-between items-start flex-col gap-2 '>
                            <Checkbox
                              checked={file.active}
                              onChange={event => handleFileSelect(folderIndex, fileIndex, event)}
                            />
                            <div className='ml-2 flex'>
                              {file?.name?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
                                <span className='w-8 h-8 flex justify-center items-center mr-2 bg-red-700 rounded-full'>
                                  <i className='ri-file-pdf-2-line w-4 h-4'></i>
                                </span>
                              ) : (
                                <span className='w-8 h-8 flex justify-center items-center mr-2 bg-blue-700 rounded-full'>
                                  <i className='ri-file-word-2-line w-4 h-4'></i>
                                </span>
                              )}
                              <div className='text-sm font-medium'>{file.name}</div>
                            </div>
                            <div className='flex justify-between items-center w-full px-2'>
                              <div className='flex flex-col'>
                                <div className='text-xs flex  gap-1'>
                                  <span className='hidden md:inline-block text-left text-xs font-medium text-secondary uppercase tracking-wider'>
                                    Uploaded By:{' '}
                                  </span>
                                  {file.uploaded_by}
                                </div>
                                <div className='text-xs flex  gap-1'>
                                  <span className='hidden md:inline-block text-left text-xs font-medium text-secondary uppercase tracking-wider'>
                                    Last Updated:{' '}
                                  </span>

                                  {file.last_updated}
                                </div>
                                {details && (
                                  <div className='text-xs flex  gap-1'>
                                    <span className='hidden md:inline-block text-left text-xs font-medium text-secondary uppercase tracking-wider'>
                                      File Size:{' '}
                                    </span>

                                    {file.size}
                                  </div>
                                )}
                              </div>
                              <DropDownButton
                                onMenuItemClick={item => console.log(item)}
                                buttonLabel='ri-more-2-fill rotate-180 w-4 h-4 cursor-pointer'
                                menuOptions={[
                                  { label: 'Send as Message', icon: 'ri-message-3-line w-4 h-4' },
                                  { label: 'Move to Another Folder', icon: 'ri-arrow-go-back-fill w-4 h-4' },
                                  { label: 'Copy to Another Album', icon: 'ri-file-copy-line w-4 h-4' },
                                  { label: 'Download', icon: 'ri-download-cloud-2-line w-4 h-4' },
                                  { label: 'Delete', icon: 'ri-delete-bin-6-line w-4 h-4' }
                                ]}
                              />
                            </div>
                          </div>
                        </div>
                      </span>
                    ))}

                  {folder.files.length === 0 && <tr className='text-center text-sm font-medium'>No Files Found</tr>}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
          {folders.length < 1 && (
            <div className='flex justify-center items-center w-full text-center text-sm font-medium'>
              No Files or Folders Found :(
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FolderComponent
