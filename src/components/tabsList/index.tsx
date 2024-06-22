'use client'

// React Imports
import type { SyntheticEvent, FC } from 'react'

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { Button, Card, CardContent } from '@mui/material'

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

interface Tabs {
  tabs: TabConfig[]
}

const TabsList: FC<Tabs> = ({ tabs }) => {
  // States
  const [activeTab, setActiveTab] = useState(tabs[0].value)

  const searchParams = useSearchParams()

  const search = searchParams.get('q')

  useEffect(() => {
    if (search === 'Notes') {
      setActiveTab('messages')
    }
  }, [search])

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

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

            <Button
              component='label'
              role={undefined}
              variant='contained'
              tabIndex={-1}
              startIcon={
                <img
                  height={30}
                  width={30}
                  src='/images/avatars/1.png'
                  className='rounded-full'
                  alt='Profile Background'
                />
              }
              endIcon={<i className='ri-arrow-down-s-line w-5 h-5'></i>}
            >
              <div className='flex flex-col'>
                <span className='text-sm'>John Deo</span>
                <span className='text-[10px] flex justify-center items-center gap-1'>
                  <i className='ri-map-pin-2-line text-textSecondary w-3 h-3' />
                  4000 Silk Vine Count Roaoke, 1X 76768
                </span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className='py-2'>{tabs.map(tab => tab.value === activeTab && <tab.component key={tab.value} />)}</div>
    </TabContext>
  )
}

export default TabsList
