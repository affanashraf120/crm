// Default Appraiser Columns

export const defaultAppraiserColumns = [
  { name: 'inv', header: 'INV #', type: 'simple' },
  {
    name: 'status',
    header: 'Status',
    type: 'DropdownWithChip',
    options: [
      { id: 0, value: 'None', color: 'default' },
      { id: 1, value: 'Closed', color: 'info' },
      { id: 2, value: 'Open', color: 'success' },
      { id: 3, value: 'Scheduling Inspection', color: 'default' },
      { id: 4, value: 'Umpire', color: 'primary' }
    ]
  },
  {
    name: 'assigned_to',
    header: 'Assigned to',
    type: 'Dropdown',
    options: [
      'John Doe',
      'Jane Smith',
      'Mark Johnson',
      'Emily Brown',
      'Sarah Wilson',
      'Michael Davis',
      'Alex Johnson',
      'Emma Garcia'
    ]
  },
  {
    name: 'client_name',
    header: 'Client Name',
    type: 'ClientDetails'
  },
  {
    name: 'claim_no',
    header: 'Claim No',
    type: 'simple'
  },
  {
    name: 'date_sent',
    header: 'Date Sent',
    type: 'simple'
  },
  {
    name: 'carrier',
    header: 'Carrier',
    type: 'Dropdown',
    options: [
      'Michael',
      'Jennifer',
      'David',
      'Sarah',
      'John',
      'Emily',
      'Ashley',
      'Robert',
      'Amanda',
      'William',
      'Melissa'
    ]
  },
  {
    name: 'oa_name',
    header: 'OA Name',
    type: 'simple'
  },
  {
    name: 'oa_email',
    header: 'OA Email',
    type: 'simple'
  },
  {
    name: 'oa_phone_no',
    header: 'OA Phone NO',
    type: 'simple'
  },
  {
    name: 'umpire_name',
    header: 'Umpire Name',
    type: 'DropdownWithChipAndText',
    options: [
      { id: 0, value: 'None', color: 'default' },
      { id: 1, value: 'Initiated', color: 'success' },
      { id: 2, value: 'W9 & Invoice Received', color: 'info' },
      { id: 3, value: 'Payment Sent', color: 'warning' },
      { id: 4, value: 'Try To Schedule', color: 'primary' },
      { id: 5, value: 'Inspection Schedule', color: 'info' },
      { id: 6, value: 'Roof Bought', color: 'warning' },
      { id: 7, value: 'Roof Denied', color: 'success' },
      { id: 8, value: 'Inspection Schedule', color: 'primary' }
    ]
  },
  {
    name: 'umpire_email',
    header: 'Umpire Email',
    type: 'simple'
  },
  {
    name: 'umpire_phone_no',
    header: 'Umpire Phone NO',
    type: 'simple'
  },
  {
    name: 'city',
    header: 'City',
    type: 'Dropdown',
    options: [
      'Anytown',
      'Othertown',
      'Anycity',
      'Anothercity',
      'Newcity',
      'Yetanothercity',
      'Metropolitan City',
      'Capital City'
    ]
  },
  {
    name: 'address',
    header: 'Address',
    type: 'TextWithTooltip',
    size: 12
  },
  {
    name: 'appraisal_amt',
    header: 'Appraisal Amount',
    type: 'simple'
  },
  {
    name: 'percentage',
    header: 'Percentage',
    type: 'simple'
  },
  {
    name: 'date_approved',
    header: 'Date Approved',
    type: 'simple'
  },
  {
    name: 'inspection_date',
    header: 'Inspection Date',
    type: 'simple'
  },
  {
    name: 'turnaround',
    header: 'Turnaround',
    type: 'simple'
  },
  {
    name: 'comm_amt',
    header: 'Commission Amount',
    type: 'simple'
  },
  {
    name: 'notes',
    header: 'Notes',
    type: 'TextWithTooltip',
    size: 12
  },
  {
    name: 'date_qb_invoiced',
    header: 'Date QB Invoiced',
    type: 'simple'
  },
  {
    name: 'date_user_paid',
    header: 'Date User Paid',
    type: 'simple'
  }
]
