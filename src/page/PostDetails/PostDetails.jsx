import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../Auth/AuthContext'
import { useState } from 'react'
import PostCard from '../../component/PostCard/PostCard'
import { DotLoader } from 'react-spinners'

export default function PostDetails() {
    const [PostDeatils, setPostDeatils] = useState(null)
    const { userToken } = useContext(AuthContext)
    const { id } = useParams()
    console.log(id);

    function getDetails() {
        axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers: {
                token: userToken
            }
        }).then((res) => {
            if (res.data.message === 'success') {
                setPostDeatils(res.data.post)
                console.log(res.data);

            }

        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(
        () => {
            getDetails()
        }
        , [])
    return (
        <div>
            {PostDeatils ? <PostCard post={PostDeatils} /> : <div className='flex items-center justify-center h-100'>
                <DotLoader color="#5f66c4" /></div>}
        </div>
    )
}
