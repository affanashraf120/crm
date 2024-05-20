import { z } from 'zod'
import { isDayjs } from 'dayjs'
import type { Dayjs } from 'dayjs'

export const schema = z.object({
  inv: z.string(),
  assigned_to: z.string(),
  email: z.string(),
  client_name: z.string(),
  date_sent: z
    .custom<Dayjs>(value => isDayjs(value) && value.isValid(), {
      message: 'Invalid date'
    })
    .nullable(),
  carrier: z.string(),
  claim_number: z.string(),
  oa_name: z.string(),
  oa_email: z.string(),
  oa_phone_no: z.string(),
  umpire_name: z.string(),
  umpire_email: z.string(),
  umpire_phone_no: z.string(),
  address: z.string(),
  city: z.string(),
  appraisal_amt: z.string(),
  percentage: z.string(),
  date_approved: z
    .custom<Dayjs>(value => isDayjs(value) && value.isValid(), {
      message: 'Invalid date'
    })
    .nullable(),
  turnaround: z.string(),
  comm_amt: z.string(),
  notes: z.string(),
  date_qb_invoiced: z
    .custom<Dayjs>(value => isDayjs(value) && value.isValid(), {
      message: 'Invalid date'
    })
    .nullable(),
  date_user_paid: z
    .custom<Dayjs>(value => isDayjs(value) && value.isValid(), {
      message: 'Invalid date'
    })
    .nullable(),
  inspection_date: z
    .custom<Dayjs>(value => isDayjs(value) && value.isValid(), {
      message: 'Invalid date'
    })
    .nullable(),
  status: z.string(),
  umpire_status: z.string()
})
