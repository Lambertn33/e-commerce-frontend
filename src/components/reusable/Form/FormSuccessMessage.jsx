import React from 'react'

export default function FormSuccessMessage({successMessage}) {
  return (
    <div class="alert alert-success alert-dismissible" role="alert">{successMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
  )
}
