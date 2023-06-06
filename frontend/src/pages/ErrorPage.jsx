import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError()
    let title = 'Page not found'
    let message = 'Something went wrong!'

    if (error.status === 500) {
        message = error.data.message
    }

  return (
    <div style={{color: '#ccc'}}>
        <h1>{title}</h1>
        <p>{message}</p>
    </div>
  )
}

export default ErrorPage