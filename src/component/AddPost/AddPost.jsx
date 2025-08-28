import { Button, Textarea } from '@heroui/react'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function AddPost() {
    const [isShow, setIsShow] = useState(false)
    const [body, setBody] = useState('')
    const [img, setImg] = useState('')
    function addPost() {
        const formData = new FormData()
        body && formData.append('body', body)
        img && formData.append('image', img)
        axios.post("https://linked-posts.routemisr.com/posts", formData, {
            headers: { token: localStorage.getItem('token') }
        }).then((res) => {
            if (res.data.message === 'success') {
                toast.success('Successfully Added')
                setImg('')
                setBody('')
                setIsShow(false)
            }
        })
    }
    function handleInput(e) {
        setImg(e.target.files[0]);
    }
    return (
        <div>

            {isShow ? <div>
                <Textarea
                    isClearable
                    className=""
                    label="Description"
                    placeholder=" what is in your mind"
                    variant="bordered"
                    value={body}
                    onClear={() => console.log("textarea cleared")}
                    onChange={(e) => { setBody(e.target.value) }}
                />
                {img && (<img src={URL.createObjectURL(img)} className='h-40 w-full' />)}
                <div className=' flex mt-2 justify-between items-center'>
                    <div >
                        <label class="flex flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase cursor-pointer ">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <input type='file' class="hidden" accept='image/*' onChange={(e) => { handleInput(e) }} />
                        </label>
                    </div>
                    {console.log(img)}

                    <div className='buttons'>
                        <Button variant='borderd' onClick={() => { setIsShow(false) }} >
                            cancel
                        </Button>
                        <Button color='primary' onClick={() => addPost()}>
                            post
                        </Button>
                    </div>
                </div>
            </div> : <div className='bg-gray-100 p-4 rounded-xl cursor-pointer mt-2' onClick={() => { setIsShow(true), setImg(''), setBody('') }}>
                what is in your mind
            </div>}
        </div>
    )
}
