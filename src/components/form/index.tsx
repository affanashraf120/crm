import { Input } from '@mui/material'

import { FormInput } from '../formComponents/formInput'
import { StatusDropdown } from '../formComponents/statusDropdown'
import { FormInputSearchDropdown } from '../formComponents/formInputSearchDropdown'
import { FormCalendarPicker } from '../formComponents/formCalenderPiker'
import { FormTextArea } from '../formComponents/formTextArea'

const FormGenerator = ({ field, control, register, setValue, errors, fieldSize }: any) => {
  const renderField = (field: any) => {
    if (field.type === 'text') {
      return (
        <Input
          fullWidth
          type='text'
          placeholder={field.label}
          {...register(field.name)}
          error={!!errors[field.name]}
          sx={{ fontSize: '20px', fontWeight: '600' }}
        />
      )
    } else if (field.type === 'formInput') {
      return (
        <FormInput
          label={field.label}
          register={register(field.name)}
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message}
          disable={field.disable}
          fieldSize={fieldSize}

        />
      )
    } else if (field.type === 'statusDropdown') {
      return <StatusDropdown register={register} name={field.name} setValue={setValue} options={field.options} />
    } else if (field.type === 'formInputSearchDropdown') {
      return <FormInputSearchDropdown control={control} name={field.name} label={field.label} options={field.options} />
    } else if (field.type === 'formCalendarPicker') {
      return <FormCalendarPicker name={field.name} control={control} label={field.label} />
    } else if (field.type === 'formTextArea') {
      return (
        <FormTextArea
          label={field.label}
          register={register(field.name)}
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message}
        />
      )
    } else {
      return null
    }
  }

  return <>{renderField(field)}</>
}

export default FormGenerator
