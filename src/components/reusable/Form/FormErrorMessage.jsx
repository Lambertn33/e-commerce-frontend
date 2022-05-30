import React from 'react'

export default function FormErrorMessage({errorMessage}) {
  return (
    <div class="alert alert-danger alert-dismissible" role="alert">{errorMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
  )
}
