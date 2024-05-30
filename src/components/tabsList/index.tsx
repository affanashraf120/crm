'use client'

// React Imports
import type { SyntheticEvent, FC } from 'react'

import { useState } from 'react'

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

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
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

      {tabs.map(tab => tab.value === activeTab && <tab.component key={tab.value} />)}
    </TabContext>
  )
}

export default TabsList
