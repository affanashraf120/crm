import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import type { z } from 'zod'

import { schema } from './sideBarFormSchema'

type FormData = z.infer<typeof schema>

// Utility function to generate invoice number
// auto generated Invoice number
let counter = 0

function generateInvoiceNumber(name: string) {
  const abbreviation = name.substring(0, 2).toUpperCase()

  counter++
  const paddedCounter = counter.toString().padStart(5, '0')

  return `${abbreviation}-${paddedCounter}`
}

export const useSideBarForm = (clientName: string) => {
  return useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      inv: generateInvoiceNumber(clientName),
      email: '',
      assigned_to: '',
      client_name: '',
      date_sent: dayjs(),
      carrier: '',
      oa_name: '',
      oa_email: '',
      oa_phone_no: '',
      umpire_name: '',
      umpire_email: '',
      umpire_phone_no: '',
      address: '',
      city: '',
      claim_number: '',
      appraisal_amt: undefined,
      percentage: '',
      date_approved: dayjs(),
      inspection_date: dayjs(),
      turnaround: undefined,
      comm_amt: undefined,
      notes: '',
      date_qb_invoiced: dayjs(),
      date_user_paid: dayjs(),
      status: '',
      umpire_status: ''
    }
  })
}
