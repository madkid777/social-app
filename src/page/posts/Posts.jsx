import axios from 'axios'
import ProtectedRoutes from '../../component/protectedRoutes/protectedRoutes'
import styles from './Posts.module.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Auth/AuthContext'
import { useEffect } from 'react'
import { DotLoader } from 'react-spinners'
import PostCard from '../../component/PostCard/PostCard'
import AddPost from '../../component/AddPost/AddPost'
import { Query, useQuery } from '@tanstack/react-query'

export default function Posts() {
    const { userToken } = useContext(AuthContext)
    function getData() {
        return axios.get('https://linked-posts.routemisr.com/posts', {
            params: {
                limit: 40,
                sort: '-createdAt'
            }, headers: {
                token: userToken
            }
        })
    }
    let { data, isLoading, refetch } = useQuery({
        queryKey: 'allPosts',
        queryFn: getData,
    })
    if (isLoading) {
        return <div className='flex items-center justify-center h-100'>
            <DotLoader color="#5f66c4" /></div>
    }

    return (
        <main className='w-1/2 mx-auto' >
            <AddPost getAllPosts={refetch} />
            {data?.data.posts.length ? data?.data.posts.map((post) => {
                return <div key={post._id} className='card border border-gray-200 rounded-xl p-2 mx-auto my-4'>

                    <PostCard post={post} from='details' />
                </div>
            }) : ""}
        </main>
    )
}
