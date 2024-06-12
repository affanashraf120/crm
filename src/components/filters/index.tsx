import React, { useState } from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Define types for props
type Filter = {
  label: string
  active: boolean
}

type FilterCategory = {
  title: string
  filters: Filter[]
}

type FilterAccordionProps = {
  filtersData: FilterCategory[]
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({ filtersData }) => {
  const [selectedFilters, setSelectedFilters] = useState(filtersData)
  const [selectAll, setSelectAll] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, categoryIndex: number, filterIndex: number) => {
    const updatedFilters = selectedFilters.map((category, catIndex) => {
      if (catIndex === categoryIndex) {
        return {
          ...category,
          filters: category.filters.map((filter, filtIndex) => {
            if (filtIndex === filterIndex) {
              return { ...filter, active: event.target.checked }
            }

            return filter
          })
        }
      }

      return category
    })

    setSelectedFilters(updatedFilters)
  }

  const toggleSelectAll = ()=>{
    setSelectAll(!selectAll)

    const selectFilters = filtersData.map(category => ({
      ...category,
      filters: category.filters.map(filter => ({ ...filter, active: !selectAll }))
    }))

    setSelectedFilters(selectFilters)
  }

  const handleClear = () => {
    const resetFilters = filtersData.map(category => ({
      ...category,
      filters: category.filters.map(filter => ({ ...filter, active: false }))
    }))

    setSelectedFilters(resetFilters)
  }

  const handleApply = () => {
    console.log('Applied filters:', selectedFilters)
  }

  return (
    <div className='px-6 '>
      <div className='h-[300px] overflow-y-auto'>
      <div>
          <Checkbox checked={selectAll} onChange={toggleSelectAll} />
          <label>{selectAll ? 'Deselect All' : 'Select All'}</label>
        </div>
        {selectedFilters.map((filterCategory, categoryIndex) => (
          <Accordion
            key={categoryIndex}
            className='hover:bg-[#f5f5f5]/10 mb-2 duration-500 transition-all ease-in-out border rounded'
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${categoryIndex}-content`}
              id={`panel${categoryIndex}-header`}
            >
              <Typography>{filterCategory.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {filterCategory.filters.map((filter, filterIndex) => (
                <FormControlLabel
                  key={filterIndex}
                  control={
                    <Checkbox
                      checked={filter.active}
                      onChange={event => handleChange(event, categoryIndex, filterIndex)}
                      name={filter.label}
                    />
                  }
                  label={filter.label}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      <div className='py-4 flex justify-between items-center'>
        <Button variant='outlined' color='inherit' onClick={handleClear}>
          Clear
        </Button>
        <Button variant='contained' onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  )
}

export default FilterAccordion
