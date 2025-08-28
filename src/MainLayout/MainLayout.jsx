import React from 'react'
import NavBarComponent from '../component/NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MainLayout({ handleDark }) {
    return (
        <div>
            <NavBarComponent handleDark={handleDark} />
            <Outlet />
        </div>
    )
}
