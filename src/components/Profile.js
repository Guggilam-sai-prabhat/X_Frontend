import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from 'react-avatar';
import useGetProfile from '../hooks/useGetProfile'
import { useSelector } from 'react-redux'
import { USER_API_END_POINT } from '../utils/constant'
import { getRefresh } from '../redux/tweetSlice'
import { followingUpdate } from '../redux/userSlice';
import { useDispatch } from'react-redux'
import axios from 'axios';
import  toast from 'react-hot-toast';

const Profile = () => {

  const { user, profile } = useSelector(store => store.user)
  const { id } = useParams()
  useGetProfile(id)
  const dispatch = useDispatch()

  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      // unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id: user?._id });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }

    } else {
      // follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id: user?._id });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  }

  return (
    <div className='w-[50%] border-l border-r border-gray-200'>
      <div>
        <div className='flex items-center py-2'>
          <Link to='/' className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <IoMdArrowBack size='24px' />
          </Link>
          <div className='ml-2'>
            <h1 className='font-bold text-lg'>{profile?.name}</h1>
            <p className='text-gray-500 text-sm'>12 post</p></div>

        </div>
        <img src='https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360' alt='banner' />
        <div className='top-52  ml-2 absolute border-4 border-white rounded-full'>
          <Avatar src="https://prompti.ai/wp-content/uploads/2023/07/pcboi2.png" size="120" round={true} />
        </div>
        <div className='text-right m-4'>
          {
            profile?._id === user?._id ? (
              <button className='px-4 py-1 border border-gray-400 rounded-full bg-black text-white hover:bg-slate-400 '>Edit profile</button>

            ) : (
              <button onClick={followAndUnfollowHandler} className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>{user?.following?.includes(id) ? "Following" : "Follow"}</button>
            )
          }
          {/* <button className='px-4 py-1 border border-gray-400 rounded-full bg-black text-white hover:bg-slate-400 '>Edit profile</button> */}
        </div>
        <div className='m-4'>
          <h1 className='font-bold text-xl'>{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className='m-4 text-sm'>
          <p > Explore the World and gather the info | info is wealth </p>
        </div>
      </div>
    </div>
  )
}

export default Profile