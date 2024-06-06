import React from 'react'
import Avatar from 'react-avatar';
import { FaRegComment } from "react-icons/fa";
import { CiHeart, CiBookmark } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { getRefresh } from '../redux/tweetSlice';
import { useDispatch } from 'react-redux';
import { timeSince } from '../utils/constant';

const Tweet = ({ tweet }) => {

    const { user } = useSelector(store => store.user);
   
    const dispatch = useDispatch();

    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);

        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }
    }
    const bookMarkHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/bookmark/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            console.log(id);
            console.log(`$(user?._id)`);
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);

        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }
    }
    const deleteTweetHandler = async (id) => {
        try {
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
                withCredentials: true
            })
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);

        }catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }

    }
    return (
        <div className='border-b border-gray-200'>
            <div>
                <div className='flex p-4'>
                    <Avatar src="https://prompti.ai/wp-content/uploads/2023/07/pcboi2.png" size="40" round={true} />
                    <div className='ml-2 w-full'>
                        <div className='flex items-center '>
                            <h1 className='font-bold'>{tweet?.userDetails?.name}</h1>
                            <p className='text-gray-500 text-sm ml-2'>{`@${tweet?.userDetails?.name}. ${timeSince(tweet?.createdAt)}`}</p>
                        </div>
                        <div>
                            <p>{tweet.description}</p>
                        </div>
                        <div className='flex  justify-between my-3'>
                            <div className='flex items-center'>
                                <div className="p-2 hover:bg-green-100 rounded-full cursor-pointer">
                                    <FaRegComment size={'24px'} />
                                </div>
                                <p className='ml-1'>0</p>
                            </div>
                            <div className='flex items-center'>
                                <div onClick={() => likeOrDislikeHandler(tweet?._id)} className="p-2 hover:bg-pink-100 rounded-full cursor-pointer">
                                    <CiHeart size={'24px'} />
                                </div>

                                <p>{tweet?.like?.length}</p>
                            </div>
                            <div className='flex items-center'>

                                <div onClick={() => bookMarkHandler(tweet?.id)} className="p-2 hover:bg-blue-100 rounded-full cursor-pointer">
                                    <CiBookmark size={'24px'} />
                                </div>
                                <p>{tweet?.bookmark?.length}</p>
                            </div>
                            {
                                user?._id === tweet?.userId && (
                                    <div on onClick ={() => deleteTweetHandler(tweet?._id)} className='flex items-center'>

                                        <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                                            <MdDeleteForever size={'24px'} />
                                        </div>

                                    </div>
                                )
                           };
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Tweet