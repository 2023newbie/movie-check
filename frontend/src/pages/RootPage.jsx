import React from 'react'
import Navigation from '../components/Navigation'
import { Outlet } from 'react-router-dom'

const RootPage = () => {
  return (
    <>
        <Navigation />
        <main>
            <Outlet />
        </main>
    </>
  )
}

export default RootPage