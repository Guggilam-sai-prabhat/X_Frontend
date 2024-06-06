import axios from 'axios';
import React, { useState } from 'react'
import Avatar from 'react-avatar';
import {TWEET_API_END_POINT} from "../utils/constant"
import {CiImageOn} from "react-icons/ci";
import toast from "react-hot-toast";
import { useSelector , useDispatch } from 'react-redux';
import {  getIsActive, getRefresh } from '../redux/tweetSlice';


const CreatePost = () => {

    const [description, setDescription] = useState('');
    const {user} = useSelector(store => store.user)
   
    const {isActive} = useSelector(store => store.tweet)
    const dispatch = useDispatch();

    const sumbitHandler = async () => {
        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/create` , {description , id:user?._id}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            dispatch(getRefresh());
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
        setDescription('')
    }
    const forYouHandler = () =>{
        dispatch(getIsActive(true))
    }

    const fowlloingHandler = () =>{
        dispatch(getIsActive(false))
    }


    
    return (
        <div className='w-[100%]'>
        <div>
        <div className='flex items-center justify-evenly border-b border-gray-200'>
                <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                  <h1 className='font-semibold text-lg text-gray-600 ' >For you</h1>  
                </div>
                <div onClick={fowlloingHandler} className={`${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                    <h1 className='font-semibold text-lg text-gray-600'>Following</h1>
                </div>
            </div>
        </div>
            
            <div >
                    <div className='flex items-center p-4'>
                    <Avatar src="https://prompti.ai/wp-content/uploads/2023/07/pcboi2.png" size="40" round={true} />
                        <input value={description} onChange={(e)=>setDescription(e.target.value)} className = 'w-full text-lg outline-none border-none ml-2' type='text' placeholder='what is happening '/>
                    </div>
                    
                    <div className='flex justify-between items-center p-4 border-b border-gray-200' >
                    <div  >
                        <CiImageOn size={'20px'}/>
                    </div>
                        <button onClick={sumbitHandler} className='bg-[#109BF0] px-4 py-1 text-lg text-white border-none rounded-full'>Post</button>
                    </div>
            </div>
        </div>
    )
}

export default CreatePost