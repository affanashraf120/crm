
export function transformData(data: any) {
  const dataArray = [data]

  return dataArray.map(item => {
    if (item.status) {
      item.status = JSON.parse(item.status)
    }

    if (item.umpire_status) {
      item.umpire_status = JSON.parse(item.umpire_status)
    }

    const dateFields = ['date_sent', 'date_approved', 'inspection_date', 'date_qb_invoiced', 'date_user_paid']

    dateFields.forEach(field => {
      if (item[field]) {
        const dateString = new Date(item[field]).toISOString()
        const dateOnly = dateString.split('T')[0]

        item[field] = dateOnly
      }
    })

    return item
  })
}
