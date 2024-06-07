import React from 'react'

import { Dialog, DialogTitle, IconButton } from '@mui/material'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  dialogTitle: string
  closeButton?: boolean
}

const FormDialog: React.FC<ModalProps> = ({ open, onClose, children, dialogTitle, closeButton }) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth='md'>
      <div className='flex items-center justify-between gap-4 pe-4'>
        <DialogTitle>{dialogTitle} </DialogTitle>
        {closeButton && (
          <IconButton onClick={onClose}>
            <i className='ri-close-fill'></i>
          </IconButton>
        )}
      </div>
      {children}
    </Dialog>
  )
}

export default FormDialog
