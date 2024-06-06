import React from 'react'
import { CiHome, CiHashtag, CiUser, CiBookmark, } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { Link , useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getUser, setMyProfile, setOtherUser } from '../redux/userSlice';



const Leftside = () => {

  const {user} = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOutHadler = async () => {
   try {
      const res = await axios.get(`${USER_API_END_POINT}/logout` );
      dispatch(getUser(null));
      dispatch(setOtherUser(null));
      dispatch(setMyProfile(null));
      navigate('/login')
      toast.success(res.data.message)

   } catch (error) {
      console.log(error)
   }
  }

  return (
    <div className='w-[20%]'>
      <div>
        <div>
          <img className={"my-2"} width={'24px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCAce1i99AMQmiCUhhvTEYcEydjTUydOf9FA&usqp=CAU' alt='logo' />
        </div>
        <div className='my-4'>
          <Link to = "/" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div >
              <CiHome size={'24px'} />
            </div>
            <h2 className='font-bold text-lg ml-2'>Home</h2>
          </Link>

          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div >
              <CiHashtag size={'24px'} />
            </div>
            <h2 className='font-bold text-lg ml-2'>Explore</h2>
          </div>

          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div >
              <IoIosNotifications size={'24px'} />
            </div>
            <h2 className='font-bold text-lg ml-2'>Notfication</h2>
          </div>

          <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div >
              <CiUser size={'24px'} />
            </div>
            <h2 className='font-bold text-lg ml-2'>Profile</h2>
          </Link>

          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div >
              <CiBookmark size={'24px'} />
            </div>
            <h2 className='font-bold text-lg ml-2'>BookMark</h2>
          </div>

          <div onClick={logOutHadler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div >
              <AiOutlineLogout size={'24px'} />
            </div>
            <h2 className='font-bold text-lg ml-2'>Logout</h2>
          </div>
          <button className='px-4 py-2 border-none text-md bg-[#109BF0] w-full rounded-full font-bold text-white '>Post</button>
        </div>
      </div>
    </div>
  )
}

export default Leftside