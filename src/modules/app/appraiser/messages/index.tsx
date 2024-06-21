'us client'

import { useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { Avatar, Button, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'

import MultiSelectDropdown from '@/components/dropDowns/multifiltercheckbox'
import { tags, topic, visibility } from '@/data/data'
import Drawer from '@/components/formDrawer'

const Chat = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [input, setInput] = useState('')
  const [isReply, setIsReply] = useState(false)
  const [open, setOpen] = useState(false)

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
            <div className='flex justify-between items-center gap-2 flex-wrap'>
              <Tooltip title='Attach'>
                <IconButton>
                  <i className='ri-attachment-2'></i>
                </IconButton>
              </Tooltip>
              <MultiSelectDropdown
                icon='ri-price-tag-3-line  w-6 h-6 cursor-pointer'
                onselect={e => console.log(e)}
                type='button-filter-dropdown'
                toolTip='Notify'
                options={tags}
                name='Tags'
              />
              <MultiSelectDropdown
                icon='ri-lightbulb-line w-6 h-6 cursor-pointer'
                onselect={e => console.log(e)}
                type='button-filter-dropdown'
                toolTip='Topic'
                options={topic}
                name='Topic'
              />

              <MultiSelectDropdown
                icon='ri-organization-chart w-6 h-6 cursor-pointer'
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
              <div className='flex items-start justify-start pl-4 md:ml-5 flex-wrap md:flex-nowrap '>
                <Button
                  variant='contained'
                  size='small'
                  sx={{
                    marginTop: '10px'
                  }}
                  endIcon={<i className='ri-arrow-down-s-line w-4 h-4'></i>}
                >
                  View 3 more replies
                </Button>
              </div>
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
                    <IconButton>
                      <i className='ri-attachment-2'></i>
                    </IconButton>
                  </Tooltip>
                  <MultiSelectDropdown
                    icon='ri-price-tag-3-line  w-6 h-6 cursor-pointer'
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
              startIcon={
                <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' className='w-4 h-4'>
                  <path fill='currentColor' d='M4 11h12v2H4zm0-5h16v2H4zm0 12h7.235v-2H4z' />
                </svg>
              }
            >
              Filters
            </Button>
          </div>
        </div>
      </div>

      <Drawer open={open} setOpen={() => setOpen(false)}>
        <div className='flex justify-start items-start gap-2 pl-2 flex-col'>
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
      </Drawer>
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
          <i className='ri-chat-1-line w-4 h-4'></i>
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
