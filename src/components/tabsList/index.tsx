'use client'

// React Imports
import type { FC, SyntheticEvent } from 'react'

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import SearchIcon from '@mui/icons-material/Search'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'

// MUI Imports
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

// Define the type for each tab configuration
interface TabConfig {
  label: string
  icon?: string
  value: string
  component: FC<{ props?: any }>
  props?: any
  active?: boolean
}

interface Consumer {
  label: string
  address: string
  image: string
  active: boolean
}

interface Tabs {
  tabs: TabConfig[]
  type?: string
  consumer?: Consumer[]
  _activeTab?: string
}

const TabsList: FC<Tabs> = ({ tabs, type, consumer, _activeTab }) => {
  // States
  const [activeTab, setActiveTab] = useState(_activeTab === 'form' ? 'form' : tabs[0].value)
  const [_tabs, _setTabs] = useState(tabs)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedConsumer, setSelectedConsumer] = useState<Consumer>()
  const [searchTerm, setSearchTerm] = useState('')

  const searchParams = useSearchParams()
  const search = searchParams.get('q')

  useEffect(() => {
    if (consumer) {
      setSelectedConsumer(consumer[0])
    }
  }, [consumer])
  useEffect(() => {
    if (_activeTab) {
      const updatedTabs = tabs.map(obj => ({
        ...obj,
        active: obj.value === 'form' ? false : true
      }))

      _setTabs(updatedTabs)
    }
  }, [])

  useEffect(() => {
    if (search === 'Notes') {
      setActiveTab('messages')
    } else if (search === 'form') {
      setActiveTab(search)
    }
  }, [search])

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleConsumerChange = (consumer: Consumer) => {
    setSelectedConsumer(consumer)
    handleMenuClose()
  }

  const open = Boolean(anchorEl)

  if (type === 'tabs') {
    return (
      <TabContext value={activeTab}>
        <div className='flex flex-wrap-reverse justify-between items-center gap-3 '>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            {tabs.map(tab => (
              <Tab
                key={tab.value}
                label={
                  <div className='flex items-center gap-1.5'>
                    <i className={`${tab.icon} text-lg`} />
                    {tab.label}
                  </div>
                }
                value={tab.value}
              />
            ))}
          </CustomTabList>
        </div>

        <div className='py-2 min-h-[400px]'>
          {tabs.map(tab => tab.value === activeTab && <tab.component key={tab.value} />)}
        </div>
      </TabContext>
    )
  } else if (type === 'cards-tab') {
    return (
      <TabContext value={activeTab}>
        <Card>
          <CardActions>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              {tabs.map(tab => (
                <Tab
                  key={tab.value}
                  label={
                    <div className='flex items-center gap-1.5'>
                      {tab.icon && <i className={`${tab.icon} text-lg`} />}
                      {tab.label}
                    </div>
                  }
                  value={tab.value}
                />
              ))}
            </CustomTabList>
          </CardActions>

          <CardContent>
            {tabs.map(tab => tab.value === activeTab && <tab.component key={tab.value} props={tab.props} />)}
          </CardContent>
        </Card>
      </TabContext>
    )
  } else {
    return (
      <TabContext value={activeTab}>
        <Card sx={{ marginBottom: 4 }}>
          <CardContent>
            <div className='flex flex-wrap-reverse justify-between items-center gap-3 '>
              <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
                {_tabs.map(tab => (
                  <Tab
                    disabled={tab.active}
                    key={tab.value}
                    label={
                      <div className='flex items-center gap-1.5'>
                        <i className={`${tab.icon} text-lg`} />
                        {tab.label}
                      </div>
                    }
                    value={tab.value}
                  />
                ))}
              </CustomTabList>

              {selectedConsumer && (
                <div>
                  <Button
                    component='label'
                    role={undefined}
                    variant='contained'
                    tabIndex={-1}
                    startIcon={
                      <img
                        height={30}
                        width={30}
                        src={selectedConsumer.image}
                        className='rounded-full'
                        alt='Profile Background'
                      />
                    }
                    endIcon={<i className='ri-arrow-down-s-line w-5 h-5'></i>}
                    onClick={handleMenuOpen}
                  >
                    <div className='flex flex-col'>
                      <span className='text-sm'>{selectedConsumer.label}</span>
                      <span className='text-[10px] flex justify-center items-center gap-1'>
                        <i className='ri-map-pin-2-line text-textSecondary w-3 h-3' />
                        {selectedConsumer.address}
                      </span>
                    </div>
                  </Button>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                    <MenuItem
                      sx={{
                        '&:hover': {
                          backgroundColor: 'transparent'
                        },
                        minWidth: '200px'
                      }}
                    >
                      <TextField
                        size='small'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={e => {
                          e.stopPropagation()
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <SearchIcon />
                            </InputAdornment>
                          ),
                          sx: {
                            height: '30px',
                            fontSize: '12px',
                            padding: '5px 10px',
                            '.MuiInputBase-input': {
                              padding: '0 5px'
                            }
                          }
                        }}
                        sx={{
                          '.MuiInputLabel-root': {
                            fontSize: '12px'
                          },
                          '.MuiFormLabel-root': {
                            top: '-2px'
                          },
                          '.MuiInputBase-root': {
                            height: '30px',
                            fontSize: '12px'
                          }
                        }}
                      />
                    </MenuItem>
                    {consumer
                      ?.filter(consumer => consumer.label.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((consumer, index) => (
                        <MenuItem key={index} onClick={() => handleConsumerChange(consumer)} sx={{ minWidth: '236px' }}>
                          <Box>
                            <Typography variant='h6'>{consumer.label}</Typography>
                            <Typography variant='body2'>{consumer.address}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                  </Menu>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className='py-2'>{tabs.map(tab => tab.value === activeTab && <tab.component key={tab.value} />)}</div>
      </TabContext>
    )
  }
}

export default TabsList
