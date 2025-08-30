import React from 'react'
import { useState } from 'react'
import { FaComment, FaShare } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function PostCard({ post, from }) {
    const [moreComment, setMoreComment] = useState(2)

    const navigate = useNavigate()
    return (
        <>
            <div className="header flex flex-col">
                <div className="profile flex items-center mb-2">
                    <img src={post.user?.photo} alt={post.user?.name} className='size-10 rounded-full me-2' />
                    <div className="inner">
                        <p className='font-bold'>{post.user?.name}</p>
                        <span className='text-sm'>{post.createdAt.split("T")[0] || ""}</span></div>
                </div>
            </div>
            <div className="content">
                <p className='mb-2'>{(post.body || "").split(" ").slice(0, 4).join(" ")}</p>
                <img src={post.image} alt={post.body} className='w-full h-80 object-cover' />
            </div>
            <div className="comment mt-2 flex justify-between mx-4">
                <div className='flex items-center'>
                    <FaComment className='me-1 text-gray-500' /> {post.comments.length} <span className='ms-1'>comments</span>
                </div>
                <div><FaShare className='text-gray-500' /></div>
            </div>
            <div className="single-comment ">
                {post.comments.length ? post.comments.slice(0, moreComment).map((Comment) => (<div key={Comment._id}>
                    <div className='border-b-1 border-gray-200 flex my-2 p-2'>
                        <div >
                            <img src={post.user?.photo} alt="" className='size-10 rounded-full me-2' />

                        </div>
                        <div>
                            <h2>{Comment.commentCreator.name}</h2>
                            <small>{(Comment.content || "").split(" ").slice(0, 3).join(" ")}</small>
                        </div>
                    </div>
                </div>)) : ""}
            </div>
            {from !== "details" ? <p className='text-center pb-1 cursor-pointer' onClick={() => { setMoreComment(moreComment + 5) }}> see more</p> : <p onClick={() => navigate(`/details/${post._id}`)} className='text-center pb-1 cursor-pointer'>see details</p >}
        </>
    )
}
