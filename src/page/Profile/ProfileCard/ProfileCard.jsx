import React, { useContext } from 'react'
import { AuthContext } from '../../../Auth/AuthContext'

export default function ProfileCard() {
    const { userData } = useContext(AuthContext)
    return (
        <div className='col-span-1 flex items-center flex-col '>
            {userData && <>
                <img src={userData.photo} className='size-44 rounded-full border border-gray-200' alt={userData.name} />
                <h1 className='text-center'> {userData.name}</h1>
                <h3 className='text-center'> {userData.email}</h3>
                <h3 className='text-center'> {userData.dateOfBirth}</h3>

            </>}
        </div>
    )
}
