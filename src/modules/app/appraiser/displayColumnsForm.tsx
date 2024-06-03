// components/CheckboxListForm.tsx
import { useState } from 'react'

import { Checkbox, Grid, Button, FormControlLabel } from '@mui/material'

interface Column {
  header: string
  name: string
}

interface CheckboxItem {
  header: string
  active: boolean
}

interface CheckboxListFormProps {
  columns: Column[]
  onSubmit: (selectedItems: CheckboxItem[]) => void
  onClose: () => void;
}

const CheckboxListForm: React.FC<CheckboxListFormProps> = ({ columns, onSubmit, onClose }) => {
  // Initialize state with the transformed array
  const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>(
    columns.map(item => ({
      header: item.header,
      active: false
    }))
  )

  // Handle checkbox change
  const handleCheckboxChange = (index: number) => {
    const newCheckboxes = [...checkboxes]

    newCheckboxes[index].active = !newCheckboxes[index].active
    setCheckboxes(newCheckboxes)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(checkboxes)
  }

  return (
    <form onSubmit={handleSubmit} className='px-4'>
      <Grid container spacing={2}>
        {checkboxes.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <FormControlLabel
              control={<Checkbox checked={item.active} onChange={() => handleCheckboxChange(index)} />}
              label={item.header}
            />
          </Grid>
        ))}
      </Grid>
      <div className='flex justify-start gap-2'>
        <Button variant='outlined' color='inherit' type='button' onClick={onClose} sx={{ mt: 2, mb: 2 }}>
          Cancel
        </Button>
        <Button variant='contained' type='submit' sx={{ mt: 2, mb: 2 }}>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default CheckboxListForm
