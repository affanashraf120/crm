'use client'

// React Imports
import type { SyntheticEvent, FC } from 'react'

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { Box, Button, Card, CardContent, Menu, MenuItem, Typography } from '@mui/material'

// MUI Imports
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

// Define the type for each tab configuration
interface TabConfig {
  label: string
  icon: string
  value: string
  component: FC
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
}

const TabsList: FC<Tabs> = ({ tabs, type, consumer }) => {
  // States
  const [activeTab, setActiveTab] = useState(tabs[0].value)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedConsumer, setSelectedConsumer] = useState<Consumer>()

  const searchParams = useSearchParams()
  const search = searchParams.get('q')

  useEffect(() => {
    if (consumer) {
      setSelectedConsumer(consumer[0])
    }
  }, [consumer])

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
  } else {
    return (
      <TabContext value={activeTab}>
        <Card sx={{ marginBottom: 4 }}>
          <CardContent>
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
                    {consumer?.map((consumer, index) => (
                      <MenuItem key={index} onClick={() => handleConsumerChange(consumer)} sx={{ minWidth: '230px' }}>
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
