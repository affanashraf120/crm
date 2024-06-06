import React from 'react'

import { Dialog, DialogTitle } from '@mui/material'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  dialogTitle:string
}

const FormDialog: React.FC<ModalProps> = ({ open, onClose, children, dialogTitle }) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth='md'>
      <DialogTitle>{dialogTitle} </DialogTitle>
      {children}
    </Dialog>
  )
}

export default FormDialog
