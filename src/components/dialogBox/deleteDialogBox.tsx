import React from 'react'

// Mui Imports
import { Box, Button, Modal, Typography } from '@mui/material'

interface Action {
  label: string
  onClick: () => void
  color: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

interface DeleteModalProps {
  open: boolean
  onClose: () => void
  title: string
  actions: Action[]
}

export const CustomModal: React.FC<DeleteModalProps> = ({ open, onClose, title, actions }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 340,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '4px',
          gap: '2px'
        }}
      >
        <Typography variant='h6' component='h2' sx={{ marginBottom: '20px', textAlign: 'center' }}>
          {title}
        </Typography>

        {actions.map((action, index) => (
          <Button
            key={index}
            variant='outlined'
            color={action.color}
            fullWidth
            onClick={action.onClick}
            sx={{ marginBottom: '6px' }}
          >
            {action.label}
          </Button>
        ))}
      </Box>
    </Modal>
  )
}

// How to import that component

// const [open, setOpen] = useState(false)

//   const handleClose = () => setOpen(false)

//   const handleDelete = () => {
//     // TODO
//   }

{
  /* <CustomModal
        open={open}
        onClose={handleClose}
        title='Are you sure you want to delete this item?'
        actions={[
          { label: 'Delete', onClick: handleDelete, color: 'error' },
          { label: 'Cancel', onClick: handleClose, color: 'inherit' }
        ]}
      /> */
}
