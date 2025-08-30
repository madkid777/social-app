import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Auth/AuthContext'
import axios from 'axios'
import PostCard from '../../../component/PostCard/PostCard'
import { DotLoader } from 'react-spinners'
import AddPost from '../../../component/AddPost/AddPost'
export default function ProfilePosts() {
    const { userData, userToken } = useContext(AuthContext)
    const [useprofilePost, setUseprofilePost] = useState([])
    function getUserPosts() {
        axios.get(`https://linked-posts.routemisr.com/users/${userData._id}/posts?limit=50`,
            {
                headers: {
                    token: userToken
                }
            }).then((res) => {
                setUseprofilePost(res.data.posts)
            })
    }
    useEffect(() => {
        if (userData?._id) {
            getUserPosts()
        }
    }, [])
    return (
        <>
            <div className='col-span-2 '>
                <AddPost getAllPosts={getUserPosts} />
                {useprofilePost.length ? useprofilePost.map((post) => { return <div key={post?._id} className="mt-4"><PostCard post={post} /></div> }) : <div className='flex items-center justify-center h-100'>
                    <DotLoader color="#5f66c4" /></div>}
            </div>
        </>
    )
}
