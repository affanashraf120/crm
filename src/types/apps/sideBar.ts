import type { Dayjs } from 'dayjs'

export type FormData = {
  inv: string
  email: string
  assigned_to: string
  client_name: string
  date_sent: Dayjs
  carrier: string
  oa_name: string
  oa_email: string
  oa_phone_no: string
  umpire_name: string
  umpire_email: string
  umpire_phone_no: string
  address: string
  city: string
  claim_number: string
  appraisal_amt: string
  percentage: string
  date_approved: Dayjs
  inspection_date: Dayjs
  turnaround?: number | undefined
  comm_amt: string
  notes: string
  date_qb_invoiced: Dayjs
  date_user_paid: Dayjs
  status: string
  umpire_status: string
}
