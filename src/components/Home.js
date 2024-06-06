import React, { useEffect } from 'react'
import Leftside from './LeftSide'
import RightSide from './RightSide'
import { Outlet , useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import useOtherUser from '../hooks/useOtherUser'
import useGetMyTweets from '../hooks/useGetMyTweets'





const Home = () => {

  const {user , otherUsers} = useSelector(store=>store.user);
  const navigate = useNavigate();
  useOtherUser(user?._id);
  useGetMyTweets(user?._id);

  useEffect(() =>{
    if(!user){
    navigate('/login')
    }
  }, []);


  return (
    <div className='flex justify-between w-[80%] mx-auto'>
        <Leftside/>
        <Outlet/>
        <RightSide otherUsers={otherUsers}/>
        
    </div>
  )
}

export default Home