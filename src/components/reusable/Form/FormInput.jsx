import React from 'react'

export default function FormInput({label , type , value , onChange , required , disabled}) {
  return (
    <div class="mb-3">
        <label  class="form-label">{label}</label>
        <input type={type} required={required} disabled={disabled} onChange={onChange} value={value} class="form-control" />
    </div>
  )
}
