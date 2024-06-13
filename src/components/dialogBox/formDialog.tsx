import React from 'react'

import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  dialogTitle: string
  closeButton?: boolean
  dialogSize?:string
}

const FormDialog: React.FC<ModalProps> = ({ open, onClose, children, dialogTitle, closeButton, dialogSize }) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            minWidth: dialogSize ? dialogSize : '50%'
          }
        }
      }}
    >
      <div className='flex items-center justify-between gap-4 pe-4'>
        <DialogTitle>{dialogTitle} </DialogTitle>
        {closeButton && (
          <IconButton onClick={onClose}>
            <i className='ri-close-fill'></i>
          </IconButton>
        )}
      </div>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default FormDialog
