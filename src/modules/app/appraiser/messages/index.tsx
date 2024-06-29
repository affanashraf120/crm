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
import { convertTo12HourFormat } from '@/utils/actions'

const Chat = ({ messages }: any) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [input, setInput] = useState('')
  const [isReply, setIsReply] = useState(false)
  const [open, setOpen] = useState(false)
  const [openAttach, setOpenAttach] = useState(false)
  const [viewMoreReplies, setViewMoreReplies] = useState<{ [key: string]: number }>({})

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

  const handleViewMoreReplies = (messageId: string) => {
    setViewMoreReplies(prevState => ({
      ...prevState,
      [messageId]: (prevState[messageId] || 3) + 5
    }))
  }

  const handleCollapseReplies = (messageId: string) => {
    setViewMoreReplies(prevState => ({
      ...prevState,
      [messageId]: 3
    }))
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
                icon='ri-user-3-fill w-5 h-5 cursor-pointer'
                onselect={e => console.log(e)}
                type='button-filter-dropdown'
                toolTip='Notify'
                options={tags}
                name='Tags'
                active={3}
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
        {messages &&
          messages.map((message: any) => {
            const replyCount = viewMoreReplies[message.id] || 3

            return (
              <div
                key={message.id}
                className='flex justify-start items-start gap-2 flex-col  border p-3 w-full rounded '
              >
                <p className='text-xs py-1'>You replied 7 days ago</p>
                {/* First message */}
                <div className='flex items-start justify-start gap-2 flex-wrap md:flex-nowrap'>
                  <Avatar src={message.url} />
                  <div className='flex md:flex-col gap-6 flex-wrap'>
                    <Message message={message} />
                    {/* Button to Show more message */}

                    {replyCount < message.reply.length && (
                      <div className='flex items-start justify-start pl-4 md:ml-5 flex-wrap md:flex-nowrap '>
                        <Button
                          variant='contained'
                          size='small'
                          sx={{
                            marginTop: '10px'
                          }}
                          endIcon={<i className='ri-arrow-down-s-line w-5 h-5'></i>}
                          onClick={() => handleViewMoreReplies(message.id)}
                        >
                          View {message.reply.length - replyCount} more replies
                        </Button>
                      </div>
                    )}

                    {replyCount > message.reply.length && message.reply.length > 3 && (
                      <div className='flex items-start justify-start pl-4 md:ml-5 flex-wrap md:flex-nowrap '>
                        <Button
                          variant='contained'
                          size='small'
                          sx={{
                            marginTop: '10px'
                          }}
                          endIcon={<i className='ri-arrow-down-s-line w-5 h-5'></i>}
                          onClick={() => handleCollapseReplies(message.id)}
                        >
                          Collapse {message.reply.length - 3} replies
                        </Button>
                      </div>
                    )}

                    {message.reply.slice(-replyCount).map((reply: any) => (
                      <div
                        key={reply.id}
                        className='flex items-start justify-start pl-4 md:ml-5 flex-wrap md:flex-nowrap border-l-2'
                      >
                        <Avatar src={reply.url} />
                        <Message message={reply} />
                      </div>
                    ))}
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
                      <TextField minRows={2} multiline fullWidth placeholder='Reply to this Comment...' />
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
            )
          })}
      </div>

      <div className='w-full sm:w-[25%]'>
        {/* filter bar in this component */}
        <div className='flex justify-start items-start gap-2  flex-col'>
          <TextField
            size='small'
            placeholder='Search'
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
                  padding: '0 5px',
                  '::placeholder': {
                    fontSize: '16px'
                  }
                }
              }
            }}
          ></TextField>

          <div className='hidden sm:inline-block '>
            <MultiSelectDropdown
              onselect={handleFoldersFilter}
              name='topic'
              isScrollable={false}
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
              isScrollable={false}
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

      <div className='inline-block sm:hidden '>
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
      </div>

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

const Message = ({ message }: any) => {
  return (
    <>
      <div className='ml-0 md:ml-2'>
        <div className='flex justify-start items-center gap-0.5 flex-wrap w-full'>
          <h6 className='text-base'>{message?.name}</h6>
          <i className='ri-chat-1-line w-5 h-5'></i>
          <p className='text-xs'>{convertTo12HourFormat(message?.created_at)}</p>
        </div>
        <span className='text-primary text-sm flex items-end justify-start gap-1'>
          <strong className='text-secondary'>To:</strong>
          <div className='flex justify-start gap-1 items-center'>
            {message?.tags.map((tag: { id: string | number; name: string }, index: number) => (
              <span key={tag.id}>
                {tag.name}
                {message.tags.length - 1 !== index && <span>, </span>}
              </span>
            ))}
          </div>
        </span>
        <p className='mt-4 md:ml-4 text-sm flex flex-wrap'>{message?.message}</p>
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
