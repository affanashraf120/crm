'us client'

import { useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { Avatar, Button, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'

import FormDialog from '@/components/dialogBox/formDialog'
import MultiSelectDropdown from '@/components/dropDowns/multifiltercheckbox'
import Drawer from '@/components/formDrawer'
import TabsList from '@/components/tabsList'
import { tags, topic, visibility } from '@/data/data'
import Document from './documents'
import Pictures from './photos'
import Upload from './upoadContent'

const Chat = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [input, setInput] = useState('')
  const [isReply, setIsReply] = useState(false)
  const [open, setOpen] = useState(false)
  const [viewMore, setViewMore] = useState(false)
  const [openAttach, setOpenAttach] = useState(false)

  console.log('🚀 ~ selectedFilters:', selectedFilters)

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value)
  }

  const handleFoldersFilter = (item: any) => {
    setSelectedFilters(item)
  }

  const handleReply = () => {
    setIsReply(!isReply)
  }

  const handleInput = (event: any) => {
    setInput(event.target.value)
  }

  return (
    <div className='flex w-full gap-2 flex-col-reverse sm:flex-row'>
      <div className='w-full sm:w-[75%] space-y-2'>
        <div className='flex justify-start items-center gap-2 flex-wrap  border p-2 w-full rounded'>
          <TextField
            minRows={3}
            multiline
            fullWidth
            placeholder='Create a New Comment...'
            onChange={handleInput}
            value={input}
          />

          <div className='flex justify-between items-center gap-2 flex-wrap w-full'>
            <div className='flex justify-between items-center gap-1 flex-wrap'>
              <Tooltip title='Attach'>
                <IconButton onClick={() => setOpenAttach(!openAttach)}>
                  <i className='ri-attachment-2 w-5 h-5'></i>
                </IconButton>
              </Tooltip>
              <MultiSelectDropdown
                icon='ri-price-tag-3-line  w-5 h-5 cursor-pointer'
                onselect={e => console.log(e)}
                type='button-filter-dropdown'
                toolTip='Notify'
                options={tags}
                name='Tags'
              />
              <MultiSelectDropdown
                icon='ri-lightbulb-line w-5 h-5 cursor-pointer'
                onselect={e => console.log(e)}
                type='button-filter-dropdown'
                toolTip='Topic'
                options={topic}
                name='Topic'
              />

              <MultiSelectDropdown
                icon='ri-organization-chart w-5 h-5 cursor-pointer'
                onselect={e => console.log(e)}
                type='button-filter-dropdown'
                toolTip='Viewable'
                options={visibility}
                name='Visibility'
              />
            </div>
            <Button variant='contained' size='small'>
              Post
            </Button>
          </div>
        </div>

        {/* Message Component */}
        <div className='flex justify-start items-center gap-2 flex-wrap  border p-3 w-full rounded'>
          <p className='text-xs py-1'>You replied 7 days ago</p>
          {/* First message */}
          <div className='flex items-start justify-start gap-2 flex-wrap md:flex-nowrap'>
            <Avatar src='/images/avatars/1.png' />
            <div className='flex md:flex-col gap-6 flex-wrap'>
              <Message />
              {/* Button to Show more message */}

              {!viewMore && (
                <div className='flex items-start justify-start pl-4 md:ml-5 flex-wrap md:flex-nowrap '>
                  <Button
                    variant='contained'
                    size='small'
                    sx={{
                      marginTop: '10px'
                    }}
                    endIcon={<i className='ri-arrow-down-s-line w-5 h-5'></i>}
                    onClick={() => setViewMore(!viewMore)}
                  >
                    View 3 more replies
                  </Button>
                </div>
              )}

              {viewMore && (
                <>
                  <div className='flex items-start justify-start pl-4 md:ml-5 flex-wrap md:flex-nowrap border-l-2'>
                    <Avatar src='/images/avatars/1.png' />
                    <Message />
                  </div>
                  <div className='flex items-start justify-start pl-4 md:ml-5 flex-wrap md:flex-nowrap border-l-2'>
                    <Avatar src='/images/avatars/1.png' />
                    <Message />
                  </div>
                  <div className='flex items-start justify-start pl-4 md:ml-5 flex-wrap md:flex-nowrap border-l-2'>
                    <Avatar src='/images/avatars/1.png' />
                    <Message />
                  </div>
                </>
              )}
              <div className='flex items-start justify-start pl-4 md:ml-5 flex-wrap md:flex-nowrap border-l-2'>
                <Avatar src='/images/avatars/1.png' />
                <Message />
              </div>
              <div className='flex items-start justify-start pl-4 md:ml-5 flex-wrap md:flex-nowrap border-l-2'>
                <Avatar src='/images/avatars/1.png' />
                <Message />
              </div>
            </div>
          </div>

          {!isReply && (
            <div className='flex justify-end items-center w-full'>
              <Button variant='outlined' onClick={handleReply}>
                Reply
              </Button>
            </div>
          )}

          {/* Reply Component */}
          {isReply && (
            <div className='flex justify-start items-center gap-2 flex-wrap w-full rounded'>
              <div className='flex justify-start items-start gap-2 w-full'>
                <Avatar src='/images/avatars/1.png' />
                <TextField minRows={2} multiline fullWidth placeholder='Reply the Comment...' />
              </div>

              <div className='flex justify-between items-center gap-2 flex-wrap w-full'>
                <div className='flex justify-between items-center gap-2 flex-wrap md:ml-10'>
                  <Tooltip title='Attach'>
                  <IconButton onClick={() => setOpenAttach(!openAttach)}>
                  <i className='ri-attachment-2'></i>
                    </IconButton>
                  </Tooltip>
                  <MultiSelectDropdown
                    icon='ri-price-tag-3-line  w-5 h-5 cursor-pointer'
                    onselect={e => console.log(e)}
                    type='button-filter-dropdown'
                    toolTip='Notify'
                    name='tags'
                    options={tags}
                  />
                </div>
                <div className='flex justify-center gap-2'>
                  <Button variant='outlined' onClick={handleReply}>
                    Cancel
                  </Button>
                  <Button variant='contained' size='small'>
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='w-full sm:w-[25%]'>
        {/* filter bar in this component */}
        <div className='flex justify-start items-start gap-2  flex-col'>
          <TextField
            size='small'
            label='Search'
            value={searchQuery}
            fullWidth
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                height: '40px',
                fontSize: '12px',
                padding: '5px 10px',
                '.MuiInputBase-input': {
                  padding: '0 5px'
                }
              }
            }}
          ></TextField>

          <div className='hidden sm:inline-block '>
            <MultiSelectDropdown
              onselect={handleFoldersFilter}
              name='topic'
              title='Message Topic'
              type='accordion-checkbox'
              options={[
                { label: 'All', active: false },
                { label: 'General Comments', active: false }
              ]}
            />
          </div>
          <div className='hidden sm:inline-block '>
            <MultiSelectDropdown
              onselect={handleFoldersFilter}
              name='createdBy'
              title='Created By'
              type='accordion-checkbox'
              options={[
                { label: 'Adrian Hernandez', active: false },
                { label: 'Aylormade Appr', active: false },
                { label: 'Estimator', active: false },
                { label: 'Gilad Rubinsky', active: false },
                { label: 'Robin Southern', active: false },
                { label: 'Rosa Hernandez', active: false }
              ]}
            />
          </div>
          <div className='hidden sm:inline-block '>
            <MultiSelectDropdown
              onselect={handleFoldersFilter}
              name='sort'
              type='accordion-sort'
              title='Sort By'
              options={[
                { label: 'Latest Post', active: false },
                { label: 'Recent Post', active: false }
              ]}
            />
          </div>

          <div className=' sm:hidden flex justify-end w-full'>
            <Button
              variant='contained'
              size='small'
              onClick={() => setOpen(!open)}
              startIcon={<i className='ri-filter-3-fill'></i>}
            >
              Filters
            </Button>
          </div>
        </div>
      </div>

      <Drawer open={open} setOpen={() => setOpen(false)}>
        <div className='flex justify-start items-start gap-2 pl-2 flex-col'>
          <MultiSelectDropdown
            isScrollable={false}
            onselect={handleFoldersFilter}
            name='topic'
            title='Message Topic'
            type='accordion-checkbox'
            options={[
              { label: 'All', active: false },
              { label: 'General Comments', active: false }
            ]}
          />

          <MultiSelectDropdown
            onselect={handleFoldersFilter}
            isScrollable={false}
            name='createdBy'
            title='Created By'
            type='accordion-checkbox'
            options={[
              { label: 'Adrian Hernandez', active: false },
              { label: 'Aylormade Appr', active: false },
              { label: 'Estimator', active: false },
              { label: 'Gilad Rubinsky', active: false },
              { label: 'Robin Southern', active: false },
              { label: 'Rosa Hernandez', active: false }
            ]}
          />
          <MultiSelectDropdown
            onselect={handleFoldersFilter}
            isScrollable={false}
            name='sort'
            type='accordion-sort'
            title='Sort By'
            options={[
              { label: 'Latest Post', active: false },
              { label: 'Recent Post', active: false }
            ]}
          />
        </div>
      </Drawer>

      <FormDialog
        open={openAttach}
        onClose={() => setOpenAttach(!openAttach)}
        dialogTitle='Attachments'
        closeButton={true}
        dialogSize='80%'
      >
        <TabsList tabs={tabs} type='tabs' />
      </FormDialog>
    </div>
  )
}

export default Chat

const Message = () => {
  return (
    <>
      <div className='ml-0 md:ml-2'>
        <div className='flex justify-start items-center gap-0.5 flex-wrap w-full'>
          <h6 className='text-base'>Robin Southern</h6>
          <i className='ri-chat-1-line w-5 h-5'></i>
          <p className='text-xs'>4/1/24 8:44 PM</p>
        </div>
        <span className='text-primary text-sm'>
          <strong className='text-secondary'>To:</strong> Luke Sublette, Rosa Hernandez
        </span>
        <p className='mt-4 md:ml-4 text-sm flex flex-wrap'>
          Reinspection request, photo report, eagle view and LOA was submitted to the carrier at
          statefarmfireclaims@statefarm.com
        </p>
      </div>
    </>
  )
}

const tabs = [
  {
    label: 'Photo ',
    icon: 'ri-camera-line',
    value: 'photo ',
    component: Pictures
  },
  {
    label: 'Documents',
    icon: 'ri-file-paper-line',
    value: 'documents',
    component: Document
  },
  {
    label: 'Upload',
    icon: 'ri-file-paper-line',
    value: 'Upload',
    component: Upload
  }
]
