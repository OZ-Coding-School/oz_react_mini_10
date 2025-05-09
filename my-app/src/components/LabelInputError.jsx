import React from 'react'
import Input from '@common/Input'
import Label from '@common/Label'

export default function LabelInputError({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
}) {
  return (
    <div className='mb-4'>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} type={type} value={value} onChange={onChange} />
      {error && <p className='text-sm text-red-600 m-1'>{error}</p>}
    </div>
  )
}
